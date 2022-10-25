
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { setFcmToken } from '../api/services/notification';



export const setToken = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCvdEoBdtF5S7qBQ3BT6ctSiHIRONwZjIM",
    authDomain: "kafo-d2991.firebaseapp.com",
    projectId: "kafo-d2991",
    storageBucket: "kafo-d2991.appspot.com",
    messagingSenderId: "305941023338",
    appId: "1:305941023338:web:33420ab564362b1c301813",
    measurementId: "G-E1WLC68WF1"
  };
  const app = initializeApp(firebaseConfig);
  // firebase.initializeApp(firebaseConfig);
  console.log('firebase');
  const messaging = getMessaging(app);
  console.log(messaging);

  getToken(messaging, { vapidKey: 'BFQ45JUGOY1-GwJNL0CcoITdvJMaCqTALkU5mH0ZS5reUKNN_iRJ6WbaLXZZbED_Jkqn6vI3yJgDJlU6N87mB38' }).then((currentToken) => {
    if (currentToken) {
      //alert(currentToken)
      // console.log(currentToken)
       //setFcmToken(currentToken);
      // Send the token to your server and update the UI if necessary
      // ...
    } else {

      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  })
  onMessage(messaging, (payload) => {
    // alert('Message received.');
    console.log(messaging)
    console.log(payload.data)
    //alert(JSON.stringify(payload.data))
    // alert(JSON.stringify(messaging));
    // ...
  });
  //const messaging = firebase.messaging();

  /* const messaging = getMessaging();
    console.log(messaging);
    if (!firebase.messaging.isSupported()) {
        console.log('firebase Not supported');
        return;
    }

    messaging
        .requestPermission()
        .then(() => {
            return messaging.getToken();
        })
        .then((token) => {
            setFcmToken(token);
        })
        .catch((error) => {
            console.log('token Error', error);
        });

    messaging.onMessage((payload) => {
        alert('firsebase')
        switch (payload.notification.tag) {
            case 'notification':
                break;
            default:
                break;
        }
    });*/
};
