import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.send({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });

        await newUser.save();

        res.send({ message: 'User created successfully', data: newUser });
    } catch (error) {
        res.send({ message: 'Server error', error });
    }
};

const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.send({ message: 'User does not exist' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.send({ message: 'Invalid credentials' });
        }

        res.send({ message: 'Login successful', user: existingUser });
    } catch (error) {
        res.send({ message: 'Server error', error });
    }
};

export { signup, signin };