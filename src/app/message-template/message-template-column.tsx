import { ActionMenu, DisableButton } from "features/ui";
import { dateTimeFormat } from "herlper";
import { ColumnProps } from "primereact/column";
import { AiFillLock, AiFillUnlock, AiOutlineEdit } from "react-icons/ai";
import {
  MessageTemplateActiveInactive,
  SingleMessageTemplate,
} from "./message-template.type";

export const MessageTemplateListColumn = (
  handleActiveInactive: (data: MessageTemplateActiveInactive) => void,
  handleEdit: (data: SingleMessageTemplate) => void
): ColumnProps[] => {
  return [
    { field: "name", header: "Name" },
    { field: "body", header: "Body" },
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
