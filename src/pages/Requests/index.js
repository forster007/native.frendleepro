import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import { getRequests } from '~/services/appointments';

import { Header } from '../../components';
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

export default function Requests() {
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(new Map());

  const handleFooterAction = useCallback(status => {
    console.log(status);
  });

  const handleRequests = useCallback(async () => {
    setLoading(true);
    const { data } = await getRequests();

    setLoading(false);
    setRequests(data);
  });

  const handleSelected = useCallback(id => {
    const newSelected = new Map(selected);
    newSelected.set(id, !selected.get(id));

    setSelected(newSelected);
  });

  useEffect(() => {
    handleRequests();
  }, []);

  function renderAppointments({ item: appointment }) {
    const { address, customer, detail, id, start_at, status } = appointment;
    const { avatar } = customer;
    // const date = moment(start_at).format('YYYY-MM-DD HH:mm');
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
                <ShortItemInfo>
                  <View style={{ alignItems: 'center', width: 60 }}>
                    <CardBodyItemInfoIconClock />
                  </View>
                  <CardBodyItemInfoText>{dateShort}</CardBodyItemInfoText>
                </ShortItemInfo>
              </ItemClock>
            </CardBody>
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
          ListEmptyComponent={<Empty>No Appointments available.</Empty>}
        />
      </Content>
    </Container>
  );
}
