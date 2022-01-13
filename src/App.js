// import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import app from "./utils/fire";
// import axios from "axios";


// import { getFunctions, connectFunctionsEmulator, httpsCallable } from "firebase/functions";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail} from "firebase/auth";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification} from "firebase/auth";
import { updateProfile, signOut, sendPasswordResetEmail } from "firebase/auth";


var auth = getAuth(app);
// const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "localhost", 5001);

// class Login2 extends Component {
//   render() {
//     return(
//       <h1> Login page </h1>
//     ); 
//   }
// }

// get response api key = noj65s3uv7l3lxbobdexg4fm94cr6895

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
      name: "",
      email: "",
      password: "",
      message: "",
      passwordMatch: false,
      user: null,
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    


    this.verify = this.verify.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logOut = this.logOut.bind(this);
    this.logIn= this.logIn.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
  }


  componentDidMount() {

    // checks if the user is logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        var uid = user.uid;
        var emailVerified = user.emailVerified;
          
        if (emailVerified === true) {
            this.setState({
              user: user
            });
        } else {
          this.setState({
            message: "Verify your email first"
          });
        } 
      } else {
        console.log("not signed in");
      }
    });
  }


  verify(event) {
    event.preventDefault();

    const actionCodeSettings = {
        // url: "http://localhost:3000/login",
        url: "https://learning-b9c03.web.app/login",
        handleCodeInApp: true,
      }

    var email = this.state.value;
    var name = this.state.name;

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem('emailForSignIn', email);
        window.localStorage.setItem('fullName', name);
        
        this.setState({
          message: "Email link has been sent. Please Check your mail."
        });
      }) 
      .catch((error) => {
        console.log(error);
        
        this.setState({
          message: "An error has occurred. Incorrect Email."
        });

      });
  }


  signUp(event) {
    event.preventDefault();
      
    // if (this.state.passwordMatch === true) {
    if (true) {
      var {name, email, password} = this.state;
      console.log(name, email, password);

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // update profile name
          updateProfile(auth.currentUser, {
            displayName: name
          }).then(() => {
            // Profile updated!
            // ...
          }).catch((error) => {
            console.log(error);
          });


          // send email for verification
          sendEmailVerification(auth.currentUser)
            .then(() => {
              this.setState({
                message: "Email verification sent"
              });
            }); 
        })
        .catch((error) => {
          this.setState({
            message: error.message
          });
          console.log(error);
        });
    } 
  }

  logIn(event) {
    event.preventDefault();
    console.log("login");

    var {email, password} = this.state;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.setState({
          user: userCredential.user
        });
      })
      .catch((error) => {
        this.setState({
          message: error.message 
        });
        console.log(error);
      });
  }

  forgotPassword(event) {
    event.preventDefault();

    var {email} = this.state;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        this.setState({
          message: "Reset Link has been sent to your email"
        });
      })
      .catch((error) => {
        this.setState({
          message: error.message
        });
        console.log(error);
      });

  }

  logOut(event) {
    signOut(auth).then(() => {
      this.setState({
        user: null
      });
    }).catch((error) => {
        this.setState({
          message: error
        });
    });
  }


  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleConfirmPasswordChange(event) {
    if (this.state.password !== event.target.value) {
      this.setState({ message: "Passwords do not match" });
    } else {
      this.setState({ message: "Passwords match" });
    }
  }


  render() {
    if (this.state.user !== null) {
      return(
          <div>
            <button onClick={this.logOut}>LogOut: {this.state.user.displayName} </button>
            <h4> {this.state.message}</h4>
          </div>
      );
    } 

    return (
      <div className="App">
        <h1> Firebase Login </h1>

        <h3> LOGIN </h3>
        <form onSubmit={this.logIn}>
          <label>
            <br/>Email: 
            <input type="text"  onChange={this.handleEmailChange} />
            <br/>Password: 
            <input type="text" onChange={this.handlePasswordChange} />
          </label> <br/> 
          <input type="submit" value="Login" />
        </form>

        <button onClick={this.forgotPassword}> Forgot Password </button>

        <br/>
        <br/>
        <br/>
        <br/>


        <h3> SIGNUP </h3>
        <form onSubmit={this.signUp}>
          <label>
            Name: 
            <input type="text"  onChange={this.handleNameChange} />
            <br/>Email: 
            <input type="text"  onChange={this.handleEmailChange} />
            <br/>Password: 
            <input type="text" onChange={this.handlePasswordChange} />
            <br/>Confirm Password: 
            <input type="text" onChange={this.handleConfirmPasswordChange} />
          </label> <br/> 
          <input type="submit" value="SignUp" />
        </form>
        <h4> {this.state.message}</h4>
      </div>

    );
  }
}


export default App;
