import { FormikProvider, useFormik } from "formik";
import { GetSavedFilter, SaveFilter } from "herlper/filter";
import { useRouter } from "next/router";
import { FilterFormValue, FilterRequestValue } from "./ticket-types";
import { FilterFormInitialValue } from "./constants";
import { AutocompleteOptions } from "features/ui";
// import { trimObjectStrings } from "herlper";
import { Ticket } from "./ticket.component";

export const TicketProvider = () => {
  //   const { setFilters } = useDataTableContext();
  //console.log("jewel");
  const { pathname } = useRouter();
  const initialValues = GetSavedFilter<FilterFormValue>(
    pathname,
    FilterFormInitialValue
  );
  /*
  const formik = useFormik({
      initialValues: editedId
        ? GetExpertiseValues(expertiseUser)
        : ExpertiseInitialValues,
      validationSchema: ExpertiseCreateSchema,
      enableReinitialize: true,
      onSubmit: async (values, { resetForm }) => {
        const payload = generatePayload(values);
        if (editedId) {
          await expertiseUpdateTrigger(payload);
        } else {
          await trigger(payload);
        }
      },
    });

*/
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: async (values: FilterFormValue, { resetForm }) => {
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

      SaveFilter<FilterFormValue>(pathname, values);
    },
  });

  return (
    <FormikProvider value={formik}>
      <Ticket />
    </FormikProvider>
  );
};
