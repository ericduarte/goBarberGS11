import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);

routes.use(ensureAuthenticated);

routes.use('/appointments', appointmentsRouter);

export default routes;
