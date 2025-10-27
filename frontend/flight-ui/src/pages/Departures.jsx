import { useState } from "react";
import './Departures.css';

function Departures() {

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

    function GetDepartures(airport, begin, end) {
        const epochbegin = toEpoch(begin);
        const epochend = toEpoch(end)

        console.log(epochbegin, epochend, airport)

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



        </>
    )



}

export default Departures;