import React, { useState } from "react";
import { useFilter } from "./FilterContext"; 

const PriceFilter: React.FC = () => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useFilter();
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  const handleApplyFilter = () => {
    setMinPrice(localMin);
    setMaxPrice(localMax);
  };

  return (
    <div className="price-filter">
      <label>Min Price:</label>
      <input
        type="number"
        value={localMin}
        onChange={(e) => setLocalMin(Number(e.target.value))}
      />
      
      <label>Max Price:</label>
      <input
        type="number"
        value={localMax}
        onChange={(e) => setLocalMax(Number(e.target.value))}
      />

      <button onClick={handleApplyFilter}>Apply Filter</button>
    </div>
  );
};

export default PriceFilter;
