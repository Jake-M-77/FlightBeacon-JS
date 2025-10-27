import { useState } from "react";
import './Arrivals.css';
import { useUser } from "../Context/UserContext";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import DataBox from "../components/DataBox";

function Arrivals() {


    const { user } = useUser();
    const { token, saveToken } = useAuth();

    const [arrivalData, setArrivalData] = useState([]);


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





    const popularAirports = [
        { name: 'Select an airport', icao: "NULL" },
        { name: "London Heathrow", icao: "EGLL" },
        { name: "JFK", icao: "KJFK" },
        { name: "Frankfurt", icao: "EDDF" }
    ];

    const [selectedAirport, setSelectedAirport] = useState("");

    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");

    function toEpoch(datetimeString) {
        const date = new Date(datetimeString);
        return Math.floor(date.getTime() / 1000) - date.getTimezoneOffset() * 60;
    }

    async function GetArrivals(airport, begin, end) {
        const epochbegin = toEpoch(begin);
        const epochend = toEpoch(end)

        console.log(epochbegin, epochend, airport)

        if (!token) {
            await fetchToken();
        }

        try {
            const response = await axios.get('http://localhost:3002/api/arrivals', {
                params: { airport, begin: epochbegin, end: epochend },
                headers: { Authorization: `Bearer ${token}` }

            });

            console.log('Arrivals Data:', response.data);
            setArrivalData(response.data);

        } catch (err) {
            console.error('My bad')
            console.error('Error fetching departures:', err.response?.data || err.message);
        }
    }







    return (
        <>
            <h2>Arrivals</h2>
            <p>API Limitation - Begin time and End time can only be a maximum of 2hours apart!</p>

            <div className="Arrivals-search-form">

                <label>
                    Pick an arrival airport:
                    <select name="departure" onChange={(e) => setSelectedAirport(e.target.value)}>
                        {popularAirports.map(airport => (
                            <option key={airport.icao} value={airport.icao}>{airport.name}</option>
                        ))}
                    </select>

                </label>

                <label>
                    Begin Time:
                    <input
                        type="datetime-local"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                    />
                </label>

                <label>
                    End Time:
                    <input
                        type="datetime-local"
                        value={arrivalTime}
                        //code a way of limiting time to and from as 2hours
                        onChange={(e) => setArrivalTime(e.target.value)}
                    />
                </label>

                <button onClick={() => GetArrivals(selectedAirport, departureTime, arrivalTime)}>Get Arrivals</button>

                <p>{selectedAirport}</p>




            </div>

            <DataBox title="Arrivals" data={arrivalData} />




        </>
    )


}

export default Arrivals;
