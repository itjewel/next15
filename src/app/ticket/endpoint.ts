export const ApiPrefix = "/crm/api";
export const UserServiceApiPrefix = "/users/api";
export const FilePrefix = `${process.env.NEXT_PUBLIC_API_URL}/static`;

export enum Api {
  // Auth
  Login = "/users/api/Authentication/CRMLogin",
  LogOut = `/users/api/Authentication/CRMLogout`,
  RefreshToken = "/users/api/Authentication/RefreshToken",
  CRMForgetPassword = "/users/api/Authentication/CRMForgetPassword",
  CRMResetPassword = "/users/api/Authentication/CRMResetPassword",
  CRMUserOtpRetryByEmail = "/users/api/Authentication/CRMUserOtpRetryByEmail",
  ChangePassword = "/users/api/User/ChangePassword",
  HealthCheck = "users/api/HealthCheck",
  // Orders
  GetAllOrders = "/orders",
  OrderAccept = "/orders/restaurant-accept/",

  // Menu Create OLD @TODO: should be delete
  CreateMenu = "/",
  GetMenuActionDropdown = "/",
  GetParentMenuListOptions = "/",
  GetUsers = "/",

  //check in
  Checkin = `${ApiPrefix}/Shift/check-in`,

  //check out
  Checkout = `${ApiPrefix}/Shift/check-out`,

  //Dashboard
  GetServiceCombinationCount = `${ApiPrefix}/Dashboard/GetServiceCombinationCount`,
  GetOrganizationCountForDashboard = `${ApiPrefix}/Dashboard/GetOrganizationCountForDashboard`,
  GetOrganizationCountForDepartmentAdmin = `${ApiPrefix}/Dashboard/GetOrganizationCountForDepartmentAdmin`,
  GetOrganizationCountForTeamLead = `${ApiPrefix}/Dashboard/GetOrganizationCountForTeamLead`,
  GetAllTicketCountByStatusForDashboard = `${ApiPrefix}/Dashboard/GetAllTicketCountByStatusForDashboard`,
  GetAllTicketCountForDepartmentAdmin = `${ApiPrefix}/Dashboard/GetAllTicketCountForDepartmentAdmin`,
  GetAllTicketCountForTeamLead = `${ApiPrefix}/Dashboard/GetAllTicketCountForTeamLead`,
  GetAllTicketCountForSP = `${ApiPrefix}/Dashboard/GetAllTicketCountForSP`,
  GetTicketSummaryCSV = `${ApiPrefix}/Dashboard/GetTicketSummaryCSV`,
  GetSLASummaryCSV = `${ApiPrefix}/Dashboard/GetSLASummaryCSV`,

  // service
  ServiceType = `${ApiPrefix}/ServiceType`,
  UpdateServiceTypeWithCategory = `${ApiPrefix}/ServiceType/UpdateServiceTypeWithCategory`,
  ServiceTypeOptions = `${ApiPrefix}/ServiceType/Option`,
  ServiceTypeCustomizeOptions = `${ApiPrefix}/ServiceType/GetCustomizeOption`,
  ServiceCategory = `${ApiPrefix}/ServiceCategory`,
  ServiceCategoryOption = `${ApiPrefix}/ServiceCategory/Option`,
  ServiceCategoryCustomizeOption = `${ApiPrefix}/ServiceCategory/GetCustomizeOption`,
  ServiceSubCategoryOption = `${ApiPrefix}/ServiceSubCategory/Option`,
  ServiceSubCategoryCustomizeOption = `${ApiPrefix}/ServiceSubCategory/GetCustomizeOption`,
  GetServiceCategoryByServiceTypeId = `${ApiPrefix}/ServiceCategory/GetServiceCategoryByServiceTypeId`,
  GetServiceCategoryForServiceTypeEdit = `${ApiPrefix}/ServiceCategory/GetServiceCategoryForServiceTypeEdit`,
  GetServiceCategoryByTeamId = `${ApiPrefix}/ServiceCategory/GetServiceCategoryByTeamId`,
  GetSubCategoriesByCategoryId = `${ApiPrefix}/ServiceSubCategory/GetSubCategoriesByCategoryId`,
  ServiceSubCategory = `${ApiPrefix}/ServiceSubCategory`,
  GetServiceSubCategoryByServiceCategoryId = `${ApiPrefix}/ServiceSubCategory/GetSubCategoriesByCategoryId`,

