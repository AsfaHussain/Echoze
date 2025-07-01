import express from 'express';
import { getMessages, getUsersForSidebar } from '../controllers/message.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { sendMessages } from '../controllers/message.controller.js';
const router= express.Router();
router.get('/users',protectRoute, getUsersForSidebar);
router.get('/:id',protectRoute ,getMessages);
router.post('/send/:id', protectRoute, sendMessages);
export default router;