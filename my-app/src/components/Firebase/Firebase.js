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

const fallbackIMG = "https://firebasestorage.googleapis.com/v0/b/startiq.appspot.com/o/imgs%2FfakeImgForProfile.png?alt=media&token=8224719a-3243-4edd-a4d7-daa37abbd669";

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
    this.auth.signInWithPopup(this.googleProvider).then(async (res) => {
      const {displayName, email, uid} = res.user;
      const prevUser = (await this.user(uid).once('value')).val();
      if(!prevUser) await this.signup(displayName, email, undefined, uid);
    });


  // *** User API ***


  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
  workspace = uid => this.db.ref(`workspace/${uid}`);
  fileStorage = uid => this.storage.ref(`files/${uid}`); //Storage for pdf file uploads
  imgStorage = uid => this.storage.ref(`imgs/${uid}`);  //Storage for profile picture uploads
  profile = uid => this.db.ref(`users/${uid}/profile_info`);

  setAuthChangeHandler(handler) {
    this.auth.onAuthStateChanged(handler);
  }

  // ************************* SIGNUP API ***************************

  async signup(username, email, imgURL, uid) {
    await this.user(uid).set({ username, email});
    await this.putProfile({ 
      university: "", 
      degree: "", 
      roles: "", 
      skills: "", 
      industries: "", 
      profileIMG: imgURL || ""
    }, uid);
    await this.workspace(uid).set({ username });
  }

  // ************************* PROFILE API ***************************
  putProfile(profile, uid) {
    return this.profile(uid).set(profile);
  }
  
  getProfile(uid) {
    return this.profile(uid).once('value').then(snapshot => {
      const profile = snapshot.val();
      if(!profile.profileIMG) profile.profileIMG = fallbackIMG;
      return profile;
    });
  }

  uploadImg(img) {
    return this.imgStorage(img.name+Date.now()).put(img)
            .then((snapshot) => snapshot.ref.getDownloadURL());
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