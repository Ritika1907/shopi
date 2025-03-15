import { useState,useEffect } from "react";

import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { handleError, handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";
function Product(){
    const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${id}`) // Fetch product details
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleAddCart = async ()=>{
    const productInfo = {email:localStorage.getItem('userEmail'), productId: product.id, title: product.title, price: product.price, image: product.images[0]};
    try{
        const url = "https://shopi-t63o.onrender.com/cart/add";

        const response = await fetch(url,
            {
                method:"POST",
                headers:{
                    'Authorization':localStorage.getItem(`token`),
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(productInfo)
            }
        );
        const result = await response.json();
        console.log(result);

        let {message} = result;
        handleSuccess(message);
    }catch(err){
        handleError(err)
    }
  }

  if (!product) return <h2>Loading...</h2>;

    return(<>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="mt-5">{product.title}</h2>
                    <img className="mt-3" src={product.images[0]} style={{height:"400px",width:"400px"}}/>
                    <p className="fs-6"><b>${product.price}</b></p>
                    <p className="mt-3 p-3">{product.description}</p>
                    
                        <button className="btn btn-success mb-5" onClick={handleAddCart}>Add to cart</button>
        
                </div>
            </div>
            <ToastContainer/>
        </div>
    </>)
};

export default Product;
