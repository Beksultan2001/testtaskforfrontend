import React,{useState,useContext,useEffect} from 'react';

const AppContext = React.createContext();

const AppPovider = ({children}) =>{


    const [data,setData] = useState([]);


    return (
        <AppContext.Provider value = {{data,setData}}>
            {children}
        </AppContext.Provider>
    )

}

export const useGlobalContext = () =>{

    return useContext(AppContext);

}

export {AppContext,AppPovider};