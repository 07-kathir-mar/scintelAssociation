import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const AssociationMember = sequelize.define("AssociationMember", {

  phone_number: {
    type: DataTypes.STRING,
    allowNull: false
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  batch_year: {
    type: DataTypes.STRING,
    allowNull: false
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false
  },

  year: {
    type: DataTypes.STRING,
    allowNull: true
  },

  member_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }

}, {
  tableName: "association_members",
  timestamps: false
});

export default AssociationMember;
