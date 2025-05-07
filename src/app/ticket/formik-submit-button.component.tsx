import { useFormikContext } from "formik";
import { Button, ButtonProps } from "primereact/button";
import { CgSpinner } from "react-icons/cg";
import { useDataTableContext } from "../datatable";
import { trimObjectStrings } from "herlper";
import {
  FilterFormValue,
  FilterRequestValue,
} from "features/ticket/ticket-types";
import { AutocompleteOptions } from "./formik-autocomplete.component";

export const FormikSubmitButton = ({
  type = "submit",
  disabled,
  loadingIcon = <CgSpinner className="icon-spin mr-1" />,
  ...rest
}: ButtonProps) => {
  const { isSubmitting, submitForm, values } =
    useFormikContext<FilterFormValue>();
  const { setFilters } = useDataTableContext();
  const handleClick = () => {
    const params: FilterRequestValue = {
      ticketNumber: values?.ticketNumber || null,
      accountNumber: values?.accountNumber || null,
      accountTypeName: values?.accountTypeName || null,
      serviceTypeId: values?.serviceTypeId?.value || null,
      serviceCategoryId: values?.serviceCategoryId?.value || null,
      serviceSubCategoryId: values?.serviceSubCategoryId?.value || null,
      departmentId: values?.departmentId?.value || null,
      teamId: values?.teamId?.value || null,
      memberId: values?.memberId?.value || null,
      priorityId: values?.priorityId?.value || null,
      currentStatus: values?.currentStatus?.label || null,
      isSLAExceed:
        values?.isSLAExceed?.data !== ""
          ? Boolean(values?.isSLAExceed?.data)
          : null,
      ticketType: values?.ticketType?.value || null,
      dateFilterType: values?.dateFilterType?.value || null,
      startDate: values?.startDate + ":00.000Z",
      endDate: values?.endDate + ":00.000Z",

      SortFields: values?.SortFields?.length
        ? values.SortFields.map((item: AutocompleteOptions) => ({
            SortBy: item.sortby?.toString() || "",
            SortOrder: item.orderby?.toString() || "",
          }))
        : null,

      RequestedColumns: values?.RequestedColumns?.length
        ? values.RequestedColumns.reduce(
            (acc, item: AutocompleteOptions, index: number) => ({
              ...acc,
              [index]: item.value as string,
            }),
            {} as { [key: number]: string }
          )
        : null,
    };
    console.log({ params });
    setFilters(trimObjectStrings(params));
    submitForm();
  };
  //console.log({ handleSubmit, values });
  return (
    <Button
      type={type}
      onClick={() => handleClick()}
      disabled={disabled || isSubmitting}
      loading={isSubmitting}
      loadingIcon={loadingIcon}
      {...rest}
    />
  );
};
