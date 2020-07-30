/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import QRCode from 'qrcode.react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import jwt from 'jsonwebtoken';
import './styles.css';

firebase.initializeApp({
  apiKey: 'AIzaSyDmPjbRFqvwZqgc_STGMwz_N3dQMzB9IPc',
  authDomain: 'app-authentication-gg.firebaseapp.com',
  databaseURL: 'https://app-authentication-gg.firebaseio.com',
  projectId: 'app-authentication-gg',
  storageBucket: 'app-authentication-gg.appspot.com',
  messagingSenderId: '851528300911',
  appId: '1:851528300911:web:1ced44b39024ffe9a0509a',
  measurementId: 'G-1EJY8DF5WR',
});

class HomePage extends React.Component {
  state = { isSignedIn: false, user: '', token: '' };
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };
  generateToken = () => {
    if (this.state.isSignedIn) {
      const token = jwt.sign(
        {
          email: this.state.user.email,
          displayName: this.state.user.displayName,
          licenseNo: '49-M1 03385',
          brand: 'Nouvo',
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + 60,
        },
        'secret',
      );
      this.setState({
        token: token,
      });
    }
    console.log(this.state.token);
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log('user', user);
      this.setState({ user: user });
      this.generateToken();
    });
  };
  render() {
    return (
      <div className="App ">
        {this.state.isSignedIn ? (
          <div className="container">
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
            <img
              alt="profile picture"
              src={firebase.auth().currentUser.photoURL}
            />
            <button onClick={this.generateToken}>Refresh QR</button>
            {/* <h2>{firebase.auth().currentUser.refreshToken}</h2> */}
            <QRCode
              value={this.state.token}
              size={400}
              style={{ margin: 100 }}
            />
            {this.state.token}
          </div>
        ) : (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    );
  }
}
export default HomePage;
