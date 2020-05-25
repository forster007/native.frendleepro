import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StatusBar, View } from 'react-native';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Header, Modal } from '../../components';
import { getAppointments } from '~/services/appointments';
import { storeOnesignal } from '~/services/onesignal';
import { messagesRequest } from '../../store/modules/websocket/actions';
import {
  ActionButton,
  ActionButtonText,
  Container,
  Content,
  Empty,
  Appointments,
  Avatar,
  AvatarBlock,
  Card,
  CardBody,
  Divisor,
  CardTitle,
  CardBodyView,
  CardActionFooter,
  CardDescription,
  CardFooter,
  CardFooterText,
  CardSubBody,
  CardHeader,
  ClockBlock,
  ClockText,
  IconAddress,
  IconClock,
  IconClockSubBlock,
  InfoBlock,
  InfoData,
  InfoDataNameLong,
  InfoDataNameShort,
  InfoDataTitleLong,
  InfoDataTitleShort,
  InfoSubData,
  InfoValue,
  Item,
  SubBlock,
} from './styles';

export default function Schedule({ navigation }) {
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(new Map());

  const handleAppointments = useCallback(async () => {
    setLoading(true);

    const { data } = await getAppointments();

    dispatch(messagesRequest());
    setAppointments(data);
    setLoading(false);
  });

  const handleFooterAction = useCallback((action, appointment) => {
    switch (action) {
      case 'cancel': {
        const obj = {
          appointment_id: appointment.id,
          status: 'canceled',
        };

        Alert.alert(
          'WARNING',
          'Do you really want to cancel this appointment?',
          [
            {
              text: 'OK',
              onPress: () => {
                updateAppointments(obj);
                handleAppointments();
              },
            },
            { text: 'Cancel', onPress: () => console.log('Done') },
          ],
          { cancelable: false }
        );
        break;
      }

      default: {
        console.log('No action');
      }
    }
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

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        StatusBar.setBarStyle('light-content');
      }, 300);
    } else {
      StatusBar.setBarStyle('dark-content');
    }
  }, [modalVisible]);

  function renderCardActions(appointment) {
    switch (appointment.status) {
      case 'confirmed':
      case 'payed': {
        return (
          <>
            <ActionButton
              onPress={() => navigation.navigate('Chat', { appointment })}
            >
              <ActionButtonText>Message</ActionButtonText>
            </ActionButton>
            <ActionButton
              onPress={() => handleFooterAction('cancel', appointment)}
            >
              <ActionButtonText>Cancel</ActionButtonText>
            </ActionButton>
          </>
        );
      }

      case 'started': {
        return (
          <>
            <ActionButton>
              <ActionButtonText>Finish treatment</ActionButtonText>
            </ActionButton>
          </>
        );
      }

      default: {
        return null;
      }
    }
  }

  function renderAppointments({ item: appointment }) {
    const {
      address,
      customer,
      detail,
      finish_at,
      id,
      observation,
      start_at,
      status,
      value,
    } = appointment;
    const { avatar } = customer;
    // const date = moment(start_at).format('YYYY-MM-DD HH:mm');
    const dateClockStart = moment(start_at).format('HH');
    const dateClockFinish = moment(finish_at).format('HH[h]');
    const dateLong = moment(start_at).format('dddd, MMMM DD');
    const dateShort = `${dateClockStart} - ${dateClockFinish}`;
    const name = `${customer.name} ${customer.lastname}`;
    const title = detail.service.name;
    const expanded = !!selected.get(id);

    switch (expanded) {
      case true: {
        return (
          <Card expanded onPress={() => handleSelected(id)}>
            <CardHeader>
              <AvatarBlock>
                <Avatar source={avatar} />
              </AvatarBlock>
              <InfoBlock>
                <InfoData>
                  <InfoDataTitleLong>{title}</InfoDataTitleLong>
                  <InfoDataNameLong>{name}</InfoDataNameLong>
                </InfoData>
                <InfoValue>
                  <InfoDataNameShort>$</InfoDataNameShort>
                  <InfoDataTitleShort>{value}</InfoDataTitleShort>
                </InfoValue>
              </InfoBlock>
            </CardHeader>

            <CardBody>
              <CardSubBody>
                <InfoSubData>
                  <Item>
                    <IconClockSubBlock>
                      <IconClock />
                    </IconClockSubBlock>
                    <SubBlock>
                      <ClockBlock>
                        <ClockText>{dateLong}</ClockText>
                      </ClockBlock>
                      <View>
                        <ClockText>{dateShort}</ClockText>
                      </View>
                    </SubBlock>
                  </Item>

                  <Divisor />

                  <Item>
                    <IconClockSubBlock>
                      <IconAddress />
                    </IconClockSubBlock>
                    <SubBlock>
                      <ClockBlock>
                        <ClockText>{address}</ClockText>
                      </ClockBlock>
                    </SubBlock>
                  </Item>
                </InfoSubData>
              </CardSubBody>
            </CardBody>

            <CardBody>
              <CardBodyView>
                <CardTitle>What needs to be done:</CardTitle>
                <CardDescription>{observation}</CardDescription>
              </CardBodyView>
            </CardBody>

            <CardActionFooter>
              {renderCardActions(appointment)}
            </CardActionFooter>

            <CardFooter status={status}>
              <CardFooterText>{status}</CardFooterText>
            </CardFooter>
          </Card>
        );
      }

      case false: {
        return (
          <Card expanded={false} onPress={() => handleSelected(id)}>
            <CardHeader>
              <AvatarBlock>
                <Avatar source={avatar} />
              </AvatarBlock>
              <InfoBlock>
                <InfoData short>
                  <InfoDataTitleShort>{title}</InfoDataTitleShort>
                  <InfoDataNameShort>{name}</InfoDataNameShort>
                </InfoData>
              </InfoBlock>
            </CardHeader>

            <CardBody>
              <InfoSubData>
                <Item>
                  <IconClockSubBlock>
                    <IconClock />
                  </IconClockSubBlock>
                  <SubBlock>
                    <ClockBlock>
                      <ClockText>{dateLong}</ClockText>
                    </ClockBlock>
                    <View>
                      <ClockText>{dateShort}</ClockText>
                    </View>
                  </SubBlock>
                </Item>

                <Divisor />

                <Item>
                  <IconClockSubBlock>
                    <IconAddress />
                  </IconClockSubBlock>
                  <SubBlock>
                    <ClockBlock>
                      <ClockText>{address}</ClockText>
                    </ClockBlock>
                  </SubBlock>
                </Item>
              </InfoSubData>
            </CardBody>

            <CardFooter status={status}>
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
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Header
        left="profile"
        right="menu"
        rightFunction={setModalVisible}
        rightProps={modalVisible}
        title="Your appointments"
      />

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
