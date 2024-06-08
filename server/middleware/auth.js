import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const auth = (req, res, next) => {
  // Parse cookies from the request
  cookieParser()(req, res, () => {});

  // Extract the token from the Authorization header or cookies
  const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;

  // Check if the token exists
  if (!token) {
    // If no token is provided, return a 401 Unauthorized error
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Decode and verify the token using the JWT_SECRET from environment variables
    const secret = process.env.JWT_SECRET || 'defaultSecret';
    const decoded = jwt.verify(token, secret);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Call the next middleware function in the chain
    next();
  } catch (error) {
    // If token verification fails, return a 401 Unauthorized error
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default auth;