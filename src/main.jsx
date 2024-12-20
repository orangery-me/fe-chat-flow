import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Profile from "./components/MyProfile/profile";
import Notification from "./components/Notification/Notification";
import { StompClientProvider } from "./context/StompClientContext";
import { WebRTCProvider } from "./context/WebRTC";
import { AuthProvider } from "./context/AuthContext";
import ChatRoom from "./components/ChatRoom/index";
import CallRoom from "./components/CallRoom/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <StompClientProvider>
          <WebRTCProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/chat/:roomId" element={<ChatRoom />} />
              <Route path="/call/:roomId" element={<CallRoom />} />
              <Route path="/myprofile" element={<Profile />} />
              <Route path="/mynotification" element={<Notification />} />
            </Routes>
          </WebRTCProvider>
        </StompClientProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
