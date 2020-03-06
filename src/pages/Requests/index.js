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
  AppointmentsCard,
  CardBody,
  CardBodyDivisor,
  CardBodyItem,
  CardBodyItemInfo,
  CardBodyItemInfoIconClock,
  CardBodyItemInfoIconNav,
  CardBodyItemInfoText,
  CardFooter,
  CardFooterText,
  CardHeader,
  CardProviderProfile,
  CardProviderProfileAvatar,
  CardProviderProfileInfo,
  CardProviderProfileNameText,
  CardProviderProfileTitleText,
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
    const date = moment(start_at).format('YYYY-MM-DD HH:mm');
    const dateShort = moment(start_at).format('DD MMM, dddd');
    const name = `${customer.name} ${customer.lastname}`;
    const title = detail.service.name;
    const expanded = !!selected.get(id);

    switch (expanded) {
      case true: {
        return (
          <AppointmentsCard expanded onPress={() => handleSelected(id)}>
            <CardHeader>
              <CardProviderProfile>
                <CardProviderProfileAvatar source={avatar} />
                <CardProviderProfileInfo>
                  <CardProviderProfileTitleText>
                    {title}
                  </CardProviderProfileTitleText>
                  <CardProviderProfileNameText>
                    {name}
                  </CardProviderProfileNameText>
                </CardProviderProfileInfo>
              </CardProviderProfile>
            </CardHeader>

            <View style={{ display: expanded ? 'none' : 'flex' }}>
              <View style={{ flexDirection: 'row', height: 35 }}>
                <View
                  style={{
                    alignItems: 'center',
                    height: 35,
                    justifyContent: 'center',
                    width: 70,
                  }}
                />

                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                  }}
                >
                  <Text style={{ color: '#000', fontSize: 14 }}>hahahah</Text>
                </View>

                <View
                  style={{ height: 35, justifyContent: 'center', width: 75 }}
                >
                  <Text style={{ color: '#000', fontSize: 14 }}>hahahaa</Text>
                </View>
              </View>

              <View />
            </View>

            <View style={{ display: expanded ? 'flex' : 'none' }}>
              <View style={{ flexDirection: 'row', height: 35 }}>
                <View
                  style={{
                    alignItems: 'center',
                    height: 35,
                    justifyContent: 'center',
                    width: 70,
                  }}
                />

                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                  }}
                >
                  <Text style={{ color: '#000', fontSize: 14 }}>
                    qqqqqqqqqqqqqqqqqq
                  </Text>
                </View>

                <View
                  style={{ height: 35, justifyContent: 'center', width: 75 }}
                >
                  <Text style={{ color: '#000', fontSize: 14 }}>
                    pppppppppppppppppppppp
                  </Text>
                </View>
              </View>

              <View
                style={{
                  borderBottomColor: '#CDCDCD',
                  borderBottomWidth: 0.5,
                  marginHorizontal: 15,
                }}
              />

              <View
                style={{
                  borderBottomColor: '#CDCDCD',
                  borderBottomWidth: 0.5,
                  flexDirection: 'row',
                  maxHeight: 120,
                }}
              >
                <View
                  style={{
                    alignItems: 'center',
                    height: 35,
                    justifyContent: 'center',
                    width: 70,
                  }}
                />

                <View
                  style={{
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingRight: 10,
                  }}
                >
                  <Text
                    numberOfLines={4}
                    style={{
                      color: '#000',
                      fontSize: 14,
                      lineHeight: 24,
                      paddingVertical: 4,
                    }}
                  >
                    uuuuuuuuuuuuuuuuuuuuuuuuuuu
                  </Text>
                </View>
              </View>

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
          </AppointmentsCard>
        );
      }

      case false: {
        return (
          <AppointmentsCard expanded={false} onPress={() => handleSelected(id)}>
            <CardHeader>
              <CardProviderProfile>
                <CardProviderProfileAvatar source={avatar} />
                <CardProviderProfileInfo>
                  <CardProviderProfileTitleText>
                    {title}
                  </CardProviderProfileTitleText>
                  <CardProviderProfileNameText>
                    {name}
                  </CardProviderProfileNameText>
                </CardProviderProfileInfo>
              </CardProviderProfile>
            </CardHeader>

            <CardBody>
              <CardBodyItem>
                <CardBodyItemInfo>
                  <CardBodyItemInfoIconClock />
                  <CardBodyItemInfoText>{dateShort}</CardBodyItemInfoText>
                </CardBodyItemInfo>
              </CardBodyItem>
              <CardBodyDivisor />
              <CardBodyItem>
                <CardBodyItemInfo>
                  <CardBodyItemInfoIconNav />
                  <CardBodyItemInfoText>{address}</CardBodyItemInfoText>
                </CardBodyItemInfo>
              </CardBodyItem>
            </CardBody>

            <CardFooter
              onPress={() => handleFooterAction(status)}
              status={status}
            >
              <CardFooterText>{status}</CardFooterText>
            </CardFooter>
          </AppointmentsCard>
        );
      }

      default: {
        return null;
      }
    }
  }

  return (
    <Container>
      <Header left="goBack" title="Your appointments" />

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
