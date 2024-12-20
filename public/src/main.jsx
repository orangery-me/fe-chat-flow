import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";
import Profile from "../../src/components/MyProfile/Profile";
import Notification from "../../src/components/Notification/Notification";
import { StompClientProvider } from "../../src/context/StompClientContext";
import { WebRTCProvider } from "../../src/context/WebRTC";
import { AuthProvider } from "../../src/context/AuthContext";
import ChatRoom from "../../src/components/ChatRoom/index";
import CallRoom from "../../src/components/CallRoom/index";

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