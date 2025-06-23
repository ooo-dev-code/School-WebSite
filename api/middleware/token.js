import jwt from 'jsonwebtoken';

export const createToken = (_id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
}