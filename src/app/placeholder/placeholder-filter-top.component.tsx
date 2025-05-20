import { Api, useGetOptions } from "features/api";
import {
  AutocompleteOptions,
  FormikAutoComplete,
  FormikSelectField,
  FormikSubmitButton,
  FormikTextField,
  useDataTableContext,
} from "features/ui";
import { Form, Formik, useFormikContext } from "formik";
import { trimObjectStrings } from "herlper";
import { Button } from "primereact/button";
import { ActionMeta } from "react-select";

type FormValue = {
  name?: string | null;
  description?: string | null;
  ActionType?: AutocompleteOptions;
  action?: string | null;
  sampleText?: string | null;
  isActive?: ActiveFilterOption;
};

type RequestValue = {
  name?: string | null;
  description?: string | null;
  ActionType?: AutocompleteOptions;
  action?: string | null;
  sampleText?: string | null;
  isActive?: boolean | null;
};

type ActiveFilterOption = { label: string; data: boolean };
const activeFilterOptions: ActiveFilterOption[] = [
  { label: "Enabled", data: true },
  { label: "Disabled", data: false },
];

export const PlaceholderTopFilter = () => {
  const { setFilters, resetFilters } = useDataTableContext();
  const actionTypeOptions = useGetOptions(Api.PlaceholderGetOption);

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: "",
          descriptoin: "",
          ActionType: {
            label: "",
            value: "",
          },
          action: "",
          sampleText: "",
          isActive: { label: "Enabled", data: true },
        }}
        onSubmit={async (values: FormValue) => {
          const params: RequestValue = {
            name: values?.name || null,
            description: values?.description || null,
            ActionType: values?.ActionType
              ?.value as unknown as AutocompleteOptions,
            action: values?.action || null,
            sampleText: values?.sampleText || null,
            isActive: values?.isActive?.data,
          };
          setFilters(trimObjectStrings(params));
        }}
      >
        {({ values, setFieldValue, resetForm }) => {
          const selectedOption = actionTypeOptions.options.find(
            (option) => option.value === values?.ActionType?.value
          );
          return (
            <Form>
              <div className="grid flex">
                <div className="col-12 sm:col-5 md:col-4 lg:col-3">
                  <FormikTextField
                    name="name"
                    textFieldProps={{
                      placeholder: "Search by name",
                      onChange: (value) => {
                        setFieldValue("name", value.target.value);
                      },
                    }}
                  />
                </div>
                <div className="col-12 sm:col-5 md:col-4 lg:col-3">
                  <FormikAutoComplete
                    name="ActionType"
                    autoCompleteProps={{
                      placeholder: "Search by account type",
                      options: actionTypeOptions.options,
                      isClearable: true,
                      value: selectedOption ?? null,
                      onChange: (
                        newValue: unknown,
                        _actionMeta: ActionMeta<unknown>
                      ) => {
                        const selected = newValue as AutocompleteOptions | null;
                        setFieldValue("ActionType", selected);
                      },
                    }}
                  />
                </div>

                <div className="col-12 md:col-6 lg:col-6 ">
                  <div className="flex gap-2 align-items-center h-auto">
                    <FormikSelectField
                      name="isActive"
                      selectFieldProps={{
                        options: activeFilterOptions,
                        placeholder: "Enabled",
                        onChange: (e) => {
                          setFieldValue("isActive", e.value);
                        },
                      }}
                    />
                    <FormikSubmitButton outlined>Filter</FormikSubmitButton>
                    <Button
                      severity="secondary"
                      outlined
                      onClick={() => {
                        resetForm({
                          values: {
                            name: "",
                            ActionType: {
                              label: "",
                              value: "",
                            },
                          },
                        });
                        resetFilters();
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
