import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContext, AuthProvider } from "./Context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatRoom from "./components/ChatRoom/index";
import { StompClientProvider } from "./context/StompClientContext";
import CallRoom from "./components/CallRoom/index";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <StompClientProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/chat/:roomId" element={<ChatRoom />} />
            <Route path="/call/:roomId" element={<CallRoom />} />
          </Routes>
        </StompClientProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
