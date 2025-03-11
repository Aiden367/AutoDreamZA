import React, { createContext, useContext, useState } from "react";

interface FilterContextType {
    minPrice: number;
    maxPrice: number;
    setPriceRange: (min: number, max: number) => void;
  }

  const FilterContext = createContext<FilterContextType | undefined>(undefined);

  export const FilterProvider: React.FC <{children: React.ReactNode}> = ({children}) =>{
    const[minPrice,setMinPrice] = useState(0);
    const[maxPrice,setMaxPrice] = useState(Infinity);

    const setPriceRange = (min: number,max: number) =>{
        setMinPrice(min);
        setMaxPrice(max);
    };

    return(
        <FilterContext.Provider value={{ minPrice, maxPrice, setPriceRange }}>
      {children}
    </FilterContext.Provider>
  );

};

export const useFilter = () => {
    const context = useContext(FilterContext);
    if (!context) {
      throw new Error("useFilter must be used within a FilterProvider");
    }
    return context;
  };