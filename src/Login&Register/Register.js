import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import initializeFirebase from '../Firebase/firebase.init';

initializeFirebase();

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const auth = getAuth();
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        
        if (e.target.value.length < 6) {
            console.error('Minimum password length is 6 character');
        }
        else {
            setPassword(e.target.value);
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then (result => {
            const {displayName, email, photoURL } = result.user;
            
            const userInfo = {
                name: displayName,
                email: email,
                photo: photoURL,
            };
            setUser(userInfo);
            verifyEmail(email);
        })
        .catch (error => {
            console.log(error.message);
        })
    }

    const verifyEmail = (email) => {
        sendEmailVerification(auth.email)
        .then(() => {
            // Email verification sent!
            // ...
        });
    }

    return (
        <div>
            <div className="login-box">
                <div className="login">
                    <div className="login-box">
                        <h2 className="text-info">Please Register</h2>
                        <form onSubmit={handleRegister}>
                        <input
                            onChange = {handleEmailChange}
                            className="input-felid border-0 border-bottom text-center mt-2"
                            type="email"
                            name="email"
                            placeholder="Enter your Email"
                            required
                        />
                        <br />
                        <input
                            onChange = {handlePasswordChange}
                            className="input-felid border-0 border-bottom text-center mt-2"
                            type="password"
                            name="password"
                            placeholder="Enter your Password"
                            required
                        />
                        <br />
                        <button className="mt-3 btn btn-success ps-3 pe-3 me-2">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;