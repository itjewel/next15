import {
  AutocompleteOptions,
  FormikSelectField,
  FormikSubmitButton,
  FormikTextField,
  useDataTableContext,
} from "features/ui";
import { Form, Formik } from "formik";
import { trimObjectStrings } from "herlper";
import { Button } from "primereact/button";

type FormValue = {
  name?: string | null;
  useState?: AutocompleteOptions;
  isActive?: ActiveFilterOption;
};

type RequestValue = {
  name?: string | null;
  useState?: string | null;
  isActive?: boolean | null;
};

type ActiveFilterOption = { label: string; data: boolean };
const activeFilterOptions: ActiveFilterOption[] = [
  { label: "Enabled", data: true },
  { label: "Disabled", data: false },
];

const initialValues = {
  name: "",
  useState: {
    label: "",
    value: "",
  },
  isActive: { label: "Enabled", data: true },
};

export const PhaseSetupTopFilter = () => {
  const { setFilters, resetFilters } = useDataTableContext();

  const phaseSetupFormSubmit = (values: FormValue) => {
    const params: RequestValue = {
      name: values?.name || null,
      useState: values?.useState?.label || null,
      isActive: values?.isActive?.data,
    };
    setFilters(trimObjectStrings(params));
  };

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={async (values) => phaseSetupFormSubmit(values)}
      >
        {({ setFieldValue, resetForm }) => {
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
                          values: { ...initialValues },
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
