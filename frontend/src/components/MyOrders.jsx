import { useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";

function MyOrders(){
    const [orders, setOrders] = useState([]);

    // ✅ Fetch User Orders
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("https://shopi-t63o.onrender.com/orders", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token"),
                    },
                });

                const data = await response.json();
                setOrders(data.orders || []);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);
    const totalPrice = orders?.reduce((total, item) => total + item.quantity * item.price, 0);

    return <>
    <Navbar/>
    <div className="container">
        <div className="row">
            <div className="col-4"></div>
            <div className="col-4 text-center rounded">
                <h3 className="mt-3">Your Orders!</h3>
            {orders.length > 0 ? (
                            orders.map((item, index) => (
                                <div className="mt-3 mb-3 border" key={index}>
                                    <img className="mt-3" src={item.image} style={{ width: "50px", height: "50px" }} alt={item.title} />
                                    {item.title} <br />
                                    <b>${item.price}</b>
                                    <p>Quantity: {item.quantity}</p>                                  
                                    <p>${item.price*item.quantity}</p>
                                        
                                    
                                </div>
                            ))
                            
                        )
                         : (
                            <p>You Have no Orders.</p>
                        )}
                        
                        <span className="mb-5"><b>Total: ${totalPrice}</b></span>
            </div>
            <div className="col-4"></div>
        </div>

    </div>
    </>
}
export default MyOrders;
