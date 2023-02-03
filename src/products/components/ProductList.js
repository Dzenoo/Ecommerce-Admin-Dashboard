import React from "react";
import ProductItem from "./ProductItem";
import "./ProductList.css";

const ProductList = (props) => {
  return (
    <ul className="product_list">
      {props.products.map((product) => (
        <ProductItem
          key={product._id}
          _id={product._id}
          image={product.image}
          title={product.title}
          description={product.description}
          price={product.price}
          category={product.category}
          inStock={product.inStock}
          onDelete={props.deleteProductHandler}
        />
      ))}
    </ul>
  );
};

export default ProductList;
