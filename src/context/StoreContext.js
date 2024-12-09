// src/context/StoreContext.js
import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [storedResult, setStoredResult] = useState([]);

    const saveResult = (result) => {
        setStoredResult(result);
    };

    return (
        <StoreContext.Provider value={{ storedResult, saveResult }}>
            {children}
        </StoreContext.Provider>
    );
};
