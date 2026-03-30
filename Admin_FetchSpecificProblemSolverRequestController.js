import sequelize from "../config/database.js";
import { QueryTypes } from "sequelize";

export const fetchSpecificProblemSolverRequest = async (req, res) => {
  try {
    const { id } = req.params;

    // ============================
    // JOIN QUERY
    // ============================

    const [data] = await sequelize.query(
      `
      SELECT
        psr.problem_solver_request_id,
        
        -- Student Details
        psr.name,
        psr.email,
        psr.phone_number,
        psr.year,
        psr.section,
        psr.mentor,
        psr.team_members,

        -- Problem Details
        cp.title,
        cp.category,
        cp.short_description,
        cp.detailed_description

      FROM problem_solver_requests psr
      JOIN current_problems cp
        ON psr.problem_id = cp.problem_id

      WHERE psr.problem_solver_request_id = :id
      `,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );

    // ============================
    // NOT FOUND
    // ============================

    if (!data) {
      return res.status(404).json({
        message: "Problem solver request not found",
      });
    }

    // ============================
    // RESPONSE
    // ============================

    return res.status(200).json({
      message: "Problem solver request fetched successfully",
      data,
    });

  } catch (error) {
    console.error("Fetch Specific Solver Request Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
