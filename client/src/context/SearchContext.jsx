import React, { useEffect, useState, createContext, useContext } from 'react';

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState({
    keyword: "",
    result: []
  });

  return (
    <SearchContext.Provider value={[search, setSearch ]}>
      {children} 
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { SearchProvider, useSearch };
