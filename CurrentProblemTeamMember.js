import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CurrentProblemTeamMember = sequelize.define("CurrentProblemTeamMember", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  problem_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "current_problem_team_members",
  timestamps: false
});

export default CurrentProblemTeamMember;
