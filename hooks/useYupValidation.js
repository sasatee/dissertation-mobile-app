import { useState } from "react";

export default function useYupValidation(defaultValue, validationSchema) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleInputChange(value) {
    setEnteredValue(value);
    setDidEdit(false);

    try {
      await validationSchema.validate(value);
      setError(""); // No error
    } catch (err) {
      setError(err.message);
    }
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    error: didEdit ? error : "",
    setLoading,
    loading,
  };
}
