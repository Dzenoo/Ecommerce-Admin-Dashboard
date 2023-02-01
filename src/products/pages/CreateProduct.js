import React, { useContext } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/AuthContext";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validate";

import Button from "../../shared/components/Form/Button";
import Input from "../../shared/components/Form/Input";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import Loader from "../../shared/components/UI/Loader";
import ImageUpload from "../../shared/components/Form/ImageUpload";

const CreateProduct = () => {
  const navigate = useNavigate();
  // Get auth status from context
  const auth = useContext(AuthContext);
  // Get http methods from custom http hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // Get form handling functions from custom form hook
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      category: {
        value: "",
        isValid: false,
      },
      inStock: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  let formIsValid = false;
  if (formState.inputs.isValid) {
    formIsValid = true;
  }

  // Create product handler
  const productSubmitHandler = async (event) => {
    event.preventDefault();
    // Send formData to backend
    try {
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("price", formState.inputs.price.value);
      formData.append("category", formState.inputs.category.value);
      formData.append("inStock", formState.inputs.inStock.value);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/products/new`,
        "POST",
        formData,
        { Authorization: "Bearer " + auth.token }
      );
      navigate("/dm");
    } catch (error) {}
  };

  return (
    <div className="main">
      <ErrorModal error={error} onClear={clearError} />
      <form className="create_form" onSubmit={productSubmitHandler}>
        {isLoading && <Loader asOverlay />}
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Unesite validnu sliku"
        />
        <Input
          id="title"
          element="input"
          type="text"
          label="Naziv"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Unesite validan naziv"
          onInput={inputHandler}
          placeholder="Naziv Artikla"
        />
        <Input
          id="description"
          type="text"
          label="Opis"
          validators={[VALIDATOR_MINLENGTH(20)]}
          errorText="Unesite validan opis"
          placeholder="Opis Artikla"
          onInput={inputHandler}
        />
        <Input
          id="price"
          type="number"
          label="Cena"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Unesite validnu cenu"
          placeholder="Cena Artikla"
          onInput={inputHandler}
        />
        <Input
          id="category"
          element="input"
          type="text"
          label="Kategorija"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Unesite validnu kategoriju"
          onInput={inputHandler}
          placeholder="Kategorija Artikla"
        />
        <Input
          id="inStock"
          type="text"
          label="Na Stanju"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          placeholder="Na stanju"
          errorText="Unesite odgovarajucu vrednost"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={formIsValid}>
          Kreiraj
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
