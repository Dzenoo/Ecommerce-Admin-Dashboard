import React, { useContext } from "react";
import { useForm } from "../shared/hooks/form-hook";
import { useHttpClient } from "../shared/hooks/http-hook";
import { AuthContext } from "../shared/context/AuthContext";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/util/validate";

import Input from "../shared/Form/Input";
import Button from "../shared/Form/Button";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitAuthHandler = async (event) => {
    event.preventDefault();

    try {
      const responseData = await sendRequest(
        "http://localhost:8000/api/users/login",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      auth.login(responseData.userId, responseData.token);
    } catch (err) {}
  };

  return (
    <>
      <form className="form" onSubmit={submitAuthHandler}>
        <h1>Uloguj se</h1>
        <Input
          element="input"
          id="email"
          placeholder="Email"
          type="text"
          label="Email"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Unesi ispravan email"
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Sifra"
          placeholder="Sifra"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Unesi ispravnu sifru"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          Uloguj se
        </Button>
      </form>
    </>
  );
};

export default Auth;
