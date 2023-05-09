import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import usersRouter from './routes/users.js';
const apiRouter = express.Router();
import moviesRouter from './routes/movies.js';
import myListRouter from './routes/mylist.js';
import path from 'path';
import { routeNotFoundJsonHandler } from './services/routeNotFoundJsonHandler.js';
import { jsonErrorHandler } from './services/jsonErrorHandler.js';
import { appDataSource } from './datasource.js';
import crypto from 'crypto';
import { exec } from 'child_process';
// const apiRouter = express.Router();

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    const app = express();

    app.use(logger('dev'));
    app.use(cors());
    app.use(
      express.json({
        verify: (req, res, buf) => {
          req.rawBody = buf;
        },
      })
    );
    app.use(express.urlencoded({ extended: false }));

    // Register routes
    apiRouter.get('/', (req, res) => {
      res.send('Hello from Express!');
    });
    apiRouter.use('/movies', moviesRouter);
    apiRouter.use('/users', usersRouter);
    apiRouter.use('/mylist', myListRouter);

    // Register API router
    app.use('/api', apiRouter);

    // Register Github Webhook
    app.post('/webhook', (req, res) => {
      const expectedSignature =
        'sha256=' +
        crypto
          .createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET)
          .update(req.rawBody)
          .digest('hex');

      const signature = req.headers['x-hub-signature-256'];

      if (signature !== expectedSignature) {
        return res.status(401).send(expectedSignature);
      }

      // Run your script
      exec(
        '/root/ensta-in211/run_webhook.sh >> /root/ensta-in211/webhook.log 2>&1',
        (err, stdout, stderr) => {
          if (err) {
            // Handle error
            console.error(err);
            return;
          }
          console.log(stdout); //inutile...
        }
      );

      res.json({ received: true });
    });

    // Register frontend
    const publicPath = new URL('./public', import.meta.url).pathname;
    app.use(express.static(publicPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
    });

    // Register 404 middleware and error handler
    app.use(routeNotFoundJsonHandler); // this middleware must be registered after all routes to handle 404 correctly
    app.use(jsonErrorHandler); // this error handler must be registered after all middleware to catch all errors

    const port = parseInt(process.env.PORT || '8080');

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
