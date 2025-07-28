import { useFormikContext } from "formik";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";
import { useLazyGet } from "../api";

export function PdfExportButton({ url, reportName = "Report" }) {
  const { values } = useFormikContext();
  const { data, error, isLoading, trigger } = useLazyGet(url);

  const startDate = values?.startDate || values?.StartDate || "";
  const endDate = values?.endDate || values?.EndDate || "";

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
      // Split the string into an array of lines
      const lines = data.split("\n");
      // Create a Blob with the CSV content
      const csvData = lines.join("\n");
      const blob = new Blob([csvData], { type: "text/csv" });
      // Create a download link and trigger the download
      const url = URL.createObjectURL(blob);
      const anchorTag = document.createElement("a");
      anchorTag.href = url;
      anchorTag.download = `${reportName}_${new Date(
        `${startDate}`
      ).toDateString()}_to_${new Date(`${endDate}`).toDateString()}.csv`;
      anchorTag.click();
      URL.revokeObjectURL(url);
    }
  };

  const downloadPdf = () => {};

  return (
    <Button variant="outline-primary" onClick={handleFileDownload}>
      <FiDownload className="me-1" /> Export CSV
    </Button>
  );
}
