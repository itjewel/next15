import React from "react";
import { Spinner } from "react-bootstrap";

export function CustomLoader({ variant = "warning", styles }) {
  return <Spinner variant={"primary"} style={styles} />;
}
