import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import verifyAdminToken from "./middleware/verifyAdminToken.js";

import activityFetchWithBatchRoutes from "./routes/activityFetchWithBatchRoutes.js";
import activityFetchWithSpecificBatchRoutes from "./routes/activityFetchWithSpecificBatchRoutes.js";
import activityFetchWithSpecificEventRoutes from "./routes/activityFetchWithSpecificEventRoutes.js";
import associationAllBatchRoutes from "./routes/associationAllBatchRoutes.js";
import associationSpecificBatchRoutes from "./routes/associationSpecificBatchRoutes.js";
import gloriesRoutes from "./routes/gloriesRoutes.js";
import otpsendRoutes from "./routes/otpsendRoutes.js";
import otpverifyRoutes from "./routes/otpverifyRoutes.js";
import ProblemCreationRequestRoutes from "./routes/ProblemCreationRequestRoutes.js";
import currentProblemsRoutes from "./routes/currentProblemsRoutes.js";
import SpecificCurrentProblemRoutes from "./routes/SpecificCurrentProblemRoutes.js";
import AddProblemSolverRequestRoutes from "./routes/AddProblemSolverRequestRoutes.js";
import suggestionRoutes from "./routes/suggestionRoutes.js";
import Admin_addCelebrationRoute from "./routes/Admin_addCelebrationRouters.js";
import Admin_addEventRouter from "./routes/Admin_addEventRouter.js";
import AdminAnnouncementFetchRoutes from "./routes/Admin_AnnouncementPageFetchRoutes.js";
import AdminFetchSpecificRoutes from "./routes/Admin_FetchSpecificEventOrCelebrationRoutes.js";
import AdminEditRoutes from "./routes/Admin_EditEventOrCelebrationRoutes.js";
import AdminDeleteRoutes from "./routes/Admin_DeleteSpecificEventRoutes.js";
import AdminActivityBatchesRoutes from "./routes/Admin_ActivityAllBatchesRoutes.js";
import AdminActivitySpecificBatchRoutes from "./routes/Admin_ActivitySpecificBatchAllEventRoutes.js";
import AdminAddActivityRoutes from "./routes/Admin_AddActivityRoutes.js";
import AdminEditActivityRoutes from "./routes/Admin_editActivityRoutes.js";
import AdminUpdateEditActivityRoutes from "./routes/Admin_UpdateEditActivityRoutes.js";
import AdminDeleteActivityRoutes from "./routes/Admin_DeleteSpecificSuggestionRoutes.js";
import AdminLoginRoutes from "./routes/Admin_LoginRoutes.js";
import AdminDeleteSuggestionAndSendMailRoutes from "./routes/Admin_deleteSuggestionAndSendMailRoutes.js";
import AdminFetchAllSuggestionWithAcknowledgedRoutes from "./routes/Admin_fetchAllSuggestionWithAcknowledgedRoutes.js";
import AdminFetchAllSuggestionWithUnacknowledgedRoutes from "./routes/Admin_fetchAllSuggestionWithUnacknowledgedRoutes.js";
import AdminFetchSpecificSuggestionWithIdRoutes from "./routes/Admin_fetchSpecificSuggestionWithIdRoutes.js";
import AdminDeleteSpecificSuggestionRoutes from "./routes/Admin_DeleteSpecificSuggestionRoutes.js";
import AdminAddGloryRoutes from "./routes/Admin_AddGloryRoutes.js";
import AdminFetchAllGloriesRoutes from "./routes/Admin_FetchAllGloriesRoutes.js";
import AdminDeleteSpecificGloryRoutes from "./routes/Admin_DeleteSpecificGloryRoutes.js";
import AdminFetchSpecificGloryRoutes from "./routes/Admin_FetchSpecificGloryRoutes.js";
import AdminUpdateEditGloryRoutes from "./routes/Admin_UpdateEditGloryRoutes.js";
import AdminAcceptSuggestionMailRoutes from "./routes/Admin_AcceptSuggestionMailRoutes.js";
import AdminAcknowledgeSuggestionRoutes from "./routes/Admin_AcknowledgeSuggestionRoutes.js";
import AdminFetchAllresolvedSuggestionFromSuggestionRecoardRoutes from "./routes/Admin_fetchAllresolvedSuggestionFromSuggestionRecoardRoutes.js";
import AdminFetchSpecficSuggestionFromsuggestioRecoardRoutes from "./routes/Admin_fetchSpecficSuggestionFromsuggestioRecoardRoutes.js";
import AdminFetchAllUnresolvedSuggestionFromSuggestionRecoardRoutes from "./routes/Admin_fetchAllUnresolvedSuggestionFromSuggestionRecoardRoutes.js";
import AdminResolveSuggestionRoutes from "./routes/Admin_ResolveSuggestionRoutes.js";
import AdminAddAssociationBatchRoutes from "./routes/Admin_AddAssociationBatchRoutes.js";
import AdminAddMemberAssociationRoutes from "./routes/Admin_AddMemberAssociationRoutes.js";
import AdminFetchSpecificMemberAssociationRoutes from "./routes/Admin_FetchSpecificMemberAssociationRoutes.js";
import AdminUpdateEditMemberAssociationRoutes from "./routes/Admin_UpdateEditMemberAssociationRoutes.js";
import AdminDeleteMemberAssociationRoutes from "./routes/Admin_DeleteMemberAssociationRoutes.js";
import AdminDeleteSpecificBatchRoutes from "./routes/Admin_DeleteSpecificBatchRoutes.js";
import AdminFetchSpecificBatchAssociationRoutes from "./routes/Admin_FetchSpecificBatchAssociationRoutes.js";
import AdminUpdateEditAssociationBatchRoutes from "./routes/Admin_UpdateEditAssociationBatchRoutes.js";
import AdminCurrentProblemTitleListingRoutes from "./routes/Admin_CurrentProblemTitleListingRoutes.js";
import AdminCurrentProblemSpecificProblemFetchingRoutes from "./routes/Admin_CurrentProblemSpecificProblemFetchingRoutes.js";
import AdminDeleteSpecificProblemRoutes from "./routes/Admin_DeleteSpecificProblemRoutes.js";
import AdminFetchAllProblemRequestRoutes from "./routes/Admin_FetchAllProblemRequestRoutes.js";
import AdminFetchSpecificProblemRequestRoutes from "./routes/Admin_FetchSpecificProblemRequestRoutes.js";
import AdminDenyProblemCreationRequestRoutes from "./routes/Admin_DenyProblemCreationRequestRoutes.js";
import AdminAcceptProblemCreationRequestRoutes from "./routes/Admin_AcceptProblemCreationRequestRoutes.js";
import AdminAllProblemSolverRequestsRoutes from "./routes/Admin_AllProblemSolverRequestsRoutes.js";
import AdminFetchSpecificProblemSolverRequestRoutes from "./routes/Admin_FetchSpecificProblemSolverRequestRoutes.js";
import AdminAcceptProblemSolverRequestRoutes from "./routes/Admin_AcceptProblemSolverRequestRoutes.js";
import AdminDenyProblemSolverRequestRoutes from "./routes/Admin_DenyProblemSolverRequestRoutes.js";
import AdminDeleteSpecificBatchActivityRoutes from "./routes/Admin_DeleteSpecificBatchActivityRoutes.js";
import AdminDeleteSpecificActivityRoutes from "./routes/Admin_DeleteSpecificActivityRoutes.js";




