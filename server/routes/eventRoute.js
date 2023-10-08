import express from 'express';
import {
  eventsController,
  getEventByNameController,
  createEventController,
  updateEventController,
  deleteEventController,
} from '../controllers/eventController';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.get('/title', verifyToken, getEventByNameController);
router.get('/', eventsController);
router.post('/', verifyToken, createEventController);
router.put('/:id', verifyToken, updateEventController);
router.delete('/:id', verifyToken, deleteEventController);

export default router;
