


function DataBox({ title, data }) {
    if (!data || data.length === 0) return <p>No data available</p>;

    return (
        <div className="DataBox">
            <h3>{title}</h3>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        {Object.entries(item).map(([key, value]) => (
                            <span key={key}><strong>{key}:</strong> {JSON.stringify(value)} | </span>
                        ))}
                    </li>
                ))}
            </ul>
        </div>
    );
}


export default DataBox;