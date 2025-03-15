const ensureAuthenticated = require("../Middlewares/Auth");
const User = require("../Models/User");

const router = require("express").Router();

router.get("/", ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ orders: user.orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;