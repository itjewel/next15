import { AutocompleteOptions } from "features/ui";

export interface TicketActiveInactive {
  id: string;
  isActive: boolean;
  name: string;
}
export interface TicketActiveInactiveResponse {
  status: boolean;
  message: string;
}

export type ActiveFilterOption = { label: string; data: boolean };
export type SlaFilterOption = { label: string; data: boolean | string };

export type FilterFormValue = {
  ticketNumber?: string | null;
  accountNumber?: string | null;
  accountTypeName?: string | null;
  serviceTypeId?: AutocompleteOptions;
  serviceCategoryId?: AutocompleteOptions;
  serviceSubCategoryId?: AutocompleteOptions;
  departmentId?: AutocompleteOptions;
  teamId?: AutocompleteOptions;
  dateFilterType?: AutocompleteOptions;
  memberId?: AutocompleteOptions;
  priorityId?: AutocompleteOptions;
  currentStatus?: AutocompleteOptions;
  isSLAExceed?: SlaFilterOption;
  ticketType?: AutocompleteOptions;
  isActive?: ActiveFilterOption;
  startDate?: string | null;
  endDate?: string | null;
  SortFields?: AutocompleteOptions[];
  RequestedColumns?: AutocompleteOptions[];
};

export type FilterRequestValue = {
  ticketNumber?: string | null;
  accountNumber?: string | null;
  accountTypeName?: string | null;
  serviceTypeId?: string | null;
  serviceCategoryId?: string | null;
  serviceSubCategoryId?: string | null;
  departmentId?: string | null;
  teamId?: string | null;
  dateFilterType?: string | null;
  memberId?: string | null;
  priorityId?: string | null;
  currentStatus?: string | null;
  isSLAExceed?: boolean | null;
  ticketType?: string | null;
  isActive?: boolean | null;
  startDate?: string | null;
  endDate?: string | null;
  SortFields?: { SortBy: string; SortOrder: string }[] | null;

  RequestedColumns?: { [key: number]: string } | null;
};

export interface TransformedColumn {
  field: string;
  header: string;
  className?: string;
}
export interface UserData {
  name: string;
  roleName: string;
  departmentId: number;
  departmentName: string;
  teamId: number;
  teamName: string;
  phoneNumber: string;
  email: string;
  isCheckedIn: boolean;
  status: string;
  currentTicketCount: number;
  userName: string;
}
export interface UserResponse {
  status: boolean;
  message: string;
  data: UserData;
}
