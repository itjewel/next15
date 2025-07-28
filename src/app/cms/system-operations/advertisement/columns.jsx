import { Actions } from "@/features/ui/actions.component";
import { parseDateTime } from "@/helper";
import { FaEdit, FaEye, FaLock, FaUnlock } from "react-icons/fa";

export const Columns = (navigate, handleDelete) => {
  return [
    {
      name: "Title",
      selector: (row) => row?.title,
      sortable: true,
      sortField: "title",
    },
    {
      name: "Image/Video",
      selector: (row) => {
        return row.image ? (
          <>
            {row?.isVideo ? (
              <video width="180" height="100" controls>
                <source
                  src={import.meta.env.VITE_APP_IMAGE_URL + row?.image}
                  type="video/mp4"
                />
              </video>
            ) : (
              <img
                src={import.meta.env.VITE_APP_IMAGE_URL + row.image}
                width={180}
                alt="Image"
                height={100}
              />
            )}
          </>
        ) : (
          ""
        );
      },
    },
    {
      name: "Created at",
      selector: (row) => parseDateTime(row?.createdAt),
      sortable: true,
      sortField: "createdAt",
    },
    {
      name: "Updated at",
      selector: (row) => parseDateTime(row?.updatedAt),
      sortable: true,
      sortField: "updatedAt",
    },
    {
      name: "Actions",
      allowOverflow: true,
      style: { overflow: "visible !important" },
      selector: (row) => {
        const list = [
          {
            name: "View",
            onClickHandle: () => {
              navigate(`/advertisement/details/${row?.id}`);
            },
            icon: <FaEye />,
            btnType: "details",
          },
          {
            name: "Update",
            onClickHandle: () => {
              navigate(`/advertisement/edit/${row?.id}`);
            },
            icon: <FaEdit />,
            btnType: "update",
          },
          {
            name: row?.isActive == true ? "Disable" : "Enable",
            onClickHandle: () => {
              handleDelete(row?.id, !row?.isActive, row);
            },
            icon: row?.isActive == true ? <FaLock /> : <FaUnlock />,
          },
        ];
        const disableList = [
          {
            name: "Update",
            icon: <FaEdit />,
            onClickHandle: () => {
              navigate(`/advertisement/edit/${row?.id}`);
            },
          },
          {
            name: "Enable",
            icon: <FaUnlock />,
            onClickHandle: () => {
              handleDelete(row?.id, !row?.isActive, row);
            },
          },
        ];
        if (!row.isActive) {
          return <Actions btnList={disableList} isActive={row?.isActive} />;
        } else {
          return <Actions btnList={list} isActive={row.isActive} />;
        }
      },
    },
  ];
};
