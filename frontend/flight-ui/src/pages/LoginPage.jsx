import { useState } from "react";


function LoginPage(){


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    function handleLogin(){
        console.log(username, password);
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