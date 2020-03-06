import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { storeOnesignal } from '~/services/onesignal';
import { Container } from './styles';
import { Header } from '../../components';

export default function Schedule({ navigation }) {
  const handleNotification = useCallback(data => {
    if (data.origin === 'selected') {
      navigation.navigate('Schedule');
    }
  });

  const handleNotifications = useCallback(async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      Alert.alert('OPS...', 'No notification permissions!');
      return;
    }

    const onesignal = await Notifications.getExpoPushTokenAsync();
    await storeOnesignal({ onesignal });
  });

  useEffect(() => {
    handleNotifications();

    const notificationSubscription = Notifications.addListener(
      handleNotification
    );

    return () => {
      notificationSubscription.remove();
    };
  }, []);

  return (
    <Container>
      <Header right="menu" title="Schedule" />
    </Container>
  );
}
