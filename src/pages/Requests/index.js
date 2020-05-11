import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';
import { getRequests } from '~/services/appointments';

import { Header } from '../../components';
import {
  ActionButton,
  ActionButtonText,
  ValueBlock,
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
  ItemAddress,
  CardTitle,
  CardBodyView,
  ItemClock,
  CardActionFooter,
  CardDescription,
  CardBodyItemInfo,
  CardBodyItemInfoIconClock,
  CardBodyItemInfoIconClockShort,
  CardBodyItemInfoIconNav,
  CardBodyItemInfoText,
  CardFooter,
  CardFooterText,
  CardSubBody,
  CardHeader,
  ClockBlock,
  ClockText,
  IconAddress,
  IconClock,
  IconClockBlock,
  IconClockSubBlock,
  InfoBlock,
  InfoData,
  InfoDataNameLong,
  InfoDataNameShort,
  InfoDataTitleLong,
  InfoDataTitleShort,
  InfoSubData,
  InfoSubStar,
  InfoValue,
  Item,
  Profile,
  ProfileInfo,
  RequestCoin,
  RequestValue,
  ShortItemInfo,
  ShortProfileName,
  ShortProfileTitle,
  SubBlock,
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
              <ActionButton>
                <ActionButtonText>Accept</ActionButtonText>
              </ActionButton>
              <ActionButton>
                <ActionButtonText>Decline</ActionButtonText>
              </ActionButton>
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
          ListEmptyComponent={<Empty>No Appointments available.</Empty>}
        />
      </Content>
    </Container>
  );
}
