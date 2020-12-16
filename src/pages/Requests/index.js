import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import moment from 'moment';
import { getRequests, updateAppointments } from '../../services/appointments';

import { Header } from '../../components';
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
  CardBodyShort,
  Divisor,
  CardTitle,
  CardBodyView,
  CardActionFooter,
  CardDescription,
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

export default function Requests() {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(new Map());

  const handleRequests = useCallback(async () => {
    setLoading(true);

    const { data } = await getRequests();

    setLoading(false);
    setRequests(data);
  });

  const handleFooterAction = useCallback((action, appointment) => {
    switch (action) {
      case 'cancel': {
        const obj = { appointment_id: appointment.id, status: 'canceled' };

        Alert.alert(
          'WARNING',
          'Do you really want to cancel this appointment?',
          [
            {
              text: 'OK',
              onPress: async () => {
                await updateAppointments(obj);
                await handleRequests();
              },
            },
            { text: 'Cancel', onPress: () => console.log('Done') },
          ],
          { cancelable: false }
        );
        break;
      }

      case 'confirmed': {
        const obj = { appointment_id: appointment.id, status: 'confirmed' };

        Alert.alert(
          'WARNING',
          'Do you really want to accept this appointment?',
          [
            {
              text: 'OK',
              onPress: async () => {
                await updateAppointments(obj);
                await handleRequests();
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

  const handleSelected = useCallback(id => {
    const newSelected = new Map(selected);
    newSelected.set(id, !selected.get(id));

    setSelected(newSelected);
  });

  useEffect(() => {
    handleRequests();
  }, []);

  function renderCardActions(appointment) {
    switch (appointment.status) {
      case 'opened': {
        return (
          <>
            <ActionButton
              onPress={() => handleFooterAction('confirmed', appointment)}
            >
              <ActionButtonText>Accept</ActionButtonText>
            </ActionButton>
            <ActionButton
              onPress={() => handleFooterAction('cancel', appointment)}
            >
              <ActionButtonText>Decline</ActionButtonText>
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
                <InfoData>
                  <InfoDataTitleShort>{title}</InfoDataTitleShort>
                  <InfoDataNameShort>{name}</InfoDataNameShort>
                </InfoData>
                <InfoValue>
                  <InfoDataNameShort>$</InfoDataNameShort>
                  <InfoDataTitleShort>{value}</InfoDataTitleShort>
                </InfoValue>
              </InfoBlock>
            </CardHeader>

            <CardBodyShort>
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
              </InfoSubData>
            </CardBodyShort>
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
      <Header left="goBack" title="New requests" />

      <Content>
        <Appointments
          data={requests}
          extraData={selected}
          keyExtractor={appointment => `appointment-${appointment.id}`}
          onRefresh={handleRequests}
          refreshing={loading}
          renderItem={renderAppointments}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Empty>No requests available</Empty>}
        />
      </Content>
    </Container>
  );
}
