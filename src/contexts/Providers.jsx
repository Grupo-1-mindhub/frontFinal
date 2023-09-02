import { createContext, useState, useEffect } from "react";
const GastosContext = createContext();


const GastosProvider = ({ children }) => {


    const [curretAccount, setCurretAccount] = useState({
        user: "12sdfs",
        accounts: {
            cuenta: 1,
            cuenta: 2
        }
    })
    const [currentUser, setCurrentUser] = useState()



    return (
        <GastosContext.Provider
            value={{
                
                curretAccount,
                setCurretAccount,
                setCurrentUser
            }}>
            {children}
        </GastosContext.Provider>
    );
};
export { GastosProvider };
export default GastosContext;