import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UnauthenticatedApp from './pages/UnauthenticatedApp'; 
import AuthenticatedApp from './pages/AuthenticatedApp';
import { useAuth } from './hooks/useAuth';

function App () {
  const info  = useAuth();

  return (
    <div className="container">
    <h1> 💬  Chat Room</h1>
      {info.user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;