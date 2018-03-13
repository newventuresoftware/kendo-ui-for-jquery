import http from 'http';
import { env, port, ip } from './config';
import express from './services/express';
import api from './api';

const app = express(api);
const server = http.createServer(app);

setImmediate(() => {
    server.listen(port, ip, () => {
        console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env);
    });
});

export default app;
