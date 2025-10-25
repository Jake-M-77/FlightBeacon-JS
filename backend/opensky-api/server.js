import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174']

}));


const CLIENT_ID = '';
const CLIENT_SECRET = '';

var formDataString = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;


app.get('/api/auth', async (req, res) => {

    try {
        const token = await axios.post('https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token',
            formDataString,
            {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            })

        console.log(token.data.access_token)
    }
    catch(error){
        console.error(error);
        res.status(500).json( {error: "I blame dinnerbone"} )
    }
    


});




const PORT = process.env.PORT || 3002;

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });