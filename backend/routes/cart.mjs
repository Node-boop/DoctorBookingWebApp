import { Router } from "express";
import userMiddleware from "../middleware/userMiddleware.mjs";
import pharmacy from "../models/pharmacy.mjs"; // Assuming you have a pharmacy model to check product existence
import User from "../models/users.mjs"; // Assuming you have a user model to manage user data


const router = Router();

// Route to get user's cart
// This route retrieves the cart data for the authenticated user
// It assumes that the user ID is stored in the request object by middleware
// and that the cart data is stored in the user's document in the database.
// It populates the product details from the pharmacy model for better response.
// If the user is not authenticated or the cart is empty, it returns appropriate error messages.
// If successful, it returns the cart data with a success message.
// The response includes the user's cart items with product details.
// The user must be authenticated to access this route, enforced by the userMiddleware.
// The userMiddleware checks if the user is authenticated and adds the user ID to the request object
// before this route handler is executed.
// If the user is not authenticated, it returns a 401 Unauthorized status.
// If the user is authenticated but the cart is empty, it returns a 404 Not Found status with a message indicating that the cart is empty.
// If the user is authenticated and the cart is not empty, it retrieves the cart data from the database,
// populates the product details, and returns a 200 OK status with the cart data.
// The response structure includes a message and the cart items
// Each cart item includes the product ID, quantity, and populated product details from the pharmacy model
// The response is in JSON format, making it easy to consume by the client-side application.
// The user must be authenticated to access this route, enforced by the userMiddleware.
// The userMiddleware checks if the user is authenticated and adds the user ID to the request object
// before this route handler is executed.
// If the user is not authenticated, it returns a 401 Unauthorized status.
// If the user is authenticated but the cart is empty, it returns a 404 Not Found status with a message indicating that the cart is empty.
// If the user is authenticated and the cart is not empty, it retrieves the cart data from the database,
// populates the product details, and returns a 200 OK status with the cart data.
// The response structure includes a message and the cart items
// Each cart item includes the product ID, quantity, and populated product details from the pharmacy model
// The response is in JSON format, making it easy to consume by the client-side application.

/**
 * @swagger
 * /api/user/cart:
 *   get:
 *     summary: Get user's cart
 *     description: Retrieve the cart data for the authenticated user.
 *     tags: [Cart]
 *     responses:
 *      200:
 *        description: Successfully retrieved cart data.
 *        content:
 *          application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartResponse'
 *      401:
 *        description: Unauthorized access. User must be authenticated.
 *      404:
 *        description: User not found or cart is empty.
 *      500:
 *        description: Internal server error while retrieving cart data.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AddToCartError'
 */ 
router.get("/api/user/cart",userMiddleware,async(request, response) => {
    const userId = request.user.id; // Assuming user ID is stored in the request object by middleware
    if (!userId) {
        return response.status(401).json({ error: "Unauthorized" });
    }

    try {
        const user = await User.findById(userId).populate('cartData.productId');
        if (!user) {
            return response.status(404).json({ error: "User not found" });
        }
        response.status(200).json({
            message: "Cart retrieved successfully",
            cartData: user.cartData || []
        });
    } catch (error) {
        console.error("Error retrieving cart:", error);
        response.status(500).json({ error: "Internal server error" });
    }

   
});


// Route to add a product to the user's cart
// This route allows the authenticated user to add a product to their cart.
// It checks if the user is authenticated and if the product exists in the pharmacy model.
// If the user is not authenticated, it returns a 401 Unauthorized status.
// If the product does not exist, it returns a 404 Not Found status.



/**
 * @swagger
 * /api/user/cart/add:
 *   post:
 *     summary: Add a product to the user's cart    
 *     description: Add a product to the authenticated user's cart.
 *     tags: [Cart]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AddToCartRequest'
 *     responses:
 *       
 *       200:
 *         description: Successfully added product to cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddToCartResponse'
 *       400:
 *         description: Bad request. Missing required fields or invalid data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 *  
 */
router.post("/api/user/cart/add",userMiddleware, async(request, response) => {
    // Extracting userId, productId, and quantity from the request body
    // It assumes that the user ID is stored in the request object by middleware
    // and that the product ID and quantity are provided in the request body.
    // It checks if the user is authenticated and if the product exists in the pharmacy model.
    // If the user is not authenticated, it returns a 401 Unauthorized status.
    const { userId, productId, quantity } = request.body;
    // Assuming userId is stored in the request object by middleware
    const user = await User.findById(userId);
    // Check if the user exists
    // If the user does not exist, it returns a 404 Not Found status with an
    if (!user) {
        return response.status(404).json({ error: "User not found" });
    }   
    if (!userId || !productId || !quantity) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ error: "Quantity must be a positive number" });
    }

    if (!req.user || req.user.id !== userId) {
        return res.status(403).json({ error: "Unauthorized action" });
    }
    // Here you would typically check if the product exists in the database
    // and if the user has permission to add it to their cart.

    const exists = await pharmacy.findById(productId);
    if (!exists) {
        return res.status(404).json({ error: "Product not found" });
    }
    // Assuming the product exists, you would add it to the user's cart.
    if (!user.cartData) {
        user.cartData = [];
    }
    const productInCart = user.cartData.find(item => item.productId === productId);
    if (productInCart) {
        productInCart.quantity += quantity; // Update quantity if product already in cart
    } else {
        user.cartData.push({ productId, quantity }); // Add new product to cart
    }
    user.updatedAt = new Date().getTime();
    await user.save(); // Save the updated user document


    // Here you would typically add the product to the user's cart in the database
    response.status(200).json({
        message: "Product added to cart successfully",
        userId,
        productId,
        quantity
        
    });


});

export default router;