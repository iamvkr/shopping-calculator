import React, { createContext, useState, useEffect } from 'react'

export const dataContext = createContext();

const Context = ({ children }) => {
  const [activeList, setactiveList] = useState(0);
  const [db, setdb] = useState(JSON.parse(localStorage.getItem("savedDb")) || [{
    listName: "Default",
    listData: [],
  }]);

  /** debounce changes for db and save to localstorage */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("savedDb", JSON.stringify(db))
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [db, 2000]);

  return (
    <dataContext.Provider value={{ db, setdb, activeList, setactiveList }}>
      {children}
    </dataContext.Provider>
  )
}

export default Context;

/**
 * listData:[{
    id: Date.now(),
    product:"",
    rate: 1,
    qty: 1,
    isChecked: false
  }]
 */