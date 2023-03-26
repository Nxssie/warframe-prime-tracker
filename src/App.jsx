import Auth from "./components/auth/auth";
import {createContext, useState} from "react";

export const UserContext = createContext({
    user: {},
    setUser: () => {}
});

function App() {

  const [user, setUser] = useState({});
  const value = {user, setUser};

  return(
      <UserContext.Provider value={value}>
          <h2>Current user: {user.name}</h2>
        <Auth/>
      </UserContext.Provider>
  )
}

export default App
