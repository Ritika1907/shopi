import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function ClothesProducts() {
  let [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("https://api.escuelajs.co/api/v1/products").then((res) => {
      setProducts(res.data.filter((p) => p.category.name == "Clothes"));
      console.log("products");
    });
  }, []);

  if (products.length === 0) return <h2>Loading...</h2>;
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
                    style={{ textDecoration: "none", color: "inherit" }}
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
export default ClothesProducts;
