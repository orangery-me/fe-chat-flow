import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthenticatedApp } from "./pages/AuthenticatedApp";
import { useAuth } from "./hooks/useAuth";
import HomePage from "./components/HomePage/HomePage";

function App () {
  const info = useAuth();
  if (info.user) {
    console.log('info nek', info.user);
  }

  return <div>{info.user ? <AuthenticatedApp info={info}></AuthenticatedApp> : <HomePage />}</div>;
}

export default App;
