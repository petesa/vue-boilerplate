import * as express from 'express';
import path from 'path';
import main from './main';

const server = express();

server.use(express.static(path.join(__dirname, '../dist')));

server.use('*', main);

server.listen(3000);
console.log('Server ready');
