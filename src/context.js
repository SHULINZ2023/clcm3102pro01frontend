import React, { createContext, useContext } from 'react';

// Step 1: Create a context
const ThemeContext = createContext();


// Step 2: Create a provider component
const ThemeProvider = ({ children }) => {
  const theme = 'light'; // Your theme can be dynamic or come from state

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Step 3: Create a component that consumes the context
const ThemedComponent = () => {
  // Step 4: Use the useContext hook to access the context value
  const theme = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#333' : '#fff' }}>
      Current Theme: {theme}
    </div>
  );
};

// Step 5: Wrap your application with the ThemeProvider
const App = () => {
  return (
    <ThemeProvider>
      <ThemedComponent />
    </ThemeProvider>
  );
};

export default App;
