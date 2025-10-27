import { useState } from "react";


function SignupPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    async function handleSignup() {

        if (password !== confirmPassword) {
            console.error('passwords dont match!')
            return;
        }

        try {
            const res = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password})
            });

            if(!res.ok){
                const errorText = await res.text();
                console.error('Signup failed', errorText);
                return;
            }

            const data = await res.json();
            console.log('User Created', data);
        }
        catch (err) {
            console.error('Network or parsing error:', err);
        }
    }


    return (<>

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