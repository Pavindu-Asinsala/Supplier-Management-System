import React, { createContext, useState } from 'react';

export const adddata = createContext({ udata: "", setUdata: () => {} });
export const updatedata = createContext({ updata: "", setUPdata: () => {} });
export const deldata = createContext({ dltdata: "", setDLTdata: () => {} });

const ContextProvider = ({ children }) => {
    const [udata, setUdata] = useState("");
    const [updata, setUPdata] = useState("");
    const [dltdata, setDLTdata] = useState("");

    return (
        <adddata.Provider value={{ udata, setUdata }}>
            <updatedata.Provider value={{ updata, setUPdata }}>
                <deldata.Provider value={{ dltdata, setDLTdata }}>
                    {children}
                </deldata.Provider>
            </updatedata.Provider>
        </adddata.Provider>
    );
}

export default ContextProvider;
