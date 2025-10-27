import Box from "../components/Box";
import './Home.css';

function Home(){

    return(<>
    
    <div className="title"> --= Home Page =--</div>

        <div className="home-container">
            <Box title="Welcome to FlightBeacon" description="A Webapp, that allows you to Track live flights" />
            <Box title="Search Panel" description="Search for flights, airports, and more." />
            <Box title="Login" description="Sign up or login to access the dashboard" />
            <Box title="Dashboard" description="Manage Account, OpenskyAPI connection, etc" />
        </div>
        

    </>)
}

export default Home;