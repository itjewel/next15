import { Api, useGet } from "features/api";
import { useAuth } from "features/auth";
import { ProfileResponse } from "features/profile/profile.types";
import { ActionMenu, AutocompleteOptions } from "features/ui";
import { FormateLargeText, Roles, dateTimeFormat } from "herlper";
import { ColumnProps } from "primereact/column";
import { AiOutlineEdit, AiOutlineHistory } from "react-icons/ai";
import { FaEye, FaHistory } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FilterFormValue, TicketActiveInactive } from "./ticket-types";
import { useEffect } from "react";
import { useFormikContext } from "formik";

export const Columns = (
  handleActiveInactive: (data: TicketActiveInactive) => void,
  handleEdit: (id: string) => void,
  handleHistory: (id: string) => void,
  handleLifeCycle: (id: string) => void,
  handleOpen: (id: string) => void,
  handleView: (id: string) => void
): ColumnProps[] => {
  const data = useAuth();

  const { data: memberDetails } = useGet<ProfileResponse>(
    data?.user?.userId ? `${Api.Member}/${data?.user?.userId}` : ""
  );

  const { values } = useFormikContext<FilterFormValue>();
  function toCamelCase(str: string): string {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  const { RequestedColumns } = values;
  const newArray =
    RequestedColumns?.map((val) => ({
      field: toCamelCase(val.value),
      header: val.label,
    })) ?? [];

  console.log({ newArray }, "Columns pages");

  return [
    { field: "ticketNumber", header: "Ticket number" },
    { field: "accountNumber", header: "Account number" },
    ...newArray,
    // { field: "accountTypeName", header: "Account type" },
    // { field: "serviceName", header: "Service type" },
    // { field: "ticketType", header: "Ticket type" },
    // { field: "categoryName", header: "Service category" },
    // { field: "subCategoryName", header: "Service sub category" },
    // { field: "departmentName", header: "Department" },
    // { field: "teamName", header: "Team" },
    // { field: "memberName", header: "Member" },
    // {
    //   field: "predefinedReasonName",
    //   header: "Predefined reason",
    //   className: "large-text-style",
    //   body(data) {
    //     return FormateLargeText(data?.predefinedReasonName || "");
    //   },
    // },
    // {
    //   field: "reason",
    //   header: "Remarks",
    //   className: "large-text-style",
    //   body(data) {
    //     return FormateLargeText(data?.reason);
    //   },
    // },
    // { field: "priorityName", header: "Priority name" },
    // { field: "currentStatus", header: "Current status" },
    // { field: "sla", header: "SLA" },
    // {
    //   field: "isSLAExceed",
    //   header: "SLA exceeded",
    //   body(data) {
    //     return data?.isSLAExceed ? "Yes" : "No";
    //   },
    // },

    // {
    //   field: "createdAt",
    //   header: "Created at",
    //   body(data) {
    //     return dateTimeFormat(data.createdAt);
    //   },
    // },
    // {
    //   field: "updatedAt",
    //   header: "Updated at",
    //   body(data) {
    //     return dateTimeFormat(data.updatedAt);
    //   },
    // },
    {
      field: "actions",
      header: "Actions",
      body(data, options) {
        const items = [
          {
            label: "Edit",
            icon: <AiOutlineEdit className="mr-2" />,
            command: () => handleEdit(data?.id),
          },
          {
            label: "History",
            icon: <AiOutlineHistory className="mr-2" />,
            command: () => handleHistory(data?.id),
          },
          {
            label: "Life cycle tree",
            icon: <FaHistory className="mr-2" />,
            command: () => handleLifeCycle(data?.id),
          },
        ];

        let newList = [];

        if (
          data?.currentStatus == "assigned" &&
          memberDetails?.data?.roleName === Roles.agent
        ) {
          newList = [
            {
              label: "Open",
              icon: <HiOutlineMailOpen className="mr-2" />,
              command: () => handleOpen(data?.id),
            },
            ...items,
          ];
        } else {
          newList = [
            {
              label: "View",
              icon: <FaEye className="mr-2" />,
              command: () => handleView(data?.id),
            },
            ...items,
          ];
        }

        if (data?.isActive) {
          return <ActionMenu items={newList} />;
        }
      },
    },
  ];
};

export const requestedColumn = [
  { field: "AccountTypeName", header: "Account type" },
  { field: "ServiceTypeName", header: "Service type" },
  { field: "TicketType", header: "Ticket type" },
  { field: "CategoryName", header: "Service category" },
  { field: "SubCategoryName", header: "Service sub category" },
  { field: "DepartmentName", header: "Department" },
  { field: "TeamName", header: "Team" },
  { field: "MemberName", header: "Member" },
  { field: "PriorityName", header: "Priority name" },
  { field: "CurrentStatus", header: "Current status" },
  {
    field: "SLA",
    header: "SLA",
    // body(data) {
    //   return dateTimeFormat(data.updatedAt);
    // },
  },
  { field: "PredefinedReasonName", header: "Predefined reason" },
  { field: "Note", header: "Note" },
  { field: "Reason", header: "Remarks" },
  { field: "IsReopened", header: "Is Reopened" },
  { field: "IsSolved", header: "Is Solved" },
  { field: "IsActive", header: "Is Active" },
  { field: "IsOpened", header: "Is Opened" },
  { field: "IsSLAExceed", header: "SLA exceeded" },
  { field: "CreatedAt", header: "Created at" },
  { field: "UpdatedAt", header: "Updated at" },
];
