// OPTIONAL: Use this file only if you want to run a custom Node.js server 
// instead of the built-in Cloud Database provided in index.html.

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (Replace with your actual MongoDB connection string)
// You can use a free cluster from MongoDB Atlas or a local instance
const MONGO_URI =  'mongodb+srv://princegupta3637_db_user:pass@heaven.u9u6skz.mongodb.net/?appName=heaven';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB Connected Successfully'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Define Schema
const BookingSchema = new mongoose.Schema({
    parentName: String,
    email: String,
    childName: String,
    program: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', BookingSchema);

// Routes
app.get('/', (req, res) => {
    res.send('Heaven Kids Backend is Running!');
});

// API Endpoint to handle form submissions
app.post('/api/book', async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        console.log('New Booking Saved:', req.body);
        res.status(201).json({ message: 'Booking successful!', data: newBooking });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
function toggleAboutFeatures() {
const features = document.getElementById("expanded-features");
const btnText = document.querySelector("#readMoreBtn span");
const btnIcon = document.getElementById("btnIcon");

if (features.classList.contains("hidden")) {
features.classList.remove("hidden");
btnText.textContent = "Show Less";
btnIcon.classList.replace("fa-arrow-right", "fa-arrow-up");
} else {
features.classList.add("hidden");
btnText.textContent = "Read More About Us";
btnIcon.classList.replace("fa-arrow-up", "fa-arrow-right");
}
}