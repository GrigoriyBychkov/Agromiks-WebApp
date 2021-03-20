import { Router } from 'express';
import UserRouter from './Users';
import AnimalRouter from './Animals';
import FeedbackRouter from './Feedback'


// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/animals', AnimalRouter);
router.use('/feedback', FeedbackRouter);

// Export the base-router
export default router;
