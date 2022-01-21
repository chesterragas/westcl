import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import { boot } from 'quasar/wrappers';


var firebaseConfig = {
  apiKey: "AIzaSyC507OhtpSbNK-kIgaQifmK1-9bl2pgWRI",
  authDomain: "westcl-c1378.firebaseapp.com",
  databaseURL: "https://westcl-c1378-default-rtdb.firebaseio.com",
  projectId: "westcl-c1378",
  storageBucket: "westcl-c1378.appspot.com",
  messagingSenderId: "68075184597",
  appId: "1:68075184597:web:c1cb4342ea6810cc211d5c"
  };
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth,storage };

export const snapshotToArray = (snapshot: any) => {
  const returnArr: any[] = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

  
export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    auth.onAuthStateChanged(user => {
      const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
      if (user == null && requiresAuth) {
          next('/login')
        }
        else { 
          next()
        }
    })
  });
    
});