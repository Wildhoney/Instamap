import { basename } from 'path';
import { existsSync } from 'fs';
import http from 'http';
import express from 'express';
import opener from 'opener';
import { get } from 'axios';

const app = express();
const server = http.createServer(app);
const isHeroku = 'HEROKU_APP_NAME' in process.env;

app.use(express.static(__dirname + '/public'));

app.get('/authenticate', (req, res) => {

    res.send('Instamap');

});

server.listen(process.env.PORT || 5000);
!isHeroku && opener('http://127.0.0.1:5000');
