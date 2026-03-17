const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const register = async(req, res) => {

	try {

		const { email, password } = req.body;

		if(!email || !password){
			return res.status(400).json({ message: "All fields are required" });
		}

		if(password.length < 8){
			return res.status(400).json({ message: "Password must be atleast 8 character" });
		}

		const existingUser = await User.findOne({ where: { email } });

		if(existingUser){
			return res.status(400).json({ message: "Email already exist" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await User.create({
			email,
			password: hashedPassword
		});

		return res.status(201).json({ message: "Registered successfully" });

	}catch(error){
		console.log(error);
		return res.status(500).json({ message: "Server Error", error: error.message });
	}
};

const login = async(req, res) => {

	try {

		const { email, password } = req.body;

		if(!email || !password){
			return res.status(400).json({ message: "All fields are required" });
		}

		const user = await User.findOne({ where: { email } });

		if(!user){
			return res.status(404).json({ message: "User not found" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if(!isMatch){
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const token = jwt.sign(
			{id: user.id, email: user.email},
			process.env.JWT_SECRET_KEY,
			{expiresIn: '1d'}
		);

		return res.status(200).json({ 
			message:"Login successfully",
			token
		});

	}catch(error){
		console.log(error);
		return res.status(500).json({ message: "Server Error", error: error.message });
	}
};

module.exports = { register, login };