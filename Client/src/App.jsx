// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//  import './App.css'

import "./commonResource/css/styles.css";
import "./commonResource/css/bootstrap.css";
import { Route, Routes } from "react-router-dom";
// import { Routes, Route } from "react-router-dom";
import Nav from "./commonResource/Header-navigation/Nav";
//import Nav from "./commonResource/Nav";
import Alert from "./commonResource/Alert-section/Alert";
import First from "./commonResource/First-hightlight-wrapper/First";
import Second from "./commonResource/Second-hightlight-wrapper/Second";
import Third from "./commonResource/Third-hightlight-wrapper/Third";
import Fourth from "./commonResource/Fourth-heghlight-wrapper/Fourth";
import Fifth from "./commonResource/Fifth-heghlight-wrapper/Fifth";
import Sixth from "./commonResource/Sixth-heghlight-wrapper/Sixth";
import Footer from "./commonResource/Footer-wrapper/Footer";

//pages
import Ipad from "./commonResource/Pages/Ipad/Ipad";
import Mac from "./commonResource/Pages/Mac/Macx";
import Support from "./commonResource/Pages/Support/Support";
import Four04 from "./commonResource/Pages/Four04/Four04";
import SharedLayout from "./commonResource/Pages/SharedLayout";
import Iphone from "./commonResource/Pages/Iphone/Iphone";
import ProductPage from "./commonResource/Pages/ProductPage/ProductPage";
//import Footer from "./Component/Footer/Footer";

function App() {
  // console.log("hello world");
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route
          path="/"
          element={
            <>
              <Alert />
              <First />
              <Second />
              <Third />
              <Fourth />
              <Fifth />
              <Sixth />
            </>
          }
        />
        <Route path="Ipad" element={<Ipad />} />
        {/* <Route index element={<Main />} /> */}
        <Route path="Mac" element={<Mac />} />
        <Route path="Support" element={<Support />} />
        <Route path="Iphone" element={<Iphone />} />
        <Route path="iphone/:productID" element={<ProductPage />} />
        
        <Route path="*" element={<Four04 />} />
      </Route>
    </Routes>
  );
}
export default App;
