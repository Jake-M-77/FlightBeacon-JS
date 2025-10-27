import { useState } from 'react';
import './BoundingBox.css';
import { useUser } from "../Context/UserContext";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import DataBox from '../components/DataBox';
import BoundingBoxBox from '../components/BoundingBoxBox';

function BoundingBox() {


    const { user } = useUser();
    const { token, saveToken } = useAuth();

    const [boundingBoxData, setBoundingBoxData] = useState([]);


    async function fetchToken() {
        if (!user) {
            return console.error('Please sign in!')
        }

        try {
            const userResponse = await axios.get(`http://localhost:3000/api/user/${user.id}`);
            const { clientId, clientSecret } = userResponse.data;

            const authResponse = await axios.post('http://localhost:3002/api/auth', { clientId, clientSecret });
            const openSkyToken = authResponse.data.token;

            saveToken(openSkyToken);
        } catch (err) {
            console.error('Error fetching token', err);
        }
    }


    const regions = {
        UK: { LatMin: 49.9, LatMax: 60.85, LonMin: -8.62, LonMax: 1.77 },
        US: { LatMin: 24.39630, LatMax: 49.384358, LonMin: -125.0, LonMax: -66.93457 },
        EU: { LatMin: 35.0, LatMax: 71.0, LonMin: -10.0, LonMax: 40.0 },
        ASIA: { LatMin: -10.0, LatMax: 80.0, LonMin: 60.0, LonMax: 150.0 },
    }

    const [selectedRegion, setSelectedRegion] = useState("");


    async function GetFlightData() {
        const test = Object.values(regions[selectedRegion]);
        const { LatMin, LatMax, LonMin, LonMax } = regions[selectedRegion];
        console.log(test);
        console.log(LatMin)


        if (!token) {
            await fetchToken();
        }

        try {
            const response = await axios.get('http://localhost:3002/api/boundingbox', {
                params: { lamin: LatMin, lomin: LonMin, lamax: LatMax, lomax: LonMax },
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log('Bounding Box Flight Data:', response.data);
            setBoundingBoxData(response.data);

        } catch (err) {
            console.error('Error fetching flight data:', err.response?.data || err.message);
        }


    }

    return (<>


        <h2>Bounding Box</h2>


        <div>
            <label>
                Pick a region:
                <select name="regions" onChange={(e) => setSelectedRegion(e.target.value)} >
                    {Object.keys(regions).map(region => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>

            </label>


            <button onClick={GetFlightData} className="BoundingBox-Button">Get flight data</button>
        </div>
        
        <BoundingBoxBox data={boundingBoxData} />




    </>)
}

export default BoundingBox;