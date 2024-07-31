import express from 'express';
import { createTask, getTasks, deleteTask } from '../controllers/taskController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createTask).get(protect, getTasks);

router.route('/:id').delete(protect, deleteTask);


export default router;
