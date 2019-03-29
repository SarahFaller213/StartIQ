
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';



const config = {
	apiKey: "AIzaSyAVECqNN0d56XtII2jWGeyRJ9sGqD1eqMo",
    authDomain: "startiq-a16e5.firebaseapp.com",
    databaseURL:"https://startiq-a16e5.firebaseio.com",
    projectId: "startiq-a16e5",
    storageBucket: "startiq-a16e5.appspot.com",
    messagingSenderId: "863881277059"
};


class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();

  }
  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
   doSignOut = () => this.auth.signOut();
   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
   doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
}

export default Firebase;