import React, { useState } from 'react';
import './Login.css'
import { GoogleAuthProvider, getAuth, signInWithPopup, GithubAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import initializeFirebase from '../Firebase/firebase.init';

initializeFirebase();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const Login = () => {
    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState({});

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        
        if (e.target.value.length < 6) {
            setError('Minimum password length is 6 character');
        }
        else {
            setPassword(e.target.value);
            setError('');
        }
    };

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
        .then (result => {
            const {displayName, email, photoURL } = result.user;
            
            const userInfo = {
                name: displayName,
                email: email,
                photo: photoURL,
            };
            setUser(userInfo);
        });
    };

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
        .then (result => {
            const {displayName, email, photoURL} = result.user;

            const userInfo = {
                name: displayName,
                email: email,
                photo: photoURL,
            };
            setUser(userInfo);
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
            const {displayName, email, photoURL } = result.user;
            
            const userInfo = {
                name: displayName,
                email: email,
                photo: photoURL,
            };
            setUser(userInfo);
            setError('');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
        });
    };


    const handleReset = () => {
        sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setError(errorMessage);
    // ..
  });
    }
    return (
        <div>
            <div className="login-box">
                <div className="login">
                    <div className="login-box">
                        <h2 className="text-info">Please Login</h2>
                        <form onSubmit={handleLogin}>
                            <p className="text-danger">{error}</p>
                        <input
                        onChange={handleEmailChange}
                            className="input-felid border-0 border-bottom text-center mt-2"
                            type="email"
                            name="email"
                            placeholder="Enter your Email"
                        />
                        <br />
                        <input
                            onChange={handlePasswordChange}
                            className="input-felid border-0 border-bottom text-center mt-2"
                            type="password"
                            name="password"
                            placeholder="Enter your Password"
                        />
                        <br />
                        <button className="mt-3 btn btn-success ps-3 pe-3 me-2">Login</button>
                        <button onClick={handleReset} className="mt-3 btn btn-danger ps-3 pe-3">Reset Password</button>
                        </form>
                    </div>
                    <button onClick={handleGoogleSignIn} className="me-2 mt-5" >
                    <img className="w-25" src="https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-google-social-media-justicon-flat-justicon.png"/> Login with Google
                    </button>
                    <button onClick={handleGithubSignIn} className="me-2 mt-2" >
                    <img className="w-35" src="https://img.icons8.com/ios-filled/50/000000/github.png"/> Login with Github
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Login;