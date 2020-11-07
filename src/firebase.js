import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyA1GKT-TptxQEVUGQK2gqk38bZfvHaXtL8',
  authDomain: 'tinder-clone-c1db2.firebaseapp.com',
  databaseURL: 'https://tinder-clone-c1db2.firebaseio.com',
  projectId: 'tinder-clone-c1db2',
  storageBucket: 'tinder-clone-c1db2.appspot.com',
  messagingSenderId: '762974704231',
  appId: '1:762974704231:web:866d3f9cdcd8cb13bc7ac2'
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider, storage }
export default db
