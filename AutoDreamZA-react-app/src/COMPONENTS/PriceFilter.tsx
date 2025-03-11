import React, { useState } from "react";
import { useFilter } from "./FilterContext";

const PriceFilter: React.FC = () => {
    const {setPriceRange} = useFilter();
    const [minPrice, setMinPrice] = useState<number | "">("");
    const[maxPrice,setMaxPrice] = useState<number | "">("");

    const handleFilterChange = () =>{
        setPriceRange(minPrice === "" ? 0 : Number(minPrice),maxPrice === ""? Infinity : Number(maxPrice));
    };

    return (
        <div className="price-filter">
          <label>Min Price:</label>
          <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : "")} />
    
          <label>Max Price:</label>
          <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : "")} />
    
          <button onClick={handleFilterChange}>Apply Filter</button>
        </div>
      );
}

export default PriceFilter;