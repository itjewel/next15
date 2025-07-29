"use client";
import { useState } from "react";

export default function Move() {
  const [reverse, setReverse] = useState(false);
  const [inputVal, setInputVal] = useState({
    firstName: "",
    lastName: "",
  });
  const handleChange = (e) => {
    setInputVal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  let checkbox = (
    <label>
      <input
        type="checkbox"
        checked={reverse}
        onChange={(e) => setReverse(e.target.checked)}
      />
      Reverse order
    </label>
  );

  if (reverse) {
    return (
      <>
        <Field
          label="Last name"
          name="lastName"
          value={inputVal.lastName}
          change={handleChange}
        />
        <Field
          label="First name"
          name="firstName"
          value={inputVal.firstName}
          change={handleChange}
        />
        {checkbox}
      </>
    );
  } else {
    return (
      <>
        <Field
          label="First name"
          name="firstName"
          value={inputVal.firstName}
          change={handleChange}
        />
        <Field
          label="Last name"
          name="lastName"
          value={inputVal.lastName}
          change={handleChange}
        />
        {checkbox}
      </>
    );
  }
}

function Field({ label, name, value, change }) {
  //   const [text, setText] = useState("");
  return (
    <label>
      {label}:{" "}
      <input
        type="text"
        name={name}
        value={value}
        placeholder={label}
        onChange={change}
      />
    </label>
  );
}
