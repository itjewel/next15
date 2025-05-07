import { Api, useDropDownAction, useGetOptions } from "features/api";
import {
  AutocompleteOptions,
  FormikAutoComplete,
  FormikSelectField,
  FormikSubmitButton,
  FormikTextField,
  Row,
  useDataTableContext,
} from "features/ui";
import { Form, Formik, useFormikContext } from "formik";
import { trimObjectStrings, useFilteredOptions } from "herlper";
import { DeleteSavedFilter, GetSavedFilter, SaveFilter } from "herlper/filter";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterFormInitialValue, slaFilterOptions } from "./constants";
import { DownloadTicketBtn } from "./download-ticket/download-ticket-btn.component";
import { FilterFormValue, FilterRequestValue } from "./ticket-types";
import { requestedColumn } from "./columns";

type MemberOptions = {
  label?: string;
  value?: number | string;
  teamIds: string[];
};

// type SortOption = {
//   value: string;
//   label: string;
//   orderby: string;
//   sortBy: string;
// };
type SortOptionFiltering = {
  label: string;
  value: string;
  order: "asc" | "desc";
};

export const Filter = () => {
  const { setFieldValue, resetForm } = useFormikContext();
  const { pathname } = useRouter();
  const initialValues = GetSavedFilter<FilterFormValue>(
    pathname,
    FilterFormInitialValue
  );
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | null
  >();

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>();
  const [serviceTypeId, setServiceTypeId] = useState<string | null>();
  const [serviceCategoryId, setServiceCategoryId] = useState<string | null>();

  const ticketTypeOptions = useDropDownAction(Api.TicketType);
  const serviceOptions = useGetOptions(`${Api.ServiceTypeCustomizeOptions}`);
  const categoryOptions = useGetOptions(
    `${Api.ServiceCategoryCustomizeOption}`
  );
  const subOptions = useGetOptions(`${Api.ServiceSubCategoryCustomizeOption}`);
  const departmentOptions = useGetOptions(`${Api.GetUserwiseDepartmentOption}`);
  const teamOptions = useGetOptions(`${Api.TeamCustomizeOption}`);
  const memberOptions = useGetOptions<MemberOptions>(
    `${Api.MemberCustomizeOption}`
  );
  const priorityOptions = useGetOptions(`${Api.TicketPriorityOptions}`);
  const currentStatusOptions = useGetOptions(`${Api.TicketStatusOptions}`);
  const ticketOptionsOrderBy = useGetOptions(`${Api.TicketOptionsOrderBy}`);
  const { setFilters, resetFilters } = useDataTableContext();

  type SortFieldOption = AutocompleteOptions & {
    id?: number;
    val?: number;
    orderby?: string;
    sortby?: string;
  };

  const [sortFieldValue, setSortFieldValue] = useState<SortFieldOption[]>([]);
  const [newTicketOptionsOrderBy, setNewTicketOptionsOrderBy] = useState<{
    options: SortOptionFiltering[];
  }>({ options: [] });

  useEffect(() => {
    const usedSortBy = sortFieldValue.map((item) => item.val);
    const { options } = ticketOptionsOrderBy;

    const getOptions = options.filter(
      (value) => !usedSortBy.includes(Number(value.value))
    );

    let filteredOptions: SortOptionFiltering[] = [];
    if (sortFieldValue.length < 3) {
      filteredOptions = getOptions as SortOptionFiltering[];
    } else {
      filteredOptions = [];
    }

    setNewTicketOptionsOrderBy({ options: filteredOptions });
  }, [sortFieldValue]);

  /* End Options sorting filtering*/
  // console.log({ newTicketOptionsOrderBy });
  const teamCustomizeOption = useFilteredOptions(
    teamOptions?.options,
    "departmentId",
    selectedDepartmentId
  );

  const memberCustomizeOption = memberOptions?.options?.filter((option) =>
    option?.teamIds?.includes(selectedTeamId ? selectedTeamId : "")
  );

  const serviceTypeCustomizeOption = useFilteredOptions(
    serviceOptions?.options,
    "departmentId",
    selectedDepartmentId
  );
  const serviceCategoryCustomizeOption = useFilteredOptions(
    categoryOptions?.options,
    "serviceTypeId",
    serviceTypeId
  );
  const serviceSubCategoryCustomizeOption = useFilteredOptions(
    subOptions?.options,
    "serviceCategoryId",
    serviceCategoryId
  );
  useEffect(() => {
    const requestFilterCol = initialValues?.RequestedColumns?.length
      ? initialValues.RequestedColumns.reduce(
          (acc, item: AutocompleteOptions, index: number) => ({
            ...acc,
            [index]: item.value as string,
          }),
          {} as { [key: number]: string }
        )
      : null;
    const params: FilterRequestValue = {
      ticketNumber: initialValues?.ticketNumber || null,
      accountNumber: initialValues?.accountNumber || null,
      accountTypeName: initialValues?.accountTypeName || null,
      serviceTypeId: initialValues?.serviceTypeId?.value || null,
      serviceCategoryId: initialValues?.serviceCategoryId?.value || null,
      serviceSubCategoryId: initialValues?.serviceSubCategoryId?.value || null,
      departmentId: initialValues?.departmentId?.value || null,
      teamId: initialValues?.teamId?.value || null,
      memberId: initialValues?.memberId?.value || null,
      priorityId: initialValues?.priorityId?.value || null,
      currentStatus: initialValues?.currentStatus?.label || null,
      isSLAExceed:
        initialValues?.isSLAExceed?.data !== ""
          ? Boolean(initialValues?.isSLAExceed?.data)
          : null,
      ticketType: initialValues?.ticketType?.value || null,
      startDate: initialValues?.startDate + ":00.000Z",
      endDate: initialValues?.endDate + ":00.000Z",
      dateFilterType: initialValues?.dateFilterType?.value || null,

      SortFields: initialValues?.SortFields?.length
        ? initialValues.SortFields.map((item: AutocompleteOptions) => {
            return {
              SortBy: item.sortby?.toString() || "",
              SortOrder: item.orderby?.toString() || "",
            };
          })
        : null,

      RequestedColumns: requestFilterCol,
    };

    setTimeout(() => {
      // setFilteredCol(requestFilterCol);
      setFilters(trimObjectStrings(params));
    }, 1);
  }, []);

  return (
    <>
      <Form>
        <div className="grid flex">
          <div className="col-12 md:col-6 lg:col-3">
            <FormikTextField
              name="ticketNumber"
              textFieldProps={{
                placeholder: "Search by ticket number",
                type: "number",
                onChange: (e) => {
                  setFieldValue("ticketNumber", e.target.value);
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikTextField
              name="accountNumber"
              textFieldProps={{
                placeholder: "Search by account number",
                // type: "number",
                onChange: (e) => {
                  setFieldValue("accountNumber", e.target.value);
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikTextField
              name="accountTypeName"
              textFieldProps={{
                placeholder: "Search by account type",
                onChange: (e) => {
                  setFieldValue("accountTypeName", e.target.value);
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikAutoComplete
              name="departmentId"
              autoCompleteProps={{
                options: departmentOptions?.options,
                isLoading: departmentOptions?.isLoading,
                placeholder: "Search by department",
                isClearable: true,
                onChange: (row) => {
                  setFieldValue("departmentId", row);
                  setFieldValue("teamId", "");
                  setFieldValue("memberId", "");
                  setFieldValue("serviceTypeId", "");
                  setFieldValue("serviceCategoryId", "");
                  setFieldValue("serviceSubCategoryId", "");
                  setSelectedDepartmentId((row as AutocompleteOptions)?.value);
                  setSelectedTeamId("");
                  setServiceTypeId("");
                  setServiceCategoryId("");
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikAutoComplete
              name="teamId"
              autoCompleteProps={{
                options: selectedDepartmentId
                  ? teamCustomizeOption
                  : teamOptions?.options,
                isLoading: teamOptions?.isLoading,
                placeholder: "Search by team",
                isClearable: true,
                onChange: (row) => {
                  setFieldValue("teamId", row);
                  setFieldValue("memberId", "");
                  setSelectedTeamId((row as AutocompleteOptions)?.value);
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikAutoComplete
              name="memberId"
              autoCompleteProps={{
                options: selectedTeamId
                  ? memberCustomizeOption
                  : memberOptions?.options,
                isLoading: memberOptions?.isLoading,
                placeholder: "Search by member / employee id",
                isClearable: true,
                onChange: (row) => {
                  setFieldValue("memberId", row);
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikAutoComplete
              name="serviceTypeId"
              autoCompleteProps={{
                options: selectedDepartmentId
                  ? serviceTypeCustomizeOption
                  : serviceOptions?.options,
                isLoading: serviceOptions?.isLoading,
                placeholder: "Search by service type",
                isClearable: true,
                onChange: (row) => {
                  setFieldValue("serviceTypeId", row);
                  setFieldValue("serviceCategoryId", "");
                  setFieldValue("serviceSubCategoryId", "");
                  setServiceTypeId((row as AutocompleteOptions)?.value);
                  setServiceCategoryId("");
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikAutoComplete
              name="serviceCategoryId"
              autoCompleteProps={{
                options: serviceTypeId
                  ? serviceCategoryCustomizeOption
                  : categoryOptions?.options,
                isLoading: categoryOptions?.isLoading,
                placeholder: "Search by service category",
                isClearable: true,
                onChange: (row) => {
                  setFieldValue("serviceCategoryId", row);
                  setFieldValue("serviceSubCategoryId", "");
                  setServiceCategoryId((row as AutocompleteOptions)?.value);
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikAutoComplete
              name="serviceSubCategoryId"
              autoCompleteProps={{
                options: serviceCategoryId
                  ? serviceSubCategoryCustomizeOption
                  : subOptions?.options,
                isLoading: subOptions?.isLoading,
                placeholder: "Search by service sub category",
                isClearable: true,
                onChange: (row) => {
                  setFieldValue("serviceSubCategoryId", row);
                },
              }}
            />
          </div>

          <div className="col-12 md:col-6 lg:col-3">
            <FormikAutoComplete
              name="priorityId"
              autoCompleteProps={{
                options: priorityOptions?.options,
                isLoading: priorityOptions?.isLoading,
                placeholder: "Search by ticket priority",
                isClearable: true,
                onChange: (row) => {
                  setFieldValue("priorityId", row);
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikAutoComplete
              name="currentStatus"
              autoCompleteProps={{
                options: currentStatusOptions?.options,
                isLoading: currentStatusOptions?.isLoading,
                placeholder: "Search by current status",
                isClearable: true,
                onChange: (row) => {
                  setFieldValue("currentStatus", row);
                },
              }}
            />
          </div>

          <div className="col-12 md:col-6 lg:col-3">
            <FormikSelectField
              name="isSLAExceed"
              selectFieldProps={{
                options: slaFilterOptions,
                placeholder: "Search by SLA exceed",
                onChange: (e) => {
                  setFieldValue("isSLAExceed", e.value);
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikAutoComplete
              name="ticketType"
              autoCompleteProps={{
                placeholder: "Search by ticket type",
                options: ticketTypeOptions,
                onChange: (newValue) => {
                  setFieldValue("ticketType", newValue);
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikTextField
              name="startDate"
              textFieldProps={{
                // label: "Start date",
                type: "datetime-local",
                onChange: (e) => {
                  setFieldValue("startDate", e.target.value);
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikTextField
              name="endDate"
              textFieldProps={{
                // label: "End date",
                type: "datetime-local",
                onChange: (e) => {
                  setFieldValue("endDate", e.target.value);
                },
              }}
            />
          </div>
          <div className="col-12 md:col-6 lg:col-3">
            <FormikAutoComplete
              name="dateFilterType"
              autoCompleteProps={{
                options: [
                  { label: "Created at", value: "0" },
                  { label: "Updated at", value: "1" },
                ],
                placeholder: "Order by",
                isClearable: true,
              }}
            />
          </div>

          <div className="col-12 md:col-6 lg:col-3">
            <div onClick={(e) => e.stopPropagation()}>
              <FormikAutoComplete
                name="RequestedColumns"
                autoCompleteProps={{
                  placeholder: "Select columns",
                  options: requestedColumn.map((col) => ({
                    value: col.field,
                    label: col.header,
                  })),
                  onChange: (newValue) => {
                    setFieldValue("RequestedColumns", newValue || []);
                  },
                  isMulti: true,
                }}
              />
            </div>
          </div>

          <div className="col-12 md:col-6 lg:col-3">
            <div onClick={(e) => e.stopPropagation()}>
              <FormikAutoComplete
                name="SortFields"
                autoCompleteProps={{
                  placeholder: "Select columns",

                  options: newTicketOptionsOrderBy.options.map((val, index) => {
                    return {
                      value: `${index}-${val.value}`,
                      val: val.value,
                      label: `${val.label} -> ${val.order}`,
                      sortby: `${val.label}`,
                      orderby: `${val.order}`,
                    };
                  }),
                  onChange: (newValue) => {
                    let updateValue = (newValue || []) as AutocompleteOptions[];
                    setFieldValue("SortFields", newValue || []);
                    setSortFieldValue(updateValue);
                  },
                  isMulti: true,
                }}
              />
            </div>
          </div>

          <div className="col-12 md:col-6 lg:col-6 ">
            <div className="flex gap-2 align-items-center h-auto">
              <FormikSubmitButton outlined>Filter</FormikSubmitButton>
              <Button
                severity="secondary"
                outlined
                onClick={() => {
                  resetForm({
                    values: FilterFormInitialValue,
                  });
                  setSelectedDepartmentId("");
                  setSelectedTeamId("");
                  setServiceTypeId("");
                  setServiceCategoryId("");
                  resetFilters();
                  DeleteSavedFilter(pathname);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </Form>
      <Row className="justify-content-end mt-1 mr-0">
        <DownloadTicketBtn />
      </Row>
    </>
  );
};