  //Team
  Team = `${ApiPrefix}/Team`,
  IsAutoDistributonSettingTurnedOn = `${ApiPrefix}/Team/IsAutoDistributonSettingTurnedOn`,
  TeamOptions = `${ApiPrefix}/Team/Option`,
  TeamOptionForOrganizationBuilder = `${ApiPrefix}/Team/OptionForOrganizationBuilder`,
  UnassignedTeamLeadTeamOptions = `${ApiPrefix}/Team/UnassignedTeamLeadTeamOptions`,
  TeamCustomizeOption = `${ApiPrefix}/Team/CustomizeOption`,
  GetUnassignedTeams = `${ApiPrefix}/Team/GetUnassignedTeams`,
  GetTeamsByDepartmentId = `${ApiPrefix}/Team/GetTeamsByDepartmentId`,
  DeleteWithServiceCategoryEdit = `${ApiPrefix}/Team/v2/DeleteWithServiceCategoryEdit`,

  //Member
  Member = `${ApiPrefix}/Member`,
  MemberBulkInsert = `${ApiPrefix}/Member/BulkInsert`,
  MemberOptions = `${ApiPrefix}/Member/Option`,
  ServiceProviderOptions = `${ApiPrefix}/Member/ServiceProviderOptions`,
  MemberCustomizeOption = `${ApiPrefix}/Member/CustomizeOption`,
  GetMembersByTeamId = `${ApiPrefix}/Member/GetMembersByTeamId`,
  GetAllNoPagination = `${ApiPrefix}/Member/GetAllNoPagination`,
  GetRoleOption = `${ApiPrefix}/Member/GetRoleOption`,
  AssignMemberToDepartment = `${ApiPrefix}/Member/AssignMemberToDepartment`,
  UnAssignMemberFromDepartment = `${ApiPrefix}/Member/UnAssignMemberFromDepartment`,
  AssignMemberToTeam = `${ApiPrefix}/Member/AssignMemberToTeam`,
  UnAssignMemberFromTeam = `${ApiPrefix}/Member/UnAssignMemberFromTeam`,
  MoveMemberToSameDepartmentTeam = `${ApiPrefix}/Member/MoveMemberToSameDepartmentTeam`,
  MoveMemberToOtherDepartmentTeam = `${ApiPrefix}/Member/MoveMemberToOtherDepartmentTeam`,
  MemberPromote = `${ApiPrefix}/Member/Promote`,
  MemberDemote = `${ApiPrefix}/Member/Demote`,

  //CRM User
  CRMUserNames = `${UserServiceApiPrefix}/User/GetCRMNames`,
  GetUserByMobileNumberOrEmail = `${UserServiceApiPrefix}/User/GetUserByMobileNumberOrEmail`,

  //CRM User role option
  CRMUserRole = `${UserServiceApiPrefix}/Role/GetCRMUserRole`,

  //Member role
  MemberRole = `${ApiPrefix}/Member/GetRoleOption`,
  GetMembersByRole = `${ApiPrefix}/Member/GetMembersByRole`,
  GetMembersByRoleId = `${ApiPrefix}/Member/GetMembersByRoleId`,

  // depeartment
  Department = `${ApiPrefix}/Department`,
  DepartmentAssignTeam = `${ApiPrefix}/Department/AssignTeam`,
  DepartmentUnAssignTeam = `${ApiPrefix}/Department/UnAssignTeam`,
  UnAssignTeamWithCategory = `${ApiPrefix}/Department/UnAssignTeamWithCategory`,
  DepartmentMoveTeam = `${ApiPrefix}/Department/MoveTeam`,
  DepartmentOption = `${ApiPrefix}/Department/Option`,
  GetUserwiseDepartmentOption = `${ApiPrefix}/Department/GetUserwiseDepartmentOption`,
  UnassignedAdminDepartmentOptions = `${ApiPrefix}/Department/UnassignedAdminDepartmentOptions`,

  // Expertise
  Expertise = `${ApiPrefix}/Expertise`,
  ExpertiseOptions = `${ApiPrefix}/Expertise/Option`,

  // Department team user

  DepartmentTeamMember = `${ApiPrefix}/DepartmentTeamMember`,

  // AccountType
  AccountType = `${ApiPrefix}/AccountType`,
  AccountTypeOption = `${ApiPrefix}/AccountType/option`,

  // User type names
  UserTypeNames = `${UserServiceApiPrefix}/User/GetUserTypeNames`,

