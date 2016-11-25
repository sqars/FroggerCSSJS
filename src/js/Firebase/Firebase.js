import firebase from 'firebase';

try {
    const config = {
        apiKey: "AIzaSyCCDp3dLAvKhBuh3EuSu166LCxiPWxm1PI",
        authDomain: "froggerapp-354a6.firebaseapp.com",
        databaseURL: "https://froggerapp-354a6.firebaseio.com",
        storageBucket: "froggerapp-354a6.appspot.com",
        messagingSenderId: "340862987849"
    };
    firebase.initializeApp(config);
} catch (error) {
    console.log(error);
}

export const firebaseRef = firebase.database().ref();;
export default firebase;
