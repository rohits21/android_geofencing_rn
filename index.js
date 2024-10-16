/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import PushNotification from 'react-native-push-notification';

PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
      },
    
  onNotification: function(notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },


});

const triggerLocalNotification = (title, message) => {
        console.log("Method called");
        
      PushNotification.localNotification({
        channelId: "channel-id-1",
        userInteraction: false,
        title: title,
        message: message,
      });
    };
    
    export {triggerLocalNotification}

AppRegistry.registerComponent(appName, () => App);
