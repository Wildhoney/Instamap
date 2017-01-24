import { readFileSync } from 'fs';
import http from 'http';
import { stringify } from 'querystring';
import express from 'express';
import opener from 'opener';
import format from 'string-template';
import { safeLoad } from 'js-yaml';
import { get, post } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

const app = express();
const server = http.createServer(app);
const isHeroku = 'HEROKU_APP_NAME' in process.env;

app.get('/authenticate/:code', (req, res) => {

    const { instamap, instagram } = camelizeKeys(safeLoad(readFileSync('./.instamap.yml', 'utf-8')));

    // Gather all of the variables required for making the access token request.
    const redirectUri = format(instamap.redirectPattern, { redirectUri: `${req.protocol}://${req.get('host')}` });
    const { accessTokenUri, clientId } = instagram;
    const { code } = req.params;
    const clientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
    const grantType = 'authorization_code';

    // Make the request for the access token from the Instagram API.
    const params = stringify(decamelizeKeys({ clientSecret, grantType, redirectUri, clientId, code }));
    post(accessTokenUri, params).then(response => res.send(response.data))
                                .catch(err => res.status(403).send(JSON.stringify(err.response.data)));

});

/**
 * @method fetchData
 * @param {String} uriKey
 * @return {Function}
 */
const fetchDataFrom = uriKey => {

    return (req, res) => {

        const config = safeLoad(readFileSync('./.instamap.yml', 'utf-8'));

        // Gather all of the variables required for obtaining the user profile.
        const uri = camelizeKeys(config).instagram[uriKey];

        // Make the request for the user profile from the Instagram API.
        get(format(uri, req.params)).then(response => res.send(response.data.data))
                                    .catch(err => res.status(403).send(JSON.stringify(err.response.data)));

    };

};

app.get('/user/:userId/:accessToken', fetchDataFrom('userUri'));
app.get('/media/:userId/:accessToken', fetchDataFrom('mediaUri'));

app.get('/profile/:userId', (_, res) => {
    res.sendFile('index.html', { root: `public/${__dirname}` });
});

app.use(express.static(`${__dirname}/public`));

server.listen(process.env.PORT || 5000);
!isHeroku && opener('http://localhost:5000');
