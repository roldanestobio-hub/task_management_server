const jwt = require('jsonwebtoken');
const { User } = require('../models');

const auth = async(req, res, next) => {

	try{

		const authHeader = req.headers.authorization;

		if(!authHeader || !authHeader.startsWith('Bearer ')){
			return res.status(401).json({ message: "No token provided" });
		}

		const token = authHeader.split(' ')[1];

		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

		const user = await User.findByPk(decoded.id, { attributes: { exclude: ['password'] } });

		if(!user){
			return res.status(404).json({ message: "User not found" })
		}

		req.user = user;
		next();

	}catch(error){
		console.log(error);
		return res.status(500).json({ message: "Server Error", error: error.message });
	}

};

module.exports = auth;	