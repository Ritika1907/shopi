import { useState , useEffect} from "react";
import Navbar from "./Navbar";
import { handleError, handleSuccess } from "../util";
import { useNavigate } from "react-router-dom";
function Cart(){
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    // ✅ Fetch Cart from API
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch("https://shopi-t63o.onrender.com/cart/mycart", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: localStorage.getItem("token")
                    },
                });

                const data = await response.json();
                console.log(data);
                setCart(data.cart || []);
                
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, []);
    const updateQuantity = async (productId, action) => {
        try {
            const response = await fetch("https://shopi-t63o.onrender.com/cart/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
                body: JSON.stringify({ productId, action }),
            });

            const data = await response.json();
            setCart(data.cart); // Update cart state after change
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };
    const handleCheckout = async () => {
        try {
            const response = await fetch("https://shopi-t63o.onrender.com/cart/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem("token"),
                },
            });

            const data = await response.json();
            if (response.ok) {
                handleSuccess("Order placed successfully!");
                setCart([]); // Clear cart in UI
                navigate("/orders"); // Redirect to My Orders page
            } else {
                handleError(data.message || "Checkout failed");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            handleError("Something went wrong, please try again.");
        }
    };
    const totalPrice = cart?.reduce((total, item) => total + item.quantity * item.price, 0);


    return(<>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4 border text-center mt-5">
                {cart.length > 0 ? (
                            cart.map((item, index) => (
                                <div className="mt-3 mb-3 border" key={index}>
                                    <img className="mt-3" src={item.image} style={{ width: "50px", height: "50px" }} alt={item.title} />
                                    {item.title} <br />
                                    <b>${item.price}</b>
                                    <p>Quantity: {item.quantity}</p>
                                    
                                        <button className="btn btn-sm btn-danger mb-2" onClick={() => updateQuantity(item.productId, "decrease")}>-</button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button className="btn btn-sm btn-primary mb-2" onClick={() => updateQuantity(item.productId, "increase")}>+</button>
                                        <br />
                                        
                                    
                                </div>
                            ))
                            
                        )
                         : (
                            <p>Your cart is empty</p>
                        )}
                        <button className="btn btn-sm btn-success mt-5 mb-5" onClick={handleCheckout}>Checkout ${totalPrice}</button>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
        </>
    )

}
export default Cart;
