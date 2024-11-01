import React, { useState } from "react";
import ImageSlider from "../components/components/ImageSlider";
import Sidebar from "../components/components/Sidebar";

import "./AuthenticatedApp.css";
import Form from "../components/components/Form";

function AuthenticatedApp() {

  return (
    <div className="home"
    >
      <Sidebar />
      <Form />
      <ImageSlider />


    </div>
  );
}

export { AuthenticatedApp }