import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProblemCreationRequest = sequelize.define("ProblemCreationRequest", {
  problem_creation_request_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },

  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  year: DataTypes.STRING,
  section: DataTypes.STRING,
  title: DataTypes.STRING,
  category: DataTypes.STRING,
  short_description: DataTypes.STRING,
  detailed_description: DataTypes.TEXT
}, {
  tableName: "problem_creation_requests",
  timestamps: false
});

export default ProblemCreationRequest;
