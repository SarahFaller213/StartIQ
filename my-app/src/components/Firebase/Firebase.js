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


  //For Database of Ideas- Workspace
  //Write idea onto Database
  putIdea(ideaText) {
    //Each idea contains its created data, idea Text
    this.auth.onAuthStateChanged((user) => { //OnAuthStateChanged - Activated if the user logged in, it can gives user authentication info
      this.db.ref(`workspace/${user.uid}`).push({
        idea: ideaText,
        created_at: Math.floor(Date.now() / 1000)
      })
      .then((data) => {
          //success callback
          console.log('data ', data)
      }).catch((error) => {
          //error callback
          console.log('error ', error)
      })

    })
  }

  //Read Ideas from Database
  getIdea() {
    return this.auth.onAuthStateChanged((user) => {
      this.db.ref(`workspace/${user.uid}`)
      .once('value').then( data => {
        data.forEach(d => { 
            // console.log(d.val())
            d.val();
          })
        });
      });
    }
  }
export default Firebase;