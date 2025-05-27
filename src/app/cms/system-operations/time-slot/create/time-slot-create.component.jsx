import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { useParams } from "react-router-dom";
import { TimeSlotForm } from "./time-slot-create-form.component";

const breadcrumbItems = [
  { name: "Time slot", url: "/system-operation-time-slot" },
  { name: "Time slot create" },
];

const breadcrumbsItemEdit = [
  { name: "Time slot", url: "/system-operation-time-slot" },
  { name: "Time slot update" },
];

export const TimeSlotCreate = () => {
  const { id } = useParams();
  return (
    <CommonLayout
      title={
        id
          ? "Update system operation time slot"
          : "Create system operation time slot"
      }
      breadcrumbItems={id ? breadcrumbsItemEdit : breadcrumbItems}
      BtnComp={<LinkButton to="/system-operation-time-slot" btnName="Back" />}
    >
      <TimeSlotForm />
    </CommonLayout>
  );
};
