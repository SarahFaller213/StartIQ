import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDoqABBcwvXDdxMhdY_4nmLiPpBX_8YwVw",
  authDomain: "startiq.firebaseapp.com",
  databaseURL: "https://startiq.firebaseio.com",
  projectId: "startiq",
  storageBucket: "startiq.appspot.com",
  messagingSenderId: "617875093373"
};


class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }


  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
   
  doSignOut = () => this.auth.signOut()
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password =>
  this.auth.currentUser.updatePassword(password);


  // *** User API ***


  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
  workspace = uid => this.db.ref(`workspace/${uid}`);

  setupAuthChangeHandler(handler) {
    this.auth.onAuthStateChanged(handler);
  }


  putProfile(school, skill, degree, uid) {
    this.db.ref(`users/${uid}/`).child("profile_info").set({
        school: school,
        skills: skill,
        degree: degree
    }).then((data) => {
          //success callback
          console.log('data ', data)
    }).catch((error) => {
          //error callback
          console.log('error ', error)
    })
  }


  //For Database of Ideas- Workspace
  //Write idea onto Database
  putIdea(ideaText, uid) {
    this.db.ref(`workspace/${uid}`).push({
      idea: ideaText,
      created_at: Math.floor(Date.now() / 1000)
    })
    .then((data) => {
        //success callback
        console.log('data ', data)
    }).catch((error) => {
        //error callback
        console.log('error ', error)
    });
  }

  //Read Ideas from Database
  //Still fixing now
  getIdea(uid) {
    return this.db.ref(`workspace/${uid}`)
      .once('value').then( data => {
        const workspaceData = data.val();
        delete workspaceData.username;
        return Object.values(workspaceData).map(entry => entry.idea);
      });
  }
}

export default Firebase;