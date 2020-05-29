import React from 'react';
import AuthContext from './context/AuthContext';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => (
  <>
    <AuthContext.Provider value={{ name: 'John' }}>
      <SignIn />
    </AuthContext.Provider>
    <GlobalStyle />
  </>
);
export default App;
