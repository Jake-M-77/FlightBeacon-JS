import { useState } from "react";
import './Arrivals.css';

function Arrivals() {

    const popularAirports = [
        { name: 'Select an airport', icao: "NULL" },
        { name: "London Heathrow", icao: "EGLL" },
        { name: "JFK", icao: "KJFK" },
        { name: "Frankfurt", icao: "EDDF" }
    ];

    const [selectedAiport, setSelectedAirport] = useState("");

    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");

    function toEpoch(datetimeString) {
        const date = new Date(datetimeString);
        return Math.floor(date.getTime() / 1000) - date.getTimezoneOffset() * 60;
    }

    function GetArrivals(airport, begin, end) {
        const epochbegin = toEpoch(begin);
        const epochend = toEpoch(end)

        console.log(epochbegin, epochend, airport)

    }





    return (
        <>
            <h2>Arrivals</h2>
            <p>API Limitation - Begin time and End time can only be a maximum of 2hours apart!</p>

            <div className="Arrivals-search-form">

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

                <button onClick={() => GetArrivals(selectedAiport, departureTime, arrivalTime)}>Get Arrivals</button>

                <p>{selectedAiport}</p>


            </div>



        </>
    )


}

export default Arrivals;
