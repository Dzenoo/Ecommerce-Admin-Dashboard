import React, { useReducer, useEffect } from "react";
import { validate } from "../../util/validate";

import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    // Onchange
    case "CHANGE": {
      return {
        ...state,
        // Dobij value iz payloada
        value: action.val,
        //prodji kroz validaciju
        isValid: validate(action.val, action.validators),
      };
    }

    // Onblur
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props; // Id i OnInput iz props
  const { value, isValid } = inputState; // State iz reducera

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const focusHandler = (event) => {
    dispatch({
      type: "TOUCH",
    });
  };

  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={focusHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={focusHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
