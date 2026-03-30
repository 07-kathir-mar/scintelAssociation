import User from "./User.js";
import Activity from "./Activity.js";
import AssociationBatch from "./AssociationBatch.js";
import AssociationMember from "./AssociationMember.js";
import UpcomingEvent from "./UpcomingEvent.js";
import UpcomingCelebration from "./UpcomingCelebration.js";
import ScintelGlory from "./ScintelGlory.js";
import Suggestion from "./Suggestion.js";
import ProblemCreationRequest from "./ProblemCreationRequest.js";
import ProblemSolverRequest from "./ProblemSolverRequest.js";
import CurrentProblem from "./CurrentProblem.js";
import CurrentProblemTeamMember from "./CurrentProblemTeamMember.js";


// Relationships




User.hasMany(CurrentProblem, {
  foreignKey: "creator_user_id",
  as: "createdProblems"
});

CurrentProblem.belongsTo(User, {
  foreignKey: "creator_user_id",
  as: "creator"
});


User.hasMany(CurrentProblem, {
  foreignKey: "solver_user_id",
  as: "solvedProblems"
});

CurrentProblem.belongsTo(User, {
  foreignKey: "solver_user_id",
  as: "solver"
});


CurrentProblem.hasMany(ProblemSolverRequest, {
  foreignKey: "problem_id"
});

ProblemSolverRequest.belongsTo(CurrentProblem, {
  foreignKey: "problem_id"
});

CurrentProblem.hasMany(CurrentProblemTeamMember, {
  foreignKey: "problem_id"
});

CurrentProblemTeamMember.belongsTo(CurrentProblem, {
  foreignKey: "problem_id"
});

User.hasMany(CurrentProblemTeamMember, {
  foreignKey: "user_id"
});

CurrentProblemTeamMember.belongsTo(User, {
  foreignKey: "user_id"
});

export {
  User,
  Activity,
  AssociationBatch,
  AssociationMember,
  UpcomingEvent,
  UpcomingCelebration,
  ScintelGlory,
  Suggestion,
  ProblemCreationRequest,
  ProblemSolverRequest,
  CurrentProblem,
  CurrentProblemTeamMember
};
