import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login&Register/Login';
import initializeFirebase from './Firebase/firebase.init';
import Register from './Login&Register/Register';
import { useState } from 'react';

initializeFirebase();

function App() {
  
  const [toggle, setToggle] = useState(false);
  console.log(toggle);

  return (
    <div className="App">
      <div className="row">
          <div className="col-md-6">
            <div className="img mt-5">
              <img className="image-fluid w-75 mt-5 rounded-3 shadow p-3 mb-5 bg-body rounded" src="https://i.ibb.co/SwZfW72/login-form-img.jpg" alt="" />
            </div>
          </div>
          <div className="login-area col-md-6 mt-5 pt-5">

          {toggle ? <Login></Login> :
          <Register></Register>}

          {toggle ? <div onClick={() => setToggle(false)} className="text-primary mt-5">Are you new? Please register</div> :
          <div onClick = {() => setToggle(true)} className="text-primary mt-2">Already have an account? Please click here</div>}
        </div>
        
      </div>
    </div>
  );
}

export default App;
