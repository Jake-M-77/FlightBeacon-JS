import { useState } from "react";
import './Departures.css';
import { useUser } from "../Context/UserContext";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import DataBox from "../components/DataBox";

function Departures() {

    const { user } = useUser();
    const { token, saveToken } = useAuth();

    const [departureData, setDepartureData] = useState([]);


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
            return openSkyToken;
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

    const [selectedDepartureAirport, setSelectedAirport] = useState("");

    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");

    function toEpoch(datetimeString) {
        const date = new Date(datetimeString);
        return Math.floor(date.getTime() / 1000) - date.getTimezoneOffset() * 60;
    }

    async function GetDepartures(airport, begin, end) {
        const epochbegin = toEpoch(begin);
        const epochend = toEpoch(end)

        console.log(epochbegin, epochend, airport)

        let useToken = token;

        if (!token) {
            useToken = await fetchToken();

        }


        try {
            const response = await axios.get('http://localhost:3002/api/departures', {
                params: { airport, begin: epochbegin, end: epochend },
                headers: { Authorization: `Bearer ${useToken}` }
            });

            console.log('Departures Data:', response.data);
            setDepartureData(response.data);

        } catch (err) {
            console.error("Everything's going to plan. No, really, that was supposed to happen.")
            console.error('Error fetching departures:', err.response?.data || err.message);
        }

    }





    return (
        <>
            <h2>Departures</h2>

            <p>API Limitation - Begin time and End time can only be a maximum of 2hours apart!</p>

            <div className="Departure-search-form">

                <label>
                    Pick a departure airport:
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

                <button onClick={() => GetDepartures(selectedDepartureAirport, departureTime, arrivalTime)}>Get Departures</button>

                <p>{selectedDepartureAirport}</p>



            </div>

            <DataBox title="Departures" data={departureData} />




        </>
    )



}

export default Departures;