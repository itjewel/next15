import { Api, useDelete, usePut } from "features/api";
import { CommonLayout } from "features/layouts";
import { getFilterDateTime } from "features/reports/helper";
import {
  AutocompleteOptions,
  ConfirmationDialog,
  DataTable,
} from "features/ui";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useToggle } from "react-use";
import { Columns } from "./columns";
import { Filter } from "./filter.component";
import { OpenResponse } from "./open-ticket/open-types";

import {
  FilterFormValue,
  TicketActiveInactive,
  TicketActiveInactiveResponse,
} from "./ticket-types";
import { useFormikContext } from "formik";

export const Ticket = () => {
  const navigate = useRouter();

  const [isPopupVisible, setPopupVisible] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>("");
  const [payloadData, setPayloadData] = useState<TicketActiveInactive>();
  const [refetch, toggleRefetch] = useToggle(false);
  const handleCancel = () => {
    setPopupVisible(false);
  };

  const handleActiveInactive = (payload: TicketActiveInactive) => {
    setPopupVisible(true);
    setPayloadData(payload);
  };

  // active deactive api call
  const {
    trigger,
    data: poeIsActiveResponse,
    error,
    isMutating,
  } = useDelete<unknown, TicketActiveInactiveResponse>(
    `${Api.Ticket}/${payloadData?.id}?isActive=${!payloadData?.isActive}`
  );
  // open ticket
  const {
    trigger: ticketOpen,
    data,
    error: openError,
  } = usePut<unknown, OpenResponse>(
    ticketId ? `${Api.TicketOpen}/${ticketId}` : ""
  );

  const handleConfirm = async () => {
    setPopupVisible(false);
    await trigger(undefined);
  };

  const handleCreate = () => {
    navigate.push("/ticket/create");
  };

  const handleEdit = (id: string) => {
    navigate.push(`/ticket/edit/${id}`);
  };
  const handleHistory = (id: string) => {
    navigate.push(`/ticket/history/${id}`);
  };
  const handleLifeCycle = (id: string) => {
    navigate.push(`/ticket/lifecycle/${id}`);
  };

  const handleOpen = (id: string) => {
    setTicketId(id);
  };

  const handleView = (id: string) => {
    navigate.push(`/ticket/details/${id}`);
  };

  const ticketOpenFn = async () => {
    await ticketOpen(undefined);
  };

  useEffect(() => {
    if (ticketId) {
      ticketOpenFn();
    }
  }, [ticketId]);

  useEffect(() => {
    if (data?.status) {
      toast.success(data?.message);
      navigate.push(`/ticket/open-ticket/${ticketId}`);
      setTicketId("");
    } else if (!openError?.status) {
      toast.error(openError?.message);
    }
  }, [data, openError]);

  useEffect(() => {
    if (!isMutating && poeIsActiveResponse?.status) {
      toast.success(poeIsActiveResponse?.message);
      toggleRefetch(true);
    }
  }, [poeIsActiveResponse]);

  useEffect(() => {
    if (!isMutating && !poeIsActiveResponse?.status) {
      toast.error(error?.message);
    }
  }, [error]);

  function ConfirmModalTitle() {
    return payloadData?.isActive ? "Disable ticket" : "Enable ticket";
  }

  function ConfirmModalBody() {
    return (
      <p>
        Are you sure you want to {payloadData?.isActive ? "disable" : "enable"}{" "}
        <span className="font-semibold">{payloadData?.name}</span>
      </p>
    );
  }

  // const { values } = useFormikContext<FilterFormValue>();
  // function toCamelCase(str: string): string {
  //   return str.charAt(0).toLowerCase() + str.slice(1);
  // }

  // const { RequestedColumns } = values;
  // const newArray =
  //   RequestedColumns?.map((val) => ({
  //     field: toCamelCase(val.value),
  //     header: val.label,
  //   })) ?? [];

  const columns = Columns(
    handleActiveInactive,
    handleEdit,
    handleHistory,
    handleLifeCycle,
    handleOpen,
    handleView
  );
  console.log({ columns }, "Ticket pages");

  return (
    <>
      <CommonLayout
        title="Ticket list"
        BtnComp={
          <Button outlined onClick={handleCreate}>
            Create
          </Button>
        }
      />
      <DataTable
        // tableTitle={<TicketTableTitle />}
        // TicketGetAll
        showGridlines
        url={Api.TicketGetAll}
        columns={columns}
        topFilter={Filter}
        hideSearch={true}
        params={{
          startDate: getFilterDateTime().startDate + ":00.000Z",
          endDate: getFilterDateTime().endDate + ":00.000Z",
          dateFilterType: 0,
        }}
        refetch={refetch}
        onDataLoaded={() => toggleRefetch(false)}
      />
      <ConfirmationDialog
        title={<ConfirmModalTitle />}
        visible={isPopupVisible}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        body={<ConfirmModalBody />}
      />
    </>
  );
};
