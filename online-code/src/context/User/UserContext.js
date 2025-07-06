// UserContext.js
import React, { createContext, useState } from 'react';

// Create a Context for the user
const UserContext = createContext();

// Create a Provider component to manage the user data
export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);
  return (
    <UserContext.Provider value={{ setUserEmail,userEmail }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContext;