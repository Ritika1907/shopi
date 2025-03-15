import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Products() {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/products").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <>
    <Navbar/>
      <div className="container">
        <div className="row mt-5">
          {!products ? (
            <p>Loading</p>
          ) : (
            products.map((product, index) => {
              return (
                <div className="col-3 p-2" key={index}>
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: "none",color:"inherit" }}
                  >
                    <img
                      src={product.images[0]}
                      style={{
                        width: "250px",
                        height: "260px",
                        borderRadius: "20px",
                      }}
                    />
                    <p>
                      {product.title} <br />
                      <b>${product.price}</b>
                    </p>
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
export default Products;
