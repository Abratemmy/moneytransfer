import './App.css';
import Signup from './components/Signup';
import { Container } from "react-bootstrap"
import { AuthProvider } from './contexts/AuthContext';
import Register from './components/Register';
import Router from './components/router';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
    // <div>
    //   <Register />
    // </div>
     
  );
}

export default App;
