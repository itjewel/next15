import { Editor } from "@tinymce/tinymce-react";

export const TextEditor = ({
  value,
  onEditorChange,
  label,
  height,
  isRequired = false,
}) => {
  return (
    <div>
      <div
        sx={{
          width: "100%",
        }}
      >
        <Editor
          value={value}
          onInit={(evt, editor) => {
            // setText(editor.getContent({ format: "text" }));
          }}
          onEditorChange={onEditorChange}
          // apiKey="ojmam90zwypu2e58ylabznn02q7nzjl8fy5njr6kfndbfoho" // @TODO: must be add before production
          apiKey={import.meta.env.VITE_APP_TINYMCE_API_KEY}
          init={{
            height: height ? height : 300,
            menubar: true,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "table",
              "wordcount",
              "preview",
              "fullscreen",
              "emoticons",
              "code",
            ],
            selector: "textarea",
            icons: "material",
            toolbar:
              "undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help|tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol wordcount preview fullscreen emoticons| link image | code",

            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
