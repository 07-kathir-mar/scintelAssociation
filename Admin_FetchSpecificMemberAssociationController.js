import sequelize from "../config/database.js";
import { QueryTypes } from "sequelize";

export const fetchSpecificMember = async (req, res) => {
  try {
    const { id } = req.params;

    const [member] = await sequelize.query(
      `
      SELECT 
        member_id,
        phone_number,
        name,
        role,
        year,
        batch_year
      FROM association_members
      WHERE member_id = :id
      `,
      {
        replacements: { id },
        type: QueryTypes.SELECT,
      }
    );

    // ============================
    // NOT FOUND
    // ============================

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    // ============================
    // RESPONSE
    // ============================

    return res.status(200).json({
      data: member,
    });

  } catch (error) {
    console.error("Fetch Member Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