  // Ticket
  AllTicketList = `${ApiPrefix}/Ticket/AllTicketView`,
  Ticket = `${ApiPrefix}/Ticket`,
  TicketGetAll = `${ApiPrefix}/Ticket/V2/GetAll`,
  GetAllTicketsForDepartmentAdmin = `${ApiPrefix}/Ticket/GetAllTicketsForDepartmentAdmin`,
  GetAllTicketsForTeamLead = `${ApiPrefix}/Ticket/GetAllTicketsForTeamLead`,
  GetAllTicketsForSP = `${ApiPrefix}/Ticket/GetAllTicketsForSP`,
  GetOneForEdit = `${ApiPrefix}/Ticket/GetOneForEdit`,
  TicketOptions = `${ApiPrefix}/Ticket/Option`,
  TicketOptionsOrderBy = `${ApiPrefix}/Ticket/options`,
  TicketType = `${ApiPrefix}/Ticket/GetTicketTypeOption`,
  TicketOpenDetails = `${ApiPrefix}/Ticket/OpenATicketByServiceProvider`,
  GetTicketForReopen = `${ApiPrefix}/Ticket/GetTicketForReopen`,
  TicketReturn = `${ApiPrefix}/Ticket/TicketReturn`,
  TicketClose = `${ApiPrefix}/Ticket/StatusChangeClose`,
  TicketOpen = `${ApiPrefix}/Ticket/Open`,
  TicketReopen = `${ApiPrefix}/Ticket/re-open`,
  MessageTicketDistributeToMembers = `${ApiPrefix}/Ticket/MessageTicketDistributeToMembers`,
  TicketBulkAssign = `${ApiPrefix}/Ticket/BulkAssign`,
  TicketBulkForward = `${ApiPrefix}/Ticket/BulkForward`,
  // TicketReturn = `${ApiPrefix}/Ticket/TicketReturn`,
  GetAllTicketForBulkAssign = `${ApiPrefix}/Ticket/GetAllTicketForBulkAssign`,
  GetAllTicketForBulkReturnForAdmin = `${ApiPrefix}/Ticket/GetAllTicketForBulkReturnForAdmin`,
  GetAllTicketForBulkAssignForDepartmentAdmin = `${ApiPrefix}/Ticket/GetAllTicketForBulkAssignForDepartmentAdmin`,
  GetAllTicketForBulkAssignForTeamLead = `${ApiPrefix}/Ticket/GetAllTicketForBulkAssignForTeamLead`,
  GetAllTicketForBulkReturn = `${ApiPrefix}/Ticket/GetAllTicketForBulkReturn`,
  GetAllTicketForBulkReturnForTeamLead = `${ApiPrefix}/Ticket/GetAllTicketForBulkReturnForTeamLead`,
  GetAllTicketForBulkForward = `${ApiPrefix}/Ticket/GetAllTicketForBulkForward`,
  GetAllTicketForBulkForwardForDepartmentAdmin = `${ApiPrefix}/Ticket/GetAllTicketForBulkForwardForDepartmentAdmin`,
  GetAllTicketForBulkReturnForSP = `${ApiPrefix}/Ticket/GetAllTicketForBulkReturnForSP`,
  TicketReject = `${ApiPrefix}/Ticket/reject`,
  GetTicketCSV = `${ApiPrefix}/Ticket/GetTicketCSV`,
  SolveTicket = `${ApiPrefix}/Ticket/Solve`,

  //Ticket life cycle

  TicketLifeCycle = `${ApiPrefix}/TicketLifeCycle`,

  //Ticket life cycle

  TicketHistory = `${ApiPrefix}/TicketHistory`,
  TicketHistoryByTicketId = `${ApiPrefix}/TicketHistory/GetByTicketId`,

  // Ticket priority
  TicketPriority = `${ApiPrefix}/TicketPriority`,
  TicketPriorityOptions = `${ApiPrefix}/TicketPriority/Option`,
  TicketPriorityOptionsWithSortingIdex = `${ApiPrefix}/TicketPriority/GetOptionWithSortingNumber`,
  TicketPriorityById = `${ApiPrefix}/TicketPriority/id`,
  TicketPrioritySort = `${ApiPrefix}/TicketPriority/Sort`,
  TicketPriorityIsNameExist = `${ApiPrefix}/TicketPriority/IsNameExist`,
  TicketPriorityIsSortIndexExist = `${ApiPrefix}/TicketPriority/IsSortIndexExist`,

  //POE
  PoEType = `${ApiPrefix}/PoEType`,
  PoETypeOptions = `${ApiPrefix}/PoEType/Option`,
  POE = `${ApiPrefix}/PoE`,
  POEOptions = `${ApiPrefix}/PoE/Option`,
  GetOptionsWithDropDownPoE = `${ApiPrefix}/PoE/GetOptionsWithDropDownPoE`,

