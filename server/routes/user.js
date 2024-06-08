import express from 'express';
import { registerUser, loginUser, getAllUsers, updateProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/getAllUsers', getAllUsers);
router.put('/update/:id', updateProfile);


export default router;