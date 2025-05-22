const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { getRepository } = require("typeorm");
const User = require("../models/User");
const { get } = require("http");

module.exports = {
    signup: async (req, res) => {
        try {
            const userRepository = getRepository(User);
            const { username, password, role = 'Employee' } = req.body;

            const existingUser = await userRepository.findOne({ where: { username } });
            if (existingUser) {
                return res.status(409).json({ message: "Username already exists" });
            }

            const hashedPassword = await bycrypt.hash(password, 10);
            const user = new User({
                username,
                password: hashedPassword,
                role: 'Employee' // Default role
            });
            await user.save();
            
            res.status(201).json({ message: "User created successfully"});
        }
        catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    login: async (req, res) => {
        try {
            const userRepository = getRepository(User);
            const { username, password } = req.body;

            const user = await userRepository.findOne({ where: { username } });
            if (!user) {
                return res.status(401).json({ message: "Invalid username or password" });
            }

            const isPasswordValid = await bycrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid username or password" });
            }


            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role },
                process.env.JWT_SECRET, 
                { expiresIn: "1h" }
            );

            res.status(200).json({
                message: "Login successful",
                token,
                role: user.role,
            });
        }
        catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};