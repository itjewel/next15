import { DropdownButton, Form } from "react-bootstrap";

const ColumnToggler = ({
  columns = [],
  isOmit,
  setIsOmit,
  showActiveInactive = false,
}) => {
  const handleChange = (id) => {
    const clonedData = [...isOmit];
    clonedData.map((d) => {
      if (d?.id === id) {
        d.omit = !d.omit;
      }
    });

    setIsOmit(clonedData);
  };

  return (
    <DropdownButton
      align={showActiveInactive ? "end" : "start"}
      title="Columns"
      variant="outline-secondary"
      className="columnToggler ms-1"
    >
      <div className="mx-2">
        {columns.map((column, i) => (
          <div key={column?.id || i}>
            <Form.Check
              className="py-1 columnTogglerCheckBox"
              type="checkbox"
              checked={!isOmit[i]?.omit}
              id={column?.id}
              label={column?.name}
              onChange={() => {
                handleChange(column?.id);
              }}
            />
          </div>
        ))}
      </div>
    </DropdownButton>
  );
};

export default ColumnToggler;
