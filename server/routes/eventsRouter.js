import { Router } from 'express';
import * as eventsController from '../controllers/eventsController';


const router = new Router();
router.route('/events').get(eventsController.getEvents);


export default router;
