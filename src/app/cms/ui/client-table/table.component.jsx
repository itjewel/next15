import { paginationPerPageOptions } from "./constant";
import {
  MdNavigateBefore,
  MdNavigateNext,
  MdOutlineSkipNext,
  MdOutlineSkipPrevious,
} from "react-icons/md";

export const Table = ({
  columns,
  tableData,
  itemsPerPage,
  pageNumber,
  handlePageChange,
  handlePerRowsChange,
  errorText,
}) => {
  const totalCount = tableData?.length || 0;
  const lastPageNumber = Math.ceil(totalCount / Number(itemsPerPage));
  const start = (pageNumber - 1) * Number(itemsPerPage);
  const end = start + Number(itemsPerPage);

  return (
    <>
      <div
        style={{
          maxHeight: "400px",
          overflowY: "scroll",
          marginTop: "10px",
          border: "1px solid #8080803b",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              {columns?.map((header, idx) => {
                return (
                  <th scope="col" key={"head-" + idx}>
                    {header.name}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody style={{ borderTop: "3px solid #dee2e6" }}>
            {totalCount ? (
              tableData?.slice(start, end)?.map((item, index) => {
                return (
                  <tr key={"attribute-value-" + index}>
                    <th scope="row" className="align-content-center">
                      {index + 1 + start}
                    </th>
                    {columns?.map((data, idx) => {
                      return (
                        <td
                          key={"data-" + idx}
                          className="align-content-center"
                        >
                          {data?.selector(item)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={columns?.length + 1}
                  className="text-center pt-3 pb-3"
                >
                  {errorText ? errorText : "No data found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalCount ? (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <select
            style={{ width: "50px", background: "none", borderRadius: "5px" }}
            onChange={(e) => {
              handlePerRowsChange(e.target.value);
            }}
            defaultValue={itemsPerPage}
          >
            {paginationPerPageOptions?.map((item, idx) => (
              <option key={"opt-" + idx} value={item}>
                {item}
              </option>
            ))}
          </select>

          <div
            style={{ marginLeft: "5px", display: "flex", alignItems: "center" }}
          >
            <span>{start + 1}</span> -{" "}
            <span>{end > totalCount ? totalCount : end}</span>
            <span style={{ margin: "3px" }}>of</span>
            <span>{totalCount}</span>
          </div>

          <nav style={{ marginLeft: "5px" }}>
            <ul className="pagination" style={{ marginBottom: "0" }}>
              <li className="page-item">
                <button
                  style={{
                    border: "1px solid #80808029",
                    padding: "4px 7px",
                    borderRadius: "5px 0px 0px 5px",
                    background: "white",
                  }}
                  disabled={pageNumber == 1}
                  onClick={() => handlePageChange(1)}
                >
                  <MdOutlineSkipPrevious size={20} />
                </button>
              </li>
              <li className="page-item">
                <button
                  style={{
                    border: "1px solid #80808029",
                    padding: "4px 7px",
                    background: "white",
                  }}
                  disabled={pageNumber == 1}
                  onClick={() => handlePageChange(pageNumber - 1)}
                >
                  <MdNavigateBefore size={20} />
                </button>
              </li>

              <li className="page-item">
                <button
                  style={{
                    border: "1px solid #80808029",
                    padding: "4px 7px",
                    background: "white",
                  }}
                  disabled={pageNumber == lastPageNumber}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  <MdNavigateNext size={20} />
                </button>
              </li>
              <li className="page-item">
                <button
                  style={{
                    border: "1px solid #80808029",
                    padding: "4px 7px",
                    borderRadius: "0px 5px 5px 0px",
                    background: "white",
                  }}
                  disabled={pageNumber == lastPageNumber}
                  onClick={() => handlePageChange(lastPageNumber)}
                >
                  <MdOutlineSkipNext size={20} />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