  PoEGroup = `${ApiPrefix}/PoEGroup`,
  PoEGroupGetAllByCombination = `${ApiPrefix}/PoEGroup/GetAllByCombination`,
  PoEGroupCombine = `${ApiPrefix}/Ticket/GetATicketFromBuildingPoEs`,
  GetManyTicketFormBuildingPoEs = `${ApiPrefix}/Ticket/GetManyTicketFormBuildingPoEs`,
  PoEGroupByServiceTypeAndServiceCategoryAndServiceSubCategoryId = `${ApiPrefix}/PoEGroup/GetPoEGroupByServiceTypeAndServiceCategoryAndServiceSubCategoryId`,
  PoEGroupDeleteByServiceCombination = `${ApiPrefix}/PoEGroup/DeleteByServiceCombination`,
  PoEGetSort = `${ApiPrefix}/PoEGroup/GetForSort`,
  PoEUpdateSort = `${ApiPrefix}/PoEGroup/SortPoEGroupByPosition`,

  PoEDetails = `${ApiPrefix}/PoEDetail`,
  PoEDetailDeleteByPoEId = `${ApiPrefix}/PoEDetail/DeleteByPoEId`,
  PoEDetailsGetAllByPoE = `${ApiPrefix}/PoEDetail/GetAllByPoE`,
  PoEDetailById = `${ApiPrefix}/PoEDetail/GetPoEDetailsByPoEId`,
  PoEOptions = `${ApiPrefix}/PoE/Option`,

  //SLA settings
  SLASetting = `${ApiPrefix}/SLASetting`,
  SLASettingGetManyPaginatedAndFiltered = `${ApiPrefix}/SLASetting/GetManyPaginatedAndFiltered`,
  SLASettingGetOne = `${ApiPrefix}/SLASetting/GetOne`,
  SLASettingEditByAddAndInActive = `${ApiPrefix}/SLASetting/EditByAddAndInActive`,
  SLASettingActivationToggle = `${ApiPrefix}/SLASetting/ActivationToggle`,
  SLASettingTurnOnAndTurnOffAllExceptThis = `${ApiPrefix}/SLASetting/TurnOnAndTurnOffAllExceptThis`,
  SLASettingOption = `${ApiPrefix}/SLASetting/Option`,

  // Date wise shift
  DateWiseShift = `${ApiPrefix}/DateWiseShift`,
  DateWiseShiftOption = `${ApiPrefix}/DateWiseShift/Option`,
  GetDateWiseShiftByMember = `${ApiPrefix}/DateWiseShift/GetDateWiseShiftByMember`,
  //Shift
  Shift = `${ApiPrefix}/Shift`,
  GetShiftAttendance = `${ApiPrefix}/Shift/GetShiftAttendance`,
  GetMemberShiftAttendance = `${ApiPrefix}/Shift/GetMemberShiftAttendance`,
  ShiftMemberMapping = `${ApiPrefix}/ShiftMemberMapping`,
  GetMemberByShift = `${ApiPrefix}/ShiftMemberMapping/GetMemberByShift`,
  ShiftOption = `${ApiPrefix}/Shift/Option`,

  //Shift application type options
  ShiftApplicationTypeOption = `${ApiPrefix}/ShiftApplicationType/Option`,

  // Event
  EventList = `${ApiPrefix}/Event`,
  //ShiftApplication
  ShiftApplication = `${ApiPrefix}/ShiftApplication`,
  // Weekly holiday
  WeeklyHoliday = `${ApiPrefix}/WeeklyHoliday/Option`,
  WeeklyHolidayCreate = `${ApiPrefix}/WeeklyHoliday`,
  WeeklyHolidayList = `${ApiPrefix}/WeeklyHoliday`,

  //UserWiseShift
  UserWiseShift = `${ApiPrefix}/UserWiseShift`,
  GetUserWiseShiftByDateWiseShift = `${ApiPrefix}/UserWiseShift/GetUserWiseShiftByDateWiseShift`,

  // WeekDayOption
  WeekDayOption = `/riders/api/Weekday/Option`,
  // Shift application approve
  ShiftApplicationApprove = `${ApiPrefix}/ShiftApplicationApprove`,

  // public holiday
  PublicHoliday = `${ApiPrefix}/PublicHoliday`,
  // Ticket status
  TicketStatus = `${ApiPrefix}/TicketStatus`,
  TicketStatusOptions = `${ApiPrefix}/TicketStatus/Option`,

  // Feedback item
  FeedbackItem = `${ApiPrefix}/Feedback/FeedbackItem`,
  FeedbackGroupOptions = `${ApiPrefix}/Feedback/FeedbackGroup/Option`,
  FeedbackGroup = `${ApiPrefix}/Feedback/FeedbackGroup`,
  GetUserFeedbackCSV = `${ApiPrefix}/Feedback/UserFeedbackCSV`,

