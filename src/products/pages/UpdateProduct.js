import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useForm } from "../../shared/hooks/form-hook";
import { AuthContext } from "../../shared/context/AuthContext";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validate";

import Input from "../../shared/components/Form/Input";
import Loader from "../../shared/components/UI/Loader";
import Button from "../../shared/components/Form/Button";
import ErrorModal from "../../shared/components/UI/ErrorModal";

const UpdateProduct = (props) => {
  const navigate = useNavigate();
  // Get http methods from custom http hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // Get auth status from context
  const auth = useContext(AuthContext);
  // Get loaded product
  const [loadedProduct, setLoadedProduct] = useState();
  // Get product by Id
  const productId = useParams().productId;
  // Get form handling functions from custom form hook
  const [formState, inputHandler, setFormData] = useForm(
    {
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

  // Get product by Id, and update
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`
        );
        setLoadedProduct(responseData.product);
        setFormData(
          {
            title: {
              value: responseData.product.title,
              isValid: true,
            },

            description: {
              value: responseData.product.description,
              isValid: true,
            },

            price: {
              value: responseData.product.price,
              isValid: true,
            },

            category: {
              value: responseData.product.category,
              isValid: true,
            },

            inStock: {
              value: responseData.product.inStock,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchProducts();
  }, [sendRequest, productId, setFormData]);

  // Function for send request to update product
  const productUpdateHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          price: formState.inputs.price.value,
          category: formState.inputs.category.value,
          inStock: formState.inputs.inStock.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
    navigate("/admin");
  };

  // If loading is true, show loader
  if (isLoading) {
    return (
      <div className="center">
        <Loader />
      </div>
    );
  }

  // If products isn't found
  if (!loadedProduct && !error) {
    return (
      <div className="center">
        <h1>Ne moze se pronaci</h1>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedProduct && (
        <form className="create_form" onSubmit={productUpdateHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Naziv"
            placeholders="Naziv"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Unesi validan naziv"
            onInput={inputHandler}
            initialValue={loadedProduct.title}
            initialValid={true}
          />

          <Input
            id="description"
            type="text"
            label="Opis"
            placeholders="Opis"
            validators={[VALIDATOR_MINLENGTH(20)]}
            errorText="Unesi validan opis (20)"
            onInput={inputHandler}
            initialValue={loadedProduct.description}
            initialValid={true}
          />
          <Input
            id="price"
            element="input"
            type="number"
            label="Cena"
            placeholders="Cena"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Unesi validnu cenu"
            onInput={inputHandler}
            initialValue={loadedProduct.price}
            initialValid={true}
          />
          <Input
            id="category"
            element="input"
            type="text"
            label="Kategorija"
            placeholders="Kategorija"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Unesi validnu kategoriju"
            onInput={inputHandler}
            initialValue={loadedProduct.category}
            initialValid={true}
          />
          <Input
            id="inStock"
            element="input"
            type="text"
            label="Na stanju"
            placeholders="Da li je na stanju"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Unesi validan input"
            onInput={inputHandler}
            initialValue={loadedProduct.inStock}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Izmeni
          </Button>
        </form>
      )}
    </>
  );
};

export default UpdateProduct;
