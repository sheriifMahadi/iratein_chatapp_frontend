
import './assets/styles.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login'
import Chat from './components/Chats'
import { AuthContextProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Header from './components/Header';
import AuthService from "../src/services/AuthService";

const App = () => {

  return (
    
    <BrowserRouter>
      <Routes>
          <Route path="/" 
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
        } />
        
          <Route path="/login" element={
            <AuthContextProvider>
              <Login />
            </AuthContextProvider>
          } />
      </Routes>
    </BrowserRouter>
  );
}
export default App
