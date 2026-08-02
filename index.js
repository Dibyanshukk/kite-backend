require("dotenv").config();
const auth = require("./middleware/auth");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const { UserModel } = require("./model/UserModel");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
const url = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;

// ================= MongoDB =================

mongoose
    .connect(url)
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

// ================= Holdings =================

app.get("/allHoldings",auth, async (req, res) => {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
});

// ================= Positions =================

app.get("/allPositions",auth, async (req, res) => {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
});

// ================= Orders =================

app.get("/allOrders",auth, async (req, res) => {
    const allOrders = await OrdersModel.find({
        userId: req.user.id,
    });
    res.json(allOrders);
});

app.post("/newOrder",auth, async (req, res) => {
    const newOrder = new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
        userId: req.user.id,
    });

    await newOrder.save();

    res.json({
        message: "Order Saved Successfully",
    });
});

// ================= Register =================

app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const register = new UserModel({
            username,
            email,
            password: hashedPassword,
        });

        await register.save();

        res.status(201).json({
            message: "Registration Successful",
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Something went wrong",
        });
    }
});


// ================= Login =================

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const find = await UserModel.findOne({ email });

        if (!find) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, find.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password",
            });
        }

        const token = jwt.sign(
            {
                id: find._id,
                email: find.email,
            },
            jwtSecret,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Something went wrong",
        });
    }
});


// ================= Server =================

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});