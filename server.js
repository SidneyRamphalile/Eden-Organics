require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

// Enable CORS for cross-origin requests (if needed for frontend-backend communication)
app.use(cors());

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (if your frontend files are in a "public" folder)
app.use(express.static("public"));

// Route to handle form submissions
app.post("/submit-form", async (req, res) => {
  const { name, email, message } = req.body;

  // Log the form data to check it's being sent correctly
  console.log("Received data:", { name, email, message });

  try {
    // Send data to Web3Forms API
    const response = await axios.post("https://api.web3forms.com/submit", {
      access_key: process.env.WEB3FORM_ACCESS_KEY, // Use the access key from the .env file
      name,
      email,
      message,
    });

    // Log Web3Forms response for debugging
    console.log("Web3Forms response:", response.data);

    // Send success response
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ message: "Error submitting form" });
  }
});

// Start the server on a specified port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
