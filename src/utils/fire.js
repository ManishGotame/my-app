import firebase from 'firebase/compat/app';
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdQohKHfMYWF9rOMcOjqRszwq40NI1HiU",
  authDomain: "learning-b9c03.firebaseapp.com",
  projectId: "learning-b9c03",
  storageBucket: "learning-b9c03.appspot.com",
  messagingSenderId: "309460867132",
  appId: "1:309460867132:web:75ce5b06458bff7c3f0b39",
  measurementId: "G-E1FBF6WSE1"
};

// initialization 
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// const auth = firebase.auth(); 
// const auth = getAuth (app);

export default app;