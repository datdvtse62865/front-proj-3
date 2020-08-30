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
import Webcam from 'react-webcam';
import QuickEncrypt from 'quick-encrypt';

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
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      user: '',
      token: '',
      videoConstraints: {
        width: 1280,
        height: 1280,
        facingMode: { exact: "environment" },
        // facingMode: 'user',
      },
      licensePlate: '',
      imgSrc: '',
    };
  }
  setRef = webcam => {
    this.webcam = webcam;
  };
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccess: () => false,
    },
  };
  generateToken = () => {
    if (this.state.isSignedIn && this.state.licensePlate != '') {
      const data = {
        licenseNo: this.state.licensePlate,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 280,
      };
      let keys = QuickEncrypt.generate(1024);
      const publicKey = keys.public;
      const privateKey = keys.private;
      let encryptedText = QuickEncrypt.encrypt(JSON.stringify(data), publicKey)

      // const token = jwt.sign(
      //   {
      //     email: this.state.user.email,
      //     displayName: this.state.user.displayName,
      //     licenseNo: this.state.licensePlate,
      //     brand: 'Nouvo',
      //     iat: Math.floor(Date.now() / 1000) - 30,
      //     exp: Math.floor(Date.now() / 1000) + 280,
      //   },
      //   'secret',
      // );
      const token ={
        uid: this.state.user.uid,
        encrypt: encryptedText,
      }
      firebase
        .database()
        .ref('users/' + this.state.user.uid)
        .set({
          email: this.state.user.email,
          displayName: this.state.user.displayName,
          licenseNo: this.state.licensePlate,
          brand: 'Nouvo',
          privateKey:privateKey,
        });
      this.setState({
        token: JSON.stringify(token),
      });
    }
    console.log(this.state.token);
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user });
      console.log('user', user);
      this.setState({ user: user });
      // this.generateToken();
    });

    // firebase.database().ref('users/'+)
  };

  onHandleChange = event => {
    var target = event.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };
  demo = async () => {
    console.log(this.state.user.email);
    //  firebase.database().ref("users/"+this.state.user.uid+"/publicKey").set({
    //    username:this.state.user.email,
    //  })
    firebase
      .database()
      .ref('/users/' + this.state.user.uid)
      .once('value')
      .then(function(snapshot) {
        var username =
          (snapshot.val() && snapshot.val().username) || 'Anonymous';
        console.log(username);
      });
  };
  capture = async () => {
    const imageSrc = this.webcam.getScreenshot();
    this.setState({ imgSrc: imageSrc });
    const imageStr = imageSrc.slice(22);
    let body = JSON.stringify({
      requests: [
        {
          image: {
            content: imageStr,
          },
          features: [
            { type: 'TEXT_DETECTION', maxResults: '50' },
            { type: 'OBJECT_LOCALIZATION', maxResults: '50' },
          ],
        },
      ],
    });
    let response = await fetch(
      'https://vision.googleapis.com/v1/images:annotate?key=' +
        'AIzaSyBPWFQyVQrljS9VuKuKceA3RGWRy_frK1o',
      {
        method: 'post',
        body: body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(data => {
        const responses = data.responses;
        console.log(responses);
        if (responses) {
          const licenseText = responses[0].fullTextAnnotation.text;
          if (licenseText) {
            this.setState({
              licensePlate: licenseText.replace('\n', ' '),
            });
          } else {
            console.log('Not Found');
          }
        } else {
          console.log('Not Found');
        }
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
            <div className="form-img">
              <img
                alt="profile picture"
                src={firebase.auth().currentUser.photoURL}
              />
              <img src={this.state.imgSrc} />
            </div>

            {/* <h2>{firebase.auth().currentUser.refreshToken}</h2> */}

            <Webcam
              audio={false}
              height={350}
              ref={this.setRef}
              screenshotFormat="image/png"
              width={350}
              videoConstraints={this.state.videoConstraints}
            />
            <label>License Plate:</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              name="licensePlate"
              onChange={this.onHandleChange}
              value={this.state.licensePlate}
            />
            <div className="form-button">
              <button onClick={this.capture}>Capture photo</button>
              <button onClick={this.generateToken}>Generate QR</button>
              <button onClick={this.demo}>Demo</button>
            </div>
            {this.state.token != '' ? (
              <QRCode
                value={this.state.token}
                size={400}
                style={{ margin: 100 }}
              />
            ) : (
              ''
            )}

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
