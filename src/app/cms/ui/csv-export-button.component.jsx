import { useFormikContext } from "formik";
import { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";
import { useLazyGet } from "../api";

export function CsvExportButton({
  url,
  reportName = "Report",
  fromDateKeyname,
  toDateKeyname,
}) {
  const { values } = useFormikContext();
  const { data, error, isLoading, trigger } = useLazyGet(url);

  const startDate = fromDateKeyname
    ? values[fromDateKeyname]
    : values?.startDate || values?.StartDate || "";
  const endDate = toDateKeyname
    ? values[toDateKeyname]
    : values?.endDate || values?.EndDate || "";

  const handleFileDownload = () => {
    trigger();
  };

  useEffect(() => {
    if (data === "" && !isLoading) {
      toast.error("There is no data available to export your CSV file.");
    }
    if (data !== "" && !isLoading) {
      downloadCSV(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (error && !isLoading) {
      toast.error(error?.title || "Something went wrong");
    }
  }, [error, isLoading]);

  const downloadCSV = (data) => {
    if (typeof data === "string") {
      // @TODO: NEED TO REFACTOR this later;
      let fileName = reportName;
      if (startDate) {
        fileName += `_${new Date(startDate).toDateString()}`;
      }
      if (endDate) {
        fileName += `_${new Date(endDate).toDateString()}`;
      }
      fileName += ".csv";

      // Split the string into an array of lines
      const lines = data.split("\n");
      // Create a Blob with the CSV content
      const csvData = lines.join("\n");
      const blob = new Blob([csvData], { type: "text/csv" });
      // Create a download link and trigger the download
      const url = URL.createObjectURL(blob);
      const anchorTag = document.createElement("a");
      anchorTag.href = url;
      anchorTag.download = fileName;
      anchorTag.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={handleFileDownload}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner as="span" size="sm" animation="border" className="me-1" />
        ) : (
          <FiDownload className="me-1" />
        )}
        Export CSV
      </Button>
      {!isLoading && data ? (
        <div className="ms-3 mt-1 align-items-center text-success">
          {" "}
          &#10003; Successfully downloaded at{" "}
          <span>{`${new Date().toLocaleTimeString()}`}</span>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
