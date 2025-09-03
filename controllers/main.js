const jwt = require('jsonwebtoken');
const { UnAuthenticatedError, BadRequestError } = require('../errors');
const User = require('../models/users');
const { StatusCodes } = require('http-status-codes');

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new BadRequestError('Please provide username and password');
        }

        const user = await User.findOne({ username });

        if (!user) {
            throw new UnAuthenticatedError('Invalid credentials');
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if(!isPasswordCorrect) {
            throw new UnAuthenticatedError ('Invalid credentials');
        }

        const token = user.createJWT();

        res.status(StatusCodes.OK).json({ user:{ username: user.username, role: user.role }, token });
    } catch (error) {
        res.status(error.StatusCode || 500).json({ msg: error.message || 'Server error' });
    }
};

module.exports = { login };