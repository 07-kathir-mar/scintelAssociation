import sequelize from "../config/database.js";
import { QueryTypes } from "sequelize";
import transporter from "../config/mailer.js";

export const acceptProblemSolverRequest = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { id } = req.params;

    // ============================
    // FETCH SOLVER REQUEST
    // ============================

    const [request] = await sequelize.query(
      `
      SELECT *
      FROM problem_solver_requests
      WHERE problem_solver_request_id = :id
      `,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );

    if (!request) {
      await t.rollback();
      return res.status(404).json({
        message: "Solver request not found",
      });
    }

    const {
      problem_id,
      name,
      email,
      phone_number,
      year,
      section,
      mentor,
      team_members,
    } = request;

    // ============================
    // CHECK IF PROBLEM ALREADY HAS SOLVER
    // ============================

    const [existingProblem] = await sequelize.query(
      `
      SELECT solver_user_id
      FROM current_problems
      WHERE problem_id = :problem_id
      `,
      {
        replacements: { problem_id },
        type: QueryTypes.SELECT,
        transaction: t,
      }
    );

    if (existingProblem?.solver_user_id) {
      await t.rollback();
      return res.status(400).json({
        message: "This problem already has a solver assigned",
      });
    }

    // ============================
    // SEND APPROVAL MAIL
    // ============================

    await transporter.sendMail({
      from: '"Scintel Team" <yourrealemail@gmail.com>',
      to: email,
      subject: "Problem Solver Request Approved",
      html: `
        <div style="font-family: Arial; padding: 20px;">
          <h2>Congratulations ${name} 🎉</h2>
          <p>Your request to solve the problem has been <b>approved</b>.</p>
          <p>You can now start working on the assigned problem.</p>
          <p>All the best 🚀</p>
        </div>
      `,
    });

    // ============================
    // CREATE USER (SOLVER)
    // ============================

    const [userResult] = await sequelize.query(
      `
      INSERT INTO users
      (name, email, phone_number, year, section)
      VALUES (:name, :email, :phone, :year, :section)
      RETURNING user_id
      `,
      {
        replacements: {
          name,
          email,
          phone: phone_number,
          year,
          section,
        },
        type: QueryTypes.INSERT,
        transaction: t,
      }
    );

    const solver_user_id = userResult[0].user_id;

    // ============================
    // CREATE TEAM USERS + MAP THEM
    // ============================

    let parsedTeamMembers = [];

    if (team_members) {
      if (Array.isArray(team_members)) {
        parsedTeamMembers = team_members;
      } else {
        try {
          parsedTeamMembers = JSON.parse(team_members);
        } catch {
          await t.rollback();
          return res.status(400).json({
            message: "Invalid team_members format",
          });
        }
      }
    }

    for (const member of parsedTeamMembers) {
      const {
        name: team_name,
        email: team_email,
        section: team_section,
        year: team_year,
        ph_no,
      } = member || {};

      if (!team_name || !team_email || !team_section || !team_year || !ph_no) {
        await t.rollback();
        return res.status(400).json({
          message:
            "Each team member must have name, email, section, year and ph_no",
        });
      }

      const [teamUserResult] = await sequelize.query(
        `
        INSERT INTO users
        (name, email, phone_number, year, section)
        VALUES (:name, :email, :phone, :year, :section)
        RETURNING user_id
        `,
        {
          replacements: {
            name: team_name,
            email: team_email,
            phone: ph_no,
            year: team_year,
            section: team_section,
          },
          type: QueryTypes.INSERT,
          transaction: t,
        }
      );

      const team_user_id = teamUserResult[0].user_id;

      await sequelize.query(
        `
        INSERT INTO current_problem_team_members
        (problem_id, user_id)
        VALUES (:problem_id, :user_id)
        `,
        {
          replacements: {
            problem_id,
            user_id: team_user_id,
          },
          transaction: t,
        }
      );
    }

    // ============================
    // UPDATE CURRENT PROBLEM
    // ============================

    await sequelize.query(
      `
      UPDATE current_problems
      SET solver_user_id = :solver_user_id,
          mentor = :mentor
      WHERE problem_id = :problem_id
      `,
      {
        replacements: {
          solver_user_id,
          mentor: mentor || null,
          problem_id,
        },
        transaction: t,
      }
    );

    // ============================
    // DELETE REQUEST
    // ============================

    await sequelize.query(
      `
      DELETE FROM problem_solver_requests
      WHERE problem_solver_request_id = :id
      `,
      {
        replacements: { id },
        transaction: t,
      }
    );

    // ============================
    // COMMIT
    // ============================

    await t.commit();

    return res.status(200).json({
      message: "Solver assigned successfully and email sent",
    });

  } catch (error) {
    await t.rollback();

    console.error("Accept Solver Request Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};  
