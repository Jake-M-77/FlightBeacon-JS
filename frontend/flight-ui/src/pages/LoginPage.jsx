import { useState } from "react";
import { useUser } from "../Context/UserContext";


function LoginPage(){

    const { login } = useUser();


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    async function handleLogin(){
        console.log(username, password);

        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password})
            });

            if(!res.ok){
                const errorText = await res.text();
                console.error('Login failed', errorText);
                return;
            }

            const data = await res.json();

            login({ id: data.user.id, username: data.user.username });

            console.log('User Logged in', data);


            
        }
        catch (err) {
            console.error('Network or parsing error:', err);
        }

}

    
    
        return(<>
    
        <div>
    
            <label>
                Username:
                <input type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}

                />
            </label>

            <label>
                Password:
                <input type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>

            <br />
            <button onClick={handleLogin}>Login</button>
    
        </div>
        
        
        
            </>)
}

export default LoginPage;