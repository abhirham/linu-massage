const express = require('express');
const cors = require('cors');
const { getAuth } = require('firebase-admin/auth');

const firebaseConfig = {
    type: 'service_account',
    project_id: 'healing-touch-spa',
    private_key_id: 'e7c8f0d5b05da135519c50cdd324120bb192c2e2',
    private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDVzfHYT4WopHhT\n+s0uTJ4LUApjgBgi8BSx26boptdRCK5RqtgcBT6pmsyXt47TalAjHzOsvQcn8gI1\ncK1nfhRcq97bjzXw6Lea4rXrGHEIHPAPgPtSgibYy2dW6/XEtoasGjUKEoDaK/EH\nbKoVQ45bPOdsBZhRrF29LJiDH+Edy3mtLlGaleQ8LIVlDUP7QDxG5cXZjQaL7NLu\nbhPqZNebOZHqt6MxJl37vyIGE3IZLvucgU83B7EUmQJU/+j/czZLcfYHMd2UNs4T\n7Uf0o3qVFiYMv7cGzppArWSkAUSQH2k6iEHzkf3iYcQuhh8yf3gD3QOu+hHbPKf7\nvmV5R30rAgMBAAECggEAF9JYbed+VunsVj8NeWkj+tKyNZ/iEJJ7W83DbQyZ1PeI\npKTKa2TSNIeA4C6dhUTFJQSm90ogb/zw7g9d4rgTgLfNntz3/52OR32XE1inz2Wa\nAcA3QFwsA9+15eNogMBthONuoW6qWKSouFENKk1aoSPKDSkabY8s6pT7cTCuHmmH\nRM45DA0A0S36+ghIwfMR1JNIJHmEhAT0b9MGAICkB29BmjSY+SVzqkuksZBA8sDV\nIk14ZKkWd55KxvrSwy7ZBWmhqUddVaFe8z30E6RDZI17aFgn85Mx86SLgBEn2JQU\n1tuPR3AwEovY95307L+OgZZwG6rCgaJRGb68WcFu4QKBgQDqVY7qYuD7dbMPUUpU\n6M1Hv8A4gRrOiSq8Smy0iU4z1Fp45c/nN8YZE+vXPl04ISFV5enLTjdaNKt8SZGG\n/+EwCYj/bFHGjV0h91OItBCqp1D09N0v2fqvoxwmQu7xEVe1dZeS6YRlyo5Am9NZ\nRGb4qIqz4PmYtheZxwRSQFm7MwKBgQDpkngkdLUW1hUv9X8aL7G343PrK+7scKa5\n/N0Owqt7LQ7htxFF1avT4nNWGM4MbV43csRLz4T+SozjL8QlWKI26PpQmrL7k2lk\ntdiqpt0H2qrmJLtSYsc94tOI9oopFVNTvsF9XGPbK4g5ejHgsLnLZPb1fUQPiK7h\nm+A3PuV2KQKBgDAT2byRCOPOpCwyW3PMR8G+v6tYIa3aSqBTDLaFrTvJB77iN6OS\nt9wRUEPbEbkgYvyCrVL++zBQuhZH6cmu2f7HFgqBqM1512/OlJ7pgrngliWLz42v\nxVUfu/jFpsxi6IHcXHrR2k4gHst2rQgVlqLRwZNiRxNj2Le+M07E0SQtAoGAJU+t\ne31dNDGsnsWjsSYvSIXADbAt8X0pVQqMsX/tbrbK6smYq8QvN6Cz9evudlO+OjNO\nIiIbR5fXG6+UsLaQ6x6aZefgcYmhy2G1I8WWB1wp8qupdMastzkVu4pOlbN/ZSBS\nvljU5rz0fOIFN7RjaZdOT/bbuXOHJCkHTyvv8ckCgYBIbCvzJNfqdvSmDkx4a7i8\nFUDRqpynPAY8ktBlQQap8JMp7mal2jI2O8GVKgFZdW4BPo9dXkrzUoS6gV22XTRs\nnN9IiTHwR/PpqKwweJLodIoTrKlkE8ZEteQsXSxzhQMupvJ6E9DKhVGOBrCxqyel\nRPerW4YXAxe95+xh8XOJ2g==\n-----END PRIVATE KEY-----\n',
    client_email:
        'firebase-adminsdk-jll1s@healing-touch-spa.iam.gserviceaccount.com',
    client_id: '109279398344092402876',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jll1s%40healing-touch-spa.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
};

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig), // Use your firebaseConfig here
});

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

const router = express.Router();
router.post('/makeAdmin', async (req, res) => {
    console.log(req.body);
    await getAuth().setCustomUserClaims(req.body.uid, {
        admin: true,
    });
    res.end(
        JSON.stringify({
            status: 'success',
        })
    );
});

app.use(router);

const port = 8080;

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});
