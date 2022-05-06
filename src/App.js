import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./router/CustomRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
