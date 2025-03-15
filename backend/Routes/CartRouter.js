const ensureAuthenticated = require("../Middlewares/Auth");
const User = require("../Models/User");

const router = require("express").Router();

router.post("/add",ensureAuthenticated, async(req,res)=>{
    try{
        console.log("---logged in user details --->",req.user);
    const {productId, title, price, image} = req.body;
    const user = await User.findById(req.user._id);
    
    const existingProduct = user.cart.find((item) => item.productId === productId);
    if (existingProduct) {
        // ✅ Increase quantity if product exists
        existingProduct.quantity += 1;
      } else {
        // 🆕 Add new product to cart
        user.cart.push({ productId, title, price, image, quantity: 1 });
      }
  
      await user.save();
    res.status(200).json({
        message:"Item added to cart Succesfully"
    })
    }catch(err){
        res.status(500).json({ message: "Server error", err });
    }
    
})

router.get("/mycart", ensureAuthenticated, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      res.json({ cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  router.put("/update", ensureAuthenticated, async (req, res) => {
    const { productId, action } = req.body; // action = "increase" or "decrease"

    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        let cart = user.cart;

        const itemIndex = cart.findIndex(item => item.productId === productId);
        if (itemIndex === -1) return res.status(404).json({ message: "Product not in cart" });

        if (action === "increase") {
            cart[itemIndex].quantity += 1;
        } else if (action === "decrease") {
            cart[itemIndex].quantity -= 1;
            if (cart[itemIndex].quantity <= 0) cart.splice(itemIndex, 1); // Remove item if quantity is 0
        }

        await user.save();
        res.json({ cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
router.post("/checkout", ensureAuthenticated, async (req, res) => {
  try {
      const userId = req.user._id;

      // Get user data
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      if (!user.cart || user.cart.length === 0) {
          return res.status(400).json({ message: "Cart is empty" });
      }

      // ✅ Move cart items to orders
      user.orders = [...user.orders, ...user.cart]; // Append cart items to orders

      // ✅ Clear the cart after checkout
      user.cart = [];

      // ✅ Save changes
      await user.save();

      res.status(200).json({ message: "Order placed successfully", orders: user.orders });
  } catch (error) {
      console.error("Checkout error:", error);
      res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;