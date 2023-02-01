import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ProductList from "../components/ProductList";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import Loader from "../../shared/components/UI/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  const deleteProd = (deletedProductId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((p) => p._id !== deletedProductId)
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products`
        );
        setProducts(responseData.products);
      } catch (err) {}
    };
    fetchProducts();
  }, [sendRequest]);

  return (
    <>
      {isLoading && <Loader asOverlay />}
      <ErrorModal error={error} onClear={clearError} />
      <ProductList products={products} deleteProductHandler={deleteProd} />
    </>
  );
};

export default Products;
