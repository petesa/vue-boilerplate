/* eslint function-paren-newline: ["error", "consistent"] */
import express from 'express';
import path from 'path';
// import App from '../client/main';
// import template from './template';
// import favicon from '../assets/favicon.ico';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  /* res.send(template({
    body: App,
    // icon: favicon,
    title: 'Vue boilerplate',
  })); */
  /* res.send(
    [{
      title: 'Hello World!',
      description: 'Hi there! How are you?',
    }],
  ); */
  res.sendFile(path.join(__dirname, './', 'index.html'));
});

export default router;
