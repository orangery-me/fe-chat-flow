import React, { useState } from "react";
import ImageSlider from "../components/components/ImageSlider";
import Sidebar from "../components/components/Sidebar";

import Form from "../components/components/Form";
import "./AuthenticatedApp.css";

function AuthenticatedApp ({ info }) {

  return (
    <div className="home"
    >
      <Sidebar info={info}></Sidebar>
      <Form />
      <ImageSlider />
    </div>
  );
}

export { AuthenticatedApp }