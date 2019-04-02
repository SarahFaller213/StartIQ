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
    this.uid = undefined;
  }

  getCurrentUID() {
    return this.uid;
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);
   
  doSignOut = () => this.auth.signOut()
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);


  // *** User API ***


  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
  workspace = uid => this.db.ref(`workspace/${uid}`);
  profile = uid => this.db.ref(`users/${uid}/profile_info`);

  setAuthChangeHandler(handler) {
    this.auth.onAuthStateChanged(handler);
  }

  // ************************* SIGNUP API ***************************

  async signup(username, email, authUser) {
    await this.user(authUser.user.uid).set({ username, email });
    await this.putProfile("", "", "", authUser.user.uid);
    await this.workspace(authUser.user.uid).set({ username });
  }

  // ************************* PROFILE API ***************************
  putProfile(university, skill, degree, uid) {
    return this.profile(uid).set({
        university: university,
        skills: skill,
        degree: degree
    });
  }
  
  getProfile(uid) {
    return this.profile(uid).once('value').then(snapshot => snapshot.val());
  }

  // ************************* IDEA API ***************************
  putIdea(ideaText, uid) {
    return this.workspace(uid).push({
      idea: ideaText,
      created_at: Date.now()
    });
  }

  getIdea(uid) {
    return this.workspace(uid).once('value').then( data => {
        const workspaceData = data.val();
        delete workspaceData.username;
        return Object.entries(workspaceData);
    });
  }

  deleteIdea(uid, key) {
    return this.workspace(uid).child(key).remove();
  }
}

export default Firebase;