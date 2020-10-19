import React, { useContext, useEffect, useState, createContext } from 'react';


export const NavigationContext = createContext(null);

export const NavigationProvider = props => {
    const [screenName, setScreenName] = useState('');

    return (
        <NavigationContext.Provider value={[screenName, setScreenName]}>
            {props.children}
        </NavigationContext.Provider>
    )
}