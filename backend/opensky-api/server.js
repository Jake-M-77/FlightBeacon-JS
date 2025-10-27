import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174']

}));


app.post('/api/auth', async (req, res) => {
    const { clientId, clientSecret } = req.body;

    if (!clientId || !clientSecret) {
        return res.status(400).json({ error: 'Missing clientId or clientSecret'})
    }

    const formData = new URLSearchParams();
    formData.append('grant_type', 'client_credentials');
    formData.append('client_id', clientId);
    formData.append('client_secret', clientSecret);

    try {
        const response = await axios.post(
            'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token',
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        res.json({ token: response.data.access_token });
    } catch (error) {
        console.error('I blame dinnerbone!')
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to get token from Opensky' });
    }
});


app.get('/api/departures', async (req, res) => {
    const {airport, begin, end } = req.query;
    const token = req.headers.authorization?.split(' ')[1]

    if(!airport || !begin || !end) {
        return res.status(400).json({ error: 'Missing airport, being, or end parameters' });
    }

    if(!token) {
        return res.status(401).json({ error: 'Missing or invalid token' })
    }

    try {
        const response = await axios.get(`https://opensky-network.org/api/flights/departure`, {
            params: { airport, begin, end },
            headers: {Authorization: `Bearer ${token}`}
        });
        
        res.json(response.data);
    } catch (err){
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to feth departures from OpenSky' })
    }
});

app.get('/api/arrivals', async (req, res) => {
    const { airport, begin, end } = req.query;
    const token = req.headers.authorization?.split(' ')[1];

    if (!airport || !begin || !end) {
        return res.status(400).json({ error: 'Missing airport, begin, or end parameters' });
    }

    if (!token) {
        return res.status(401).json({ error: 'Missing or invalid token' });
    }

    try {
        const response = await axios.get(`https://opensky-network.org/api/flights/arrival`, {
            params: { airport, begin, end },
            headers: { Authorization: `Bearer ${token}` }
        });

        res.json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch arrivals from OpenSky' });
    }
});

app.get('/api/boundingbox', async (req, res) => {
    const { lamin, lomin, lamax, lomax } = req.query;

    if (!lamin || !lomin || !lamax || !lomax) {
        return res.status(400).json({ error: 'Missing bounding box parameters' });
    }

    try {
        const response = await axios.get('https://opensky-network.org/api/states/all', {
            params: { lamin, lomin, lamax, lomax },
        });

        res.json(response.data);
    } catch (err) {
        console.error('Error fetching bounding box data:', err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch bounding box data from OpenSky' });
    }
});


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });