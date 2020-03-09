import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import moment from 'moment';
import { getAppointments } from '~/services/appointments';
import { storeOnesignal } from '~/services/onesignal';
import {
  Container,
  Content,
  Empty,
  Appointments,
  Avatar,
  Card,
  CardBody,
  Divisor,
  ItemAddress,
  ItemClock,
  CardBodyItemInfo,
  CardBodyItemInfoIconClock,
  CardBodyItemInfoIconNav,
  CardBodyItemInfoText,
  CardFooter,
  CardFooterText,
  CardHeader,
  Info,
  Profile,
  ShortItemInfo,
  ShortProfileName,
  ShortProfileTitle,
  LongItemInfo,
  LongProfileName,
  LongProfileTitle,
} from './styles';
import { Header } from '../../components';

export default function Schedule({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selected, setSelected] = useState(new Map());

  const handleFooterAction = useCallback(status => {
    console.log(status);
  });

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

  const handleAppointments = useCallback(async () => {
    setLoading(true);
    const { data } = await getAppointments();

    setLoading(false);
    setAppointments(data);
  });

  const handleSelected = useCallback(id => {
    const newSelected = new Map(selected);
    newSelected.set(id, !selected.get(id));

    setSelected(newSelected);
  });

  useEffect(() => {
    handleAppointments();
    handleNotifications();

    const notificationSubscription = Notifications.addListener(
      handleNotification
    );

    return () => {
      notificationSubscription.remove();
    };
  }, []);

  function renderAppointments({ item: appointment }) {
    const { address, customer, detail, id, start_at, status } = appointment;
    const { avatar } = customer;
    const date = moment(start_at).format('YYYY-MM-DD HH:mm');
    const dateShort = moment(start_at).format('DD MMM, dddd');
    const name = `${customer.name} ${customer.lastname}`;
    const title = detail.service.name;
    const expanded = !!selected.get(id);

    switch (expanded) {
      case true: {
        return (
          <Card expanded onPress={() => handleSelected(id)}>
            <CardHeader>
              <Profile>
                <Avatar source={avatar} />
                <Info>
                  <LongProfileTitle>{title}</LongProfileTitle>
                  <LongProfileName>{name}</LongProfileName>
                </Info>
              </Profile>
            </CardHeader>

            <CardBody>
              <ItemClock>
                <LongItemInfo>
                  <CardBodyItemInfoIconClock />
                  <CardBodyItemInfoText>{dateShort}</CardBodyItemInfoText>
                </LongItemInfo>
              </ItemClock>

              <Divisor />

              <ItemAddress>
                <ShortItemInfo>
                  <CardBodyItemInfoIconNav />
                  <CardBodyItemInfoText>{address}</CardBodyItemInfoText>
                </ShortItemInfo>
              </ItemAddress>
            </CardBody>

            <View style={{ display: expanded ? 'flex' : 'none' }}>
              <View
                style={{
                  borderBottomColor: '#CDCDCD',
                  borderBottomWidth: 0.5,
                }}
              >
                <View style={{ paddingHorizontal: 25, paddingTop: 5 }}>
                  <Text
                    style={{ color: '#000', fontSize: 16, paddingVertical: 5 }}
                  >
                    O que precisa ser feito?
                  </Text>
                  <Text
                    style={{ color: '#000', fontSize: 16, paddingBottom: 20 }}
                  >
                    zzzzzzzzzzzzzzzzzzzzz
                  </Text>
                </View>
              </View>

              <View />
            </View>
          </Card>
        );
      }

      case false: {
        return (
          <Card expanded={false} onPress={() => handleSelected(id)}>
            <CardHeader>
              <Profile>
                <Avatar source={avatar} />
                <Info>
                  <ShortProfileTitle>{title}</ShortProfileTitle>
                  <ShortProfileName>{name}</ShortProfileName>
                </Info>
              </Profile>
            </CardHeader>

            <CardBody>
              <ItemClock>
                <LongItemInfo>
                  <CardBodyItemInfoIconClock />
                  <CardBodyItemInfoText>{dateShort}</CardBodyItemInfoText>
                </LongItemInfo>
              </ItemClock>

              <Divisor />

              <ItemAddress>
                <ShortItemInfo>
                  <CardBodyItemInfoIconNav />
                  <CardBodyItemInfoText>{address}</CardBodyItemInfoText>
                </ShortItemInfo>
              </ItemAddress>
            </CardBody>

            <CardFooter
              onPress={() => handleFooterAction(status)}
              status={status}
            >
              <CardFooterText>{status}</CardFooterText>
            </CardFooter>
          </Card>
        );
      }

      default: {
        return null;
      }
    }
  }

  return (
    <Container>
      <Header right="menu" title="Your appointments" />

      <Content>
        <Appointments
          data={appointments}
          extraData={selected}
          keyExtractor={appointment => `appointment-${appointment.id}`}
          onRefresh={handleAppointments}
          refreshing={loading}
          renderItem={renderAppointments}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Empty>No Appointments available.</Empty>}
        />
      </Content>
    </Container>
  );
}
