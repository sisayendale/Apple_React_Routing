//import React, { StrictMode } from "react";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Iphone() {
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4567/iphones")
      // fetch("/iphone.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data); // Log the fetched data
        setProducts(data.Products);
      })
      .catch(() => console.log("Error: unable to fetch data"));
  }, []);
  console.log(Products);

  // let flip = true;

  return (
    <div>
      <section className="internal-page-wrapper">
        <div className="container">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-12 mt-5 pt-5">
              <h1 className="font-weight-bold">Iphone page</h1>
              <div className="Brief-description-mb-5">
                The Best for the brightest.
              </div>
            </div>
          </div>
          {Products?.map((product, index) => {
            let productdiv = (
              <div
                key={product.product_url}
                className="row justify-content-center text-center product-holder h-100">
                <div
                  className={`col-sm-12 col-md-6 my-auto order-${
                    index % 2 === 0 ? "1" : "2"
                  }`}>
                  <div className="product-title">{product.product_name}</div>
                  <div className="product-brief">
                    {" "}
                    {product.product_brief_description}{" "}
                  </div>
                  <div className="starting-price">
                    {" "}
                    {`Starting at ${product.starting_price}`}{" "}
                  </div>
                  <div className="monthly-price">{product.price_range}</div>

                  <div className="link-wrapper">
                    <ul>
                      {/* <li> */}
                        <Link to={`/Iphone/${product.product_url}`}>
                          learn more
                        </Link>
                      {/* </li> */}
                    </ul>
                  </div>
                </div>

                <div
                  className={`col-sm-12 col-md-6 order-${
                    index % 2 === 0 ? "2" : "1"
                  }`}>
                  <div className="product-image">
                    <img src={product.product_img} alt="product" />
                  </div>
                </div>
              </div>
            );
            return productdiv;
          })}
        </div>
      </section>
    </div>
  );
}
export default Iphone;
