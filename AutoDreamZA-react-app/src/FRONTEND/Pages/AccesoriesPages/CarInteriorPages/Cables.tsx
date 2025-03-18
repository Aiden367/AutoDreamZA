import React from "react";
import { useFilter } from "../../../../COMPONENTS/FilterContext";
import PriceFilter from "../../../../COMPONENTS/PriceFilter";

const ProductList: React.FC = () => {
  const { minPrice, maxPrice } = useFilter();

  // Define a sample list of products
  const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
    // Add more products as needed
  ];

  const filteredProducts = products.filter(
    (product) => product.price >= minPrice && product.price <= maxPrice
  );

  return (
    <div>
      <h1>Products</h1>
      <PriceFilter />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
