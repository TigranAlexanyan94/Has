import { getModel } from '../models/index';
import logger from '../configs/loggers';

export const eventsController = async (req, res) => {
  try {
    const Events = getModel('event');
    const eventsData = await Events.findAll();

    logger.info('Successfully get all events.');
    res.status(200).json(eventsData);
  } catch (err) {
    logger.error(err.message);
    return res.status(500).json({ message: 'Events not found.' });
  }
};

export const getEventByNameController = async (req, res) => {
  try {
    const Event = getModel('event');
    const name = req.query.title;
    const eventName = await Event.findOne({
      where: { name },
    });

    logger.info('Successfully get event.');
    res.status(200).json(eventName);
  } catch (err) {
    logger.error(err.message);
    return res.status(500).json({ message: 'Event not found.' });
  }
};

export const createEventController = async (req, res) => {
  try {
    const Event = getModel('event');
    const eventData = {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      date: req.body.date,
      status: req.body.status,
      repeat: req.body.repeat,
    };
    const newProduct = await Event.create(eventData);

    res.status(201).json({ data: {...newProduct.dataValues }, message: `Successful created new Event ${newProduct.name}`});
  } catch (err) {
    logger.error(err.message);
    return res
      .status(500)
      .json({ message: 'Some error occurred while creating a Event.' });
  }
};

export const updateEventController = async (req, res) => {
  try {
    const Event = getModel('event');
    const eventId = req.params.id;
    const updateEvent = req.body;
    const updatedEvent = await Event.update(updateEvent, {
      where: { id: eventId },
    });

    res.json({
      data: { ...updateEvent, id: Number(eventId)},
      message: `${updatedEvent} Event was updated successfully.`,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ message: 'Cannot update event ' });
  }
};

export const deleteEventController = async (req, res) => {
  try {
    const Event = getModel('event');
    const eventId = req.params.id;
    const deletedEvent = await Event.destroy({
      where: { id: eventId },
    });

    if (deletedEvent === 1) {
      res.json({
        data: { eventId: Number(eventId) },
        message: 'Event was deleted successfully!',
      });
    } else {
      res.status(400).json({
        message: 'Cannot delete event maybe category was not found!',
      });
    }
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      message: 'Could not delete event.',
    });
  }
};
