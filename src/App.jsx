import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthenticatedApp } from "./pages/AuthenticatedApp";
import { useAuth } from "./hooks/useAuth";
import HomePage from "./components/HomePage/HomePage";
import "./index.css";

function App () {
  const info = useAuth();

  return <div>{info.user ? <AuthenticatedApp info={info}></AuthenticatedApp> : <HomePage />}</div>;
}

export default App;
