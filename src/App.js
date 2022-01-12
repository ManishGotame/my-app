// import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import app from "./utils/fire";

import { getAuth, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail} from "firebase/auth";

const auth = getAuth(app);

// class Login2 extends Component {
//   render() {
//     return(
//       <h1> Login page </h1>
//     ); 
//   }
// }

class Home extends Component {
  render() {
    return(
      <h1> Home page </h1>
    ); 
  }
}


class App extends Component {
  render() {
    return(
      <Router> 
        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          <Route exact path='/login' element={< Login />}></Route>
        </Routes>
      </Router>
    ); 
  }
}



// var auth = app.auth(); 

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      name: "",
      message: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.verify = this.verify.bind(this);
  }

  componentDidMount() {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      console.log("sign in link validated");

      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          console.log("hello bomb boi");
          this.setState({
            value: window.localStorage.getItem('emailForSignIn'),
            name: window.localStorage.getItem('fullName')
          });


          console.log(auth);

          window.localStorage.removeItem('emailForSignIn');
          window.localStorage.removeItem('fullName');
           
           
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    } 
  }


  verify(event) {
    event.preventDefault();

    const actionCodeSettings = {
        url: "http://localhost:3000/login",
        handleCodeInApp: true,
      }

    var email = this.state.value;
    var name = this.state.name;

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        window.localStorage.setItem('fullName', name);
        
        this.setState({
          message: "Email link has been sent. Please Check your email"
        });
      }) 
      .catch((error) => {
        console.log(error);
        
        this.setState({
          message: "An error has occurred. Incorrect Email."
        });

      });
  }



  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('An email confirmation is sent: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <h1> Firebase Login </h1>

        <h3> Name : {this.state.name} </h3>
        <h3> Email : {this.state.value} </h3>


        <form onSubmit={this.verify}>
          <label>
            Email : 
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Login" />
        </form>
        <h4> {this.state.message}</h4>
      </div>

    );
  }
}


export default App;