  //Feedback group
  UserFeedback = `${ApiPrefix}/Feedback/UserFeedback`,
  GetFeedBackItembyFeedbackNo = `${ApiPrefix}/Feedback/GetFeedBackItembyFeedbackNo`,
  UserFeedbackSetOpen = `${ApiPrefix}/Feedback/SetOpen`,
  UserFeedbackSetClose = `${ApiPrefix}/Feedback/SetClose`,
  FeedbackStatusOption = `${ApiPrefix}/Feedback/FeedbackStatusOption`,

  //Predefined Reason
  PredefinedReason = `${ApiPrefix}/PredefinedReason`,
  PredefinedReasonCreate = `${ApiPrefix}/PredefinedReason`,
  PredefinedReasonDelete = `${ApiPrefix}/PredefinedReason`,
  reasonTypeOptions = `${ApiPrefix}/PredefinedReason/ResonTypeOption`,
  PredefinedReasonOption = `${ApiPrefix}/PredefinedReason/Option`,

  //Member threshold setting team wise
  MemberThresholdSettingTeamWise = `${ApiPrefix}/MemberThresholdSettingTeamWise`,
  MemberThresholdSettingTeamWiseGetManyPaginatedAndFiltered = `${ApiPrefix}/MemberThresholdSettingTeamWise/GetManyPaginatedAndFiltered`,

  MemberThresholdSettingTeamWiseGetOne = `${ApiPrefix}/MemberThresholdSettingTeamWise/GetOne`,
  MemberThresholdSettingTeamWiseEditByAddAndInActive = `${ApiPrefix}/MemberThresholdSettingTeamWise/EditByAddAndInActive`,
  MemberThresholdSettingTeamWiseActivationToggle = `${ApiPrefix}/MemberThresholdSettingTeamWise/ActivationToggle`,
  MemberThresholdSettingTeamWiseTurnOnAndTurnOffAllExceptThis = `${ApiPrefix}/MemberThresholdSettingTeamWise/TurnOnAndTurnOffAllExceptThis`,

  //Member threshold setting team wise
  MaxTicketSubmissionSetting = `${ApiPrefix}/MaxTicketSubmissionSetting`,
  MaxTicketSubmissionSettingGetManyPaginatedAndFiltered = `${ApiPrefix}/MaxTicketSubmissionSetting/GetManyPaginatedAndFiltered`,

  MaxTicketSubmissionSettingGetOne = `${ApiPrefix}/MaxTicketSubmissionSetting/GetOne`,
  MaxTicketSubmissionSettingEditByAddAndInActive = `${ApiPrefix}/MaxTicketSubmissionSetting/EditByAddAndInActive`,
  MaxTicketSubmissionSettingActivationToggle = `${ApiPrefix}/MaxTicketSubmissionSetting/ActivationToggle`,
  MaxTicketSubmissionSettingTurnOnAndTurnOffAllExceptThis = `${ApiPrefix}/MaxTicketSubmissionSetting/TurnOnAndTurnOffAllExceptThis`,

  //Member threshold setting team wise
  TicketThresholdSetting = `${ApiPrefix}/TicketThresholdSetting`,
  TicketThresholdSettingGetManyPaginatedAndFiltered = `${ApiPrefix}/TicketThresholdSetting/GetManyPaginatedAndFiltered`,

  TicketThresholdSettingGetOne = `${ApiPrefix}/TicketThresholdSetting/GetOne`,
  TicketThresholdSettingEditByAddAndInActive = `${ApiPrefix}/TicketThresholdSetting/EditByAddAndInActive`,
  TicketThresholdSettingActivationToggle = `${ApiPrefix}/TicketThresholdSetting/ActivationToggle`,
  TicketThresholdSettingTurnOnAndTurnOffAllExceptThis = `${ApiPrefix}/TicketThresholdSetting/TurnOnAndTurnOffAllExceptThis`,

  //Options
  MemberOption = `${ApiPrefix}/Member/Option`,

  //Organization history
  OrganizationHistory = `${ApiPrefix}/OrganizationHistory`,

  //Organization builder
  OrganizationBuilder = `${ApiPrefix}/OrganizationBuilder`,
  GetOrganizationMappingFilteredData = `${ApiPrefix}/OrganizationBuilder/GetOrganizationMappingFilteredData`,

  //OperationStates Option
  OperationStatesOption = `${ApiPrefix}/OperationStates/Option`,

  // Ticket Report

  TicketSummaryReport = `${ApiPrefix}/Dashboard/GetTicketSummaryAsync`,

  // SLA Report

  SLASummaryReport = `${ApiPrefix}/Dashboard/GetSLASummary`,
}
