import { basename } from 'path';
import { existsSync, readFileSync } from 'fs';
import http from 'http';
import express from 'express';
import opener from 'opener';
import { stringify } from 'querystring';
import { safeLoad } from 'js-yaml';
import { post } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

const app = express();
const server = http.createServer(app);
const isHeroku = 'HEROKU_APP_NAME' in process.env;

app.use(express.static(__dirname + '/public'));

app.get('/authenticate/:code', (req, res) => {

    const config = safeLoad(readFileSync('./.instamap.yml', 'utf-8'));

    // Gather all of the variables required for making the access token request.
    const { instamap: { redirectUri }, instagram: { accessTokenUri, clientId } } = camelizeKeys(config);
    const { code } = req.params;
    const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
    const grantType = 'authorization_code';

    // Make the request for the access token from the Instagram API
    const params = stringify(decamelizeKeys({ clientSecret, grantType, redirectUri, clientId, code }));
    post(accessTokenUri, params).then(response => {
        console.log(response.data);
        res.send(JSON.stringify({ accessToken: req.params.code }));
    }).catch(response => {
        console.log(response);
    });


});

server.listen(process.env.PORT || 5000);
!isHeroku && opener('http://127.0.0.1:5000');
