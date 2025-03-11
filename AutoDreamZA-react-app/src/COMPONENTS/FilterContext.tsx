import React, { createContext, useState, useContext } from "react";

interface FilterContextType {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => void;
  setMaxPrice: (value: number) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  return (
    <FilterContext.Provider value={{ minPrice, maxPrice, setMinPrice, setMaxPrice }}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom Hook for using the context
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
