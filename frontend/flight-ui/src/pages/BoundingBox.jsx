import { useState } from 'react';
import './BoundingBox.css';

function BoundingBox(){

        const regions = {
            UK: { LatMin : 49.9, LatMax : 60.85, LonMin : -8.62, LonMax : 1.77 },
            US: { LatMin : 24.39630, LatMax : 49.384358, LonMin : -125.0, LonMax : -66.93457 },
            EU: { LatMin : 35.0, LatMax : 71.0, LonMin : -10.0, LonMax : 40.0 },
            ASIA: { LatMin : -10.0, LatMax : 80.0, LonMin : 60.0, LonMax : 150.0 },
        }

        const [selectedRegion, setSelectedRegion] = useState("");


        function GetFlightData(){
            const test = Object.values(regions[selectedRegion]);
            const { LatMin, LatMax, LonMin, LonMax } = regions[selectedRegion];
            // const test = regions[selectedRegion]
            console.log(test);
            console.log(LatMin)
        }

    return(<>

    
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
    
        </>)
}

export default BoundingBox;