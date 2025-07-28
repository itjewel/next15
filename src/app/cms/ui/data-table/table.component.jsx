import { CustomLoader } from "@/features/ui/custom-loader.component";
import { Card } from "react-bootstrap";
import { default as RDTCTable } from "react-data-table-component";

const styles = {
  headCells: {
    style: {
      // paddingLeft: "8px", // override the cell padding for head cells
      // paddingRight: "8px",
      overflow: "hidden",
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  cells: {
    style: {
      // paddingLeft: "8px", // override the cell padding for data cells
      // paddingRight: "8px",
      overflow: "hidden",
      wordBreak: "wrap",
      fontSize: "1rem",
    },
  },
  pagination: {
    style: {
      fontSize: "1rem",
    },
  },
};

export const Table = ({
  columns,
  tableData,
  showTableSummary,
  tableSummary,
  handlePageChange,
  handlePerRowsChange,
  totalRows,
  progressPending,
  paginationPerPage,
  currentPage,
  handleSort,
  pagination,
  paginationRowsPerPageOptions,
  expandableRows,
  expandableRowsComponent,
  customStyles,
  isShowTaps,
  ...rest
}) => {
  const data =
    showTableSummary && tableSummary ? [...tableData, tableSummary] : tableData;

  if (progressPending) {
    return (
      <div
        style={{
          border: "1px solid #ddd",
          width: "100%",
          height: "500px",
          display: "grid",
          placeItems: "center",
          borderRadius: 5,
        }}
      >
        <CustomLoader variant="outline-primary" />
      </div>
    );
  }

  return (
    <Card className="border-0">
      <Card.Body className="p-0">
        <div
          className={`border rounded ${
            isShowTaps ? "fd-border-top-left-0" : " "
          }`}
        >
          <RDTCTable
            className="rc-data-table"
            customStyles={{
              ...styles,
              ...customStyles,
            }}
            columns={columns}
            data={data}
            pagination={pagination}
            sortServer
            paginationServer
            paginationTotalRows={totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            onChangePage={handlePageChange}
            onSort={handleSort}
            defaultSortAsc={false}
            defaultSortFieldId="updatedAt"
            progressPending={progressPending}
            progressComponent={
              <CustomLoader variant="outline-primary" styles={{}} />
            }
            paginationPerPage={paginationPerPage}
            paginationDefaultPage={currentPage}
            paginationRowsPerPageOptions={paginationRowsPerPageOptions}
            expandableRows={expandableRows}
            expandableRowsComponent={expandableRowsComponent}
            {...rest}
          />
        </div>
      </Card.Body>
    </Card>
  );
};
