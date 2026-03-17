const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/user');
const auth = require('../authMiddleware/auth');

router.post('/register', register);
router.post('/login', login);

router.get('/profile', auth, (req, res) => {
	return res.status(200).json({ user: req.user });
});

module.exports = router;