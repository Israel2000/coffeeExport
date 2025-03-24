const express = require("express");
const stripe = require("stripe")("your_stripe_secret_key"); // Replace with your secret key
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/checkout", async (req, res) => {
  try {
    const { items } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map(item => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:4200/success",
      cancel_url: "http://localhost:4200/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
