import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Product from "./components/Product";
import ClothesProducts from "./components/ClothesProducts";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import Cart from "./components/Cart";
import MyOrders from "./components/MyOrders";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
const PrivateRoute = ({element})=>{
  return isAuthenticated ? element : <Navigate to="/login"/>
}


  return (
    <>
      
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
      <Route path="/" element={<Navigate to="/login"/>}></Route>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        
        <Route path="/home" element={<PrivateRoute element={<Products/>} />}></Route>
        <Route path="/product/:id" element={<PrivateRoute element={<Product/>} />}></Route>
        <Route path="/clothes" element={<PrivateRoute element={<ClothesProducts/>} />}>  </Route>
        <Route path="/cart/mycart" element={<PrivateRoute element={<Cart/>} />}></Route>
        <Route path="/orders" element={<PrivateRoute element={<MyOrders/>} />}></Route>
        
        </Routes>
    </>
  );
}

export default App;
