import React, { useContext } from "react";
import { AuthContext } from "../../shared/context/AuthContext";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Loader from "../../shared/components/UI/Loader";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import Button from "../../shared/components/Form/Button";
import "./ProductItem.css";

const ProductItem = (props) => {
  const auth = useContext(AuthContext);
  const { _id, image, title, price, category, inStock } = props;
  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  const confirmDeleteHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/products/${_id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
      props.onDelete(_id);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
      <div className="product_item" key={_id}>
        <img src={`${process.env.REACT_APP_ASSETS_URL}/${image}`} alt={title} />
        <div className="text">
          <p>
            Kategorija: <b>{category}</b>
          </p>
          <p>
            Naziv: <b>{title}</b>
          </p>
          <p>
            Na stanju: <b>{inStock}</b>
          </p>
          <p>
            Cena: <b>{price} DIN</b>
          </p>
        </div>
        <div style={{ gap: "2em", display: "flex" }}>
          <Button action to={`/products/${_id}`}>
            Izmeni
          </Button>
          <Button danger onClick={confirmDeleteHandler}>
            Izbrisi
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
