// import notifee, { AndroidImportance, AndroidLaunchActivityFlag } from '@notifee/react-native';
// import messaging from '@react-native-firebase/messaging';
// import { PermissionsAndroid, Platform } from 'react-native';
// import { setNotification } from '../redux/actions';
// import { store } from '../redux/store';
// import { refreshNotif } from '../services/auth';
// import { isIos } from '../utils/helper';
// import { getValue, setValue } from '../utils/localstorage';

// const usePushNotification = () => {
//     const onMessageReceived = async (message) => {
//         const { type, id, toUserId } = message.data;
//         const { title, body, android } = message.notification;
//         console.log("onMessageReceived", message)
//         const resData = await getValue("responseData")
//         console.log("resData", resData)
//         if(Number(resData?.data?.User?.ID) === Number(toUserId)) {
//             notifee.displayNotification({
//                 title,
//                 body,
//                 data: message.data,
//                 android: {
//                     channelId: 'orders',
//                     smallIcon: 'ic_notification',
//                     largeIcon: android?.imageUrl ?? require('../assets/img/logo/logo8.png'),
//                     sound: "default",
//                     pressAction: {
//                       id: 'default',
//                       launchActivity: 'default',
//                       launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
//                     },
//                 },
//             });
//         }
//     }
        
//   const requestUserPermission = async () => {
//     if (isIos()) {
//       const authStatus = await messaging().requestPermission();
//       const enabled =
//         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//         authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//       if (enabled) {
//         console.log('Authorization status:', authStatus);
//       }
//     } else if (Platform.OS === 'android') {
//       const res = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//       );
//     }
//   }

//   const getFCMToken = async () => {
//     if (__DEV__ && isIos()) {
//       setValue("FcmToken", "token")
//     } else {
//       const fcmToken = await messaging().getToken();
//       if (fcmToken) {
//           console.log('Your Firebase Token is:', fcmToken);
//           const resData = await getValue("responseData")
//           setValue("FcmToken", fcmToken)
//           if(resData) {
//               await refreshNotif({fcmToken})
//           }
//       } else {
//           console.log('Failed', 'No token received');
//       }
//     }
//   };

//   const refreshFCMToken = async () => {
//     const unsubscribe = messaging().onTokenRefresh(async fcmToken => {
//         const resData = await getValue("responseData")
//         if(resData) {
//           await refreshNotif({fcmToken})
//           setValue("FcmToken", fcmToken)
//         }
//     })
//     return unsubscribe;
//   }

//   const listenToForegroundNotifications = async () => {
//     const unsubscribe = messaging().onMessage(onMessageReceived);
//     return unsubscribe;
//   }

//   const listenToBackgroundNotifications = async () => {
//     const unsubscribe = messaging().setBackgroundMessageHandler(onMessageReceived);
//     return unsubscribe;
//   }

//   const onNotificationOpenedAppFromBackground = async () => {
//     const unsubscribe = messaging().onNotificationOpenedApp(async(message) => {
//       console.log("message onNotificationOpenedApp", message)
//       await onMessageReceived(message)
//     });
//     return unsubscribe;
//   };

//   const onNotificationOpenedAppFromQuit = async () => {
//     const message = await messaging().getInitialNotification();

//     if(message) {
//       store.dispatch(setNotification(message))
//       // console.log('App opened from QUIT by tapping notification:', JSON.stringify(message), message?.data, message?.data?.type === 'order');
//       //   if(message?.data?.type === 'order') {
//       //     navigate("OrderProcess", {
//       //       ID: message?.data?.id
//       //     })
//       //   }
//     }
//   };

//   const createChannelOrder = async () => {
//     try {
//       const channel = await notifee.createChannel({
//         id: 'orders',
//         name: 'Order Status',
//         importance: AndroidImportance.HIGH,
//         description: '',
//       });
  
//       console.log('Channel created:', channel);
//     } catch (error) {
//       console.error('Error creating notification channel:', error);
//     }
//   }

//   return {
//     requestUserPermission,
//     getFCMToken,
//     refreshFCMToken,
//     listenToForegroundNotifications,
//     listenToBackgroundNotifications,
//     onNotificationOpenedAppFromBackground,
//     onNotificationOpenedAppFromQuit,
//     createChannelOrder,
//   };
// };

// export default usePushNotification;