import React from "react";
import { useFilter } from "../../../COMPONENTS/FilterContext";
import PriceFilter from "../../../COMPONENTS/PriceFilter";
const ProductList: React.FC = () => {
    const { minPrice, maxPrice } = useFilter();
  
    const filteredProducts = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
  
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
export default Cables;
