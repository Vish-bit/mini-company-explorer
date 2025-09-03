import React from "react";
import SearchPage from "./components/SearchPage";
import {Routes, Route} from "react-router-dom";
import DetailPage from "./components/DetailPage";

const App = () => {
  return (
    <div className="montserrat-regular">
        <Routes>
          <Route path="/" element={<SearchPage />}/>
          <Route path="/company/:id" element={<DetailPage />}/>
        </Routes>
    </div>
  );
};

export default App;
