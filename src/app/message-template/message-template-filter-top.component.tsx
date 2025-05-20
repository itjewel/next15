import {
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
  isActive?: ActiveFilterOption;
};

type RequestValue = {
  name?: string | null;
  isActive?: boolean | null;
};

type ActiveFilterOption = { label: string; data: boolean };
const activeFilterOptions: ActiveFilterOption[] = [
  { label: "Enabled", data: true },
  { label: "Disabled", data: false },
];

export const MessageTemplateTopFilter = () => {
  const { setFilters, resetFilters } = useDataTableContext();

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: "",
          isActive: { label: "Enabled", data: true },
        }}
        onSubmit={async (values: FormValue) => {
          const params: RequestValue = {
            name: values?.name || null,
            isActive: values?.isActive?.data,
          };
          setFilters(trimObjectStrings(params));
        }}
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
                          values: {
                            name: "",
                            isActive: { label: "Enabled", data: true },
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
