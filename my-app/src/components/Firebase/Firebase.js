import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

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
    this.storage = app.storage();
    this.googleProvider = new app.auth.GoogleAuthProvider();

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

    // *** User API *** GOOGLE 
 
  doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);


  // *** User API ***


  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
  workspace = uid => this.db.ref(`workspace/${uid}`);
  fileStorage = uid => this.storage.ref(`files/${uid}`);
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
  putProfile(university, skill, degree, industries, roles, uid) {
    return this.profile(uid).set({
        university: university,
        skills: skill,
        degree: degree,
        industries: industries,
        roles: roles,
    });
  }
  
  getProfile(uid) {
    return this.profile(uid).once('value').then(snapshot => snapshot.val());
  }

  // ************************* IDEA API ***************************
  putIdea(ideaText, uid, attachments) {
    return this.workspace(uid).push({
      idea: ideaText,
      created_at: Date.now(),
      attachments: attachments
    });
  }


  getIdea(uid) {
    return this.workspace(uid).once('value').then( data => {
        const workspaceData = data.val();
        delete workspaceData.username;
        return Object.entries(workspaceData);
    });
  }

  getCreator(uid) {
    return this.workspace(uid).once('value').then(data => {
      const workspaceData = data.val();
      return workspaceData.username;
    })
  }

  deleteIdea(uid, key) {
    return this.workspace(uid).child(key).remove();
  }

  uploadFile(uid, file) {
    return this.fileStorage(uid).child(file.name+Date.now()).put(file);
  }

  uploadFiles(uid, files) {
    // the array returned from file input isn't really a array so...
    let fileArray = [];
    for(let i = 0 ; i < files.length ; i ++) {
      fileArray.push(files[i]);
    }
    
    return Promise.all(
      fileArray.map(file => 
        this.uploadFile(uid, file)
            .then((snapshot) => snapshot.ref.getDownloadURL())
            .then((url) => [file.name, url])
      )
    );
  }
}

export default Firebase;