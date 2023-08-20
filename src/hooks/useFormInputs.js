import React, { useState } from 'react';
export default function useFormInputs(inputValues) {
  const [values, setValues] = useState(inputValues);
  const handleChange = (evt) => {evt.preventDefault();
    const {value, name} = evt.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}