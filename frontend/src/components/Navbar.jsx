import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleSuccess } from "../util";
import { ToastContainer } from "react-toastify";

function Navbar() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = (e)=>{
    localStorage.removeItem(`token`);
    localStorage.removeItem(`loggedInUser`);
    localStorage.removeItem(`userEmail`);
    handleSuccess("User Logged out!")
    setTimeout(()=>{
      navigate("/login");
    },1000)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
        <div className="container-fluid p-2">
          <Link
            to="/home"
            className="navbar-brand"
            style={{ color: "inherit" }}
          >
            Shopi
          </Link>
          {/* <a class="navbar-brand" href="#" style={{ color: "black" }}></a> */}
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse d-flex justify-content-between"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav mb-2 mb-lg-0">
              <li class="nav-item">
                <Link
                  to="/home"
                  className="nav-link"
                  style={{ color: "inherit" }}
                >
                  All
                </Link>
                {/* <a
                  class="nav-link active"
                  aria-current="page"
                  href="#"
                  style={{ color: "black" }}
                >
                  
                </a> */}
              </li>
              <li class="nav-item">
                <Link
                  to="/clothes"
                  className="nav-link"
                  style={{ color: "inherit" }}
                >
                  Clothes
                </Link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style={{ color: "black" }}>
                  Electronics
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style={{ color: "black" }}>
                  Furnitures
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style={{ color: "black" }}>
                  Toys
                </a>
              </li>
            </ul>

            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
              <Link
                  to="/orders"
                  className="nav-link"
                  style={{ color: "inherit" }}
                >
                  My Orders
                </Link>
                
              </li>
              
              <li class="nav-item">
                <Link to="/cart/mycart" className="nav-link"
                  style={{ color: "inherit" }}><i class="fa-solid fa-cart-shopping"></i>
                </Link>
                
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" style={{ color: "black" }}>
                  Welcome {loggedInUser}!
                </a>
              </li>
              <li class="nav-item">
                <button onClick={handleLogout} className="btn btn-sm btn-danger nav-link rounded ml-3">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <ToastContainer/>
      </nav>
    </>
  );
}
export default Navbar;
