import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";

export const CommonUpdateButton = ({
  onClickHandle,
  delayHide = 10,
  delayShow = 20,
  placement = "top",
  size = "sm",
  variant = "outline-primary",
  tooltipText = "Update",
}) => {
  return (
    <OverlayTrigger
      delay={{ hide: delayHide, show: delayShow }}
      overlay={(props) => <Tooltip {...props}>{tooltipText}</Tooltip>}
      placement={placement}
    >
      <Button size={size} variant={variant} onClick={onClickHandle}>
        <AiFillEdit />
      </Button>
    </OverlayTrigger>
  );
};
