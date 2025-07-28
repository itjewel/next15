import React from "react";
import { useField, useFormikContext } from "formik";
import TiptapEditorWithDollarComponent from "./TiptapEditorWithDollar.component";
import { Api, useGetOptions } from "features/api";

type Props = {
  name: string;
  label?: string;
};

const FormikTiptapEditor: React.FC<Props> = ({ name, label }) => {
  const placeholderTypeOptions = useGetOptions(Api.PlaceholderGetEnv);
  const mentionList = [
    ...(placeholderTypeOptions?.options || []).map((item) => ({
      id: item.label ?? "",
      label: (item.label ?? " ") + " ",
    })),
  ];
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div>
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <TiptapEditorWithDollarComponent
        key={JSON.stringify(mentionList)}
        value={field.value}
        onChange={(val) => setFieldValue(name, val)}
        mentionList={mentionList}
      />
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FormikTiptapEditor;
