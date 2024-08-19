import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Four04 from "../Four04/Four04";

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  //console.log(useParams());
  const { productID } = useParams();
  console.log(productID);
  useEffect(() => {
    fetch("http://localhost:4567/iphones")
       // fetch("/iphone.json")
      .then((res) => res.json())
      .then((data) => {
        const productlist = data.Products;
       console.log(productlist);

        const singleproduct = productlist.filter(
          (product) => product.product_url === productID
        );
        setProduct(singleproduct);
      })
      .catch(() => console.log("Error: unable to fetch data"));
  }, [productID]);
  console.log(product);
  console.log("ProductPage");
  if (product.length) {
    return (
      <div>
        <section className="internal-page-wrapper">
          <div className="container">
            {product?.map((product) => {
              return (
                <div key={product.product_id}>
                  <div className="row justify-content-center text-center">
                    <div className="col-12 mt-5 pt-5">
                      <div className="title-wrapper font-weight-bold">
                        {product.product_name}
                      </div>
                      <div className="brief-description">
                        {product.product_brief_description}
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center text-center product-holder h-100 mt-5">
                    <div className={`col-sm-12 col-md-6 my-auto`}>
                      <div className="starting-price">{`Starting at ${product.starting_price}`}</div>
                      <div className="monthly-price">{product.price_range}</div>
                      <div className="product-details">
                        {product.product_details}
                      </div>
                    </div>
                    <div className={`col-sm-12 col-md-6`}>
                      <div className="product-img">
                        <img src={product.product_img} alt="product" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    );
  } else {
    return <Four04 />;
  }
}
