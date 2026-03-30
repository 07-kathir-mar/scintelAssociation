import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProblemSolverRequest = sequelize.define("ProblemSolverRequest", {
  problem_solver_request_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },

  problem_id: DataTypes.INTEGER,
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  year: DataTypes.STRING,
  section: DataTypes.STRING,
  mentor: DataTypes.STRING,
  team_members: DataTypes.JSONB
}, {
  tableName: "problem_solver_requests",
  timestamps: false
});

export default ProblemSolverRequest;
