import { useState } from "react";
import { Card } from "react-bootstrap";
import Table from "react-data-table-component";
import { CustomLoader } from "../custom-loader.component";
import { Export } from "./export-csv.component";

const customStyles = {
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      overflow: "hidden",
      fontSize: "1rem",
      fontWeight: 600,
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
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

export const DataTable = ({
  columns,
  tableData,
  isCSV = false,
  csvName,
  handlePageChange,
  handlePerRowsChange,
  totalRows,
  progressPending,
  paginationPerPage,
  currentPage,
  handleSort,
  paginationRowsPerPageOptions,
  isDisablePagination = false,
  selectableRows = false,
  handleSelectedRows,
  isShowTaps,
}) => {
  const [data] = useState(tableData);
  const [filterText] = useState("");

  const filteredItems = data?.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

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
    <>
      {!data ? (
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          No Data Found
        </h2>
      ) : (
        <div>
          <Card className="border-0">
            {isCSV ? (
              <Card.Footer>
                <Export data={filteredItems} csvName={csvName} />
              </Card.Footer>
            ) : (
              ""
            )}
            <Card.Body className="p-0">
              <div
                className={`border rounded ${
                  isShowTaps ? "fd-border-top-left-0" : " "
                }`}
              >
                <Table
                  customStyles={customStyles}
                  selectableRows={selectableRows}
                  onSelectedRowsChange={handleSelectedRows}
                  columns={columns}
                  data={tableData}
                  pagination={!isDisablePagination}
                  // sortServer
                  paginationServer
                  paginationTotalRows={totalRows}
                  onChangeRowsPerPage={handlePerRowsChange}
                  onChangePage={handlePageChange}
                  // onSort={handleSort}
                  // defaultSortAsc={false}
                  // defaultSortFieldId="updatedAt"
                  progressPending={progressPending}
                  progressComponent={<CustomLoader variant="outline-primary" />}
                  paginationPerPage={paginationPerPage}
                  paginationDefaultPage={currentPage}
                  paginationRowsPerPageOptions={paginationRowsPerPageOptions}
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};
