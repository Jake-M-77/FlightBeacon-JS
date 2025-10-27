import { useState } from "react";


function SignupPage(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    function handleSignup(){
        if (password === confirmPassword) {
            console.log(username, password)
        }
        else
        {
            console.error('passwords dont match!')
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

            <label>
                Confirm Password:
                <input type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>

            <br />
            <button onClick={handleSignup}>SignUp</button>

    </div>
    
    
    
        </>)
}

export default SignupPage;