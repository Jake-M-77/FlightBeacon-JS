function BoundingBoxBox({ data }) {
    if (!data || !data.states) return <p>No data available</p>;

    return (
        <div className="BoundingBoxBox">
            <h3>Bounding Box Data</h3>
            <p>Timestamp: {data.time}</p>
            <ul>
                {data.states.map((state, idx) => (
                    <li key={idx}>
                        ICAO24: {state[0]}, Callsign: {state[1]}, Lat: {state[6]}, Lon: {state[5]}
                        {/* pick whichever fields you want */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BoundingBoxBox;