const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to database:", error);
  });

app.use("/api", activityFetchWithBatchRoutes);
app.use("/api", activityFetchWithSpecificBatchRoutes);
app.use("/api", activityFetchWithSpecificEventRoutes);
app.use("/api", associationAllBatchRoutes);
app.use("/api", associationSpecificBatchRoutes);
app.use("/api", gloriesRoutes);
app.use("/api", otpsendRoutes);
app.use("/api", otpverifyRoutes); 
app.use("/api", ProblemCreationRequestRoutes);
app.use("/api", currentProblemsRoutes);
app.use("/api", SpecificCurrentProblemRoutes);
app.use("/api", AddProblemSolverRequestRoutes);
app.use("/api", suggestionRoutes);
app.use("/api", AdminLoginRoutes);
app.use("/api/admin", verifyAdminToken);
app.use("/api", Admin_addCelebrationRoute);
app.use("/api", Admin_addEventRouter);
app.use("/api", AdminAnnouncementFetchRoutes);
app.use("/api", AdminFetchSpecificRoutes);
app.use("/api", AdminEditRoutes);
app.use("/api", AdminDeleteRoutes);
app.use("/api", AdminActivityBatchesRoutes);
app.use("/api", AdminActivitySpecificBatchRoutes);
app.use("/api", AdminAddActivityRoutes);
app.use("/api", AdminEditActivityRoutes);
app.use("/api", AdminUpdateEditActivityRoutes);
app.use("/api", AdminDeleteActivityRoutes);
app.use("/api", AdminDeleteSuggestionAndSendMailRoutes);
app.use("/api", AdminFetchAllSuggestionWithAcknowledgedRoutes);
app.use("/api", AdminFetchAllSuggestionWithUnacknowledgedRoutes);
app.use("/api", AdminFetchSpecificSuggestionWithIdRoutes);
app.use("/api", AdminDeleteSpecificSuggestionRoutes); 
app.use("/api", AdminAddGloryRoutes);
app.use("/api", AdminFetchAllGloriesRoutes);
app.use("/api", AdminDeleteSpecificGloryRoutes);
app.use("/api", AdminFetchSpecificGloryRoutes);
app.use("/api", AdminUpdateEditGloryRoutes);
app.use("/api", AdminAcceptSuggestionMailRoutes);
app.use("/api", AdminAcknowledgeSuggestionRoutes);
app.use("/api", AdminFetchAllresolvedSuggestionFromSuggestionRecoardRoutes);
app.use("/api", AdminFetchAllUnresolvedSuggestionFromSuggestionRecoardRoutes);
app.use("/api", AdminFetchSpecficSuggestionFromsuggestioRecoardRoutes);
app.use("/api", AdminResolveSuggestionRoutes);
app.use("/api", AdminAddAssociationBatchRoutes);
app.use("/api", AdminAddMemberAssociationRoutes);
app.use("/api", AdminFetchSpecificMemberAssociationRoutes);
app.use("/api", AdminUpdateEditMemberAssociationRoutes);
app.use("/api", AdminDeleteMemberAssociationRoutes);
app.use("/api", AdminDeleteSpecificBatchRoutes);
app.use("/api", AdminFetchSpecificBatchAssociationRoutes);
app.use("/api", AdminUpdateEditAssociationBatchRoutes); 
app.use("/api", AdminCurrentProblemTitleListingRoutes);
app.use("/api", AdminCurrentProblemSpecificProblemFetchingRoutes);
app.use("/api", AdminDeleteSpecificProblemRoutes);
app.use("/api", AdminFetchAllProblemRequestRoutes);
app.use("/api", AdminFetchSpecificProblemRequestRoutes);
app.use("/api", AdminDenyProblemCreationRequestRoutes);
app.use("/api", AdminAcceptProblemCreationRequestRoutes);
app.use("/api", AdminAllProblemSolverRequestsRoutes); 
app.use("/api", AdminFetchSpecificProblemSolverRequestRoutes);
app.use("/api", AdminAcceptProblemSolverRequestRoutes);
app.use("/api", AdminDenyProblemSolverRequestRoutes);
app.use("/api", AdminDeleteSpecificBatchActivityRoutes);
app.use("/api", AdminDeleteSpecificActivityRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
