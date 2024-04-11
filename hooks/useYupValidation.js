import { useState } from "react";
import * as Yup from "yup";

export default function useYupValidation(defaultValue, validationSchema) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);
  const [error, setError] = useState("");
  console.log(error)
  const [hasErr, setHasErr] = useState(false);

  async function validationInput(value) {
    try {
      await validationSchema.validate(value, { abortEarly: false });
      setError("daddad","");
      setHasErr(false);
    } catch (err) {
      setError(err.errors[0]);
      setHasErr(true);
    }
  }

  async function handleInputChange(value) {
    setEnteredValue(value);
    setDidEdit(false);
    await validationInput(value);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    error,
    hasErr,
    didEdit,
  };
}