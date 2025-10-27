import { Outlet, Link } from "react-router-dom";
import './SearchPanel.css';

function SearchPanel() {

    return (<>

        <h1>Search Panel</h1>


        <nav className="search-panel-nav">
            <ul className="navbar-links">
                <li><Link to="departures">Departures</Link></li>
                <li><Link to="arrivals">Arrivals</Link></li>
                <li><Link to="boundingbox">Bounding Box</Link></li>
            </ul>

        </nav>


        <Outlet />



    </>)
}

export default SearchPanel;