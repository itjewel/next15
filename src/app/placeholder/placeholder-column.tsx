import { ActionMenu, DisableButton } from "features/ui";
import { dateTimeFormat } from "herlper";
import { ColumnProps } from "primereact/column";
import { AiFillLock, AiFillUnlock, AiOutlineEdit } from "react-icons/ai";
import {
  PlaceholderActiveInactive,
  SinglePlaceholder,
} from "./placeholder.type";

export const PlaceholderListColumn = (
  handleActiveInactive: (data: PlaceholderActiveInactive) => void,
  handleEdit: (data: SinglePlaceholder) => void
): ColumnProps[] => {
  return [
    { field: "name", header: "Name" },
    { field: "description", header: "Descripton" },
    { field: "actionTypeName", header: "Action type" },
    { field: "action", header: "Action" },
    { field: "sampleText", header: "Sample Text" },
    {
      field: "createdAt",
      header: "Created at",
      body(data) {
        return dateTimeFormat(data.createdAt);
      },
    },
    {
      field: "updatedAt",
      header: "Updated at",
      body(data) {
        return dateTimeFormat(data.updatedAt);
      },
    },
    {
      field: "actions",
      header: "Actions",
      body(data, options) {
        let items = [
          {
            label: "Edit",
            icon: <AiOutlineEdit className="mr-2" />,
            command: () => handleEdit(data),
          },
          {
            label: data?.isActive ? "Disable" : "Enable",
            icon: data?.isActive ? (
              <AiFillLock className="mr-2" />
            ) : (
              <AiFillUnlock className="mr-2" />
            ),
            command: () =>
              handleActiveInactive({
                id: data?.id,
                name: data?.name,
                isActive: data?.isActive,
              }),
          },
        ];
        if (!data?.isInUse) {
          items = [
            {
              label: "Edit",
              icon: <AiOutlineEdit className="mr-2" />,
              command: () => handleEdit(data),
            },
            {
              label: data?.isActive ? "Disable" : "Enable",
              icon: data?.isActive ? (
                <AiFillLock className="mr-2" />
              ) : (
                <AiFillUnlock className="mr-2" />
              ),
              command: () =>
                handleActiveInactive({
                  id: data?.id,
                  name: data?.name,
                  isActive: data?.isActive,
                }),
            },
          ];
        }
        if (data?.isActive) {
          return <ActionMenu items={items} />;
        } else {
          return (
            <DisableButton
              isActive={data?.isActive}
              onClick={() =>
                handleActiveInactive({
                  id: data?.id,
                  name: data?.name,
                  isActive: data?.isActive,
                })
              }
            />
          );
        }
      },
    },
  ];
};
