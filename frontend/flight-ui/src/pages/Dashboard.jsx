import { useState } from "react";
import { useUser } from "../Context/UserContext";
import { useEffect } from "react";


function Dashboard(){

    const { user } = useUser();
    const [clientId, setClientId] = useState('');
    const [clientSecret, setClientSecret] = useState('');


    useEffect(() => {
        if(!user) return;


        fetch(`http://localhost:3000/api/user/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setClientId(data.clientId || '');
                setClientSecret(data.clientSecret || '');
            })
            .catch(err => console.error(err));


    }, [user])

    const handleSave = () => {
        fetch(`http://localhost:3000/api/user/${user.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({ clientId, clientSecret })
        })
        .then(res => res.json())
        .then(data => console.log('Updated', data))
        .catch(err => console.error(err));
    };

    if(!user) return <p>Please either login, if logged in wait for dahsboard to load!</p>






    return(<div>

        <h2>Dashboard</h2>
        <p>Username: {user.username}</p>
        <p>ID: {user.id}</p>

        <label>
            Client ID:
            <input value={clientId} onChange={(e) => setClientId(e.target.value)} />
        </label>

        <label>
            Client Secret:
            <input value={clientSecret} onChange={(e) => setClientSecret(e.target.value)} />
        </label>
        <br />

        <button onClick={handleSave}>Save</button>
        

    </div>)
}

export default Dashboard;