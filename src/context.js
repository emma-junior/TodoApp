import React, {useContext, useState, useEffect} from 'react'

const AppContext = React.createContext()
const AppProvider = ({children}) => {
    const [todoitems, setTodoitems] = useState(() => {
        const localData = localStorage.getItem("todoitems");
        return localData ? JSON.parse(localData) : [];
    });
    // const defaultTodos = () => {
    //     const localData = localStorage.getItem("todoitems")
    //     return localData ? JSON.parse(localData) : []
    // }
    useEffect(() => {
        localStorage.setItem("todoitems", JSON.stringify(todoitems))
    },[todoitems])
  return (
    <AppContext.Provider value={{todoitems, setTodoitems}}>{children}</AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider

