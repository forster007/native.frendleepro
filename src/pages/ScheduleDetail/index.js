import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import {
  Card,
  CardAction,
  CardActionButton,
  CardActionButtonText,
  CardBody,
  CardBodyItem,
  CardBodyItemData,
  CardBodyItemDivisor,
  CardBodyItemIcon,
  CardBodyItemText,
  CardCompliment,
  CardComplimentIcon,
  CardComplimentRow,
  CardComplimentText,
  CardComplimentTitle,
  CardComplimentTitleText,
  CardFooter,
  CardFooterText,
  CardHeader,
  CardHeaderText,
  CardHeaderSubText,
  CardRating,
  CardRatingStars,
  CardRatingText,
  Container,
  Content,
  IconAddress,
  IconClock,
  IconHourglass,
  IconImage,
  Input,
  InputLegend,
  CustomerAvatar,
  CustomerName,
  CustomerNameText,
} from './styles';
import { Header } from '../../components';
import { updateAppointments } from '../../services/appointments';
import { storeRating } from '../../services/rating';

export default function ScheduleDetail({ navigation }) {
  const appointment = useMemo(() => navigation.getParam('appointment'), [
    navigation,
  ]);

  const handleClock = useCallback(() => {
    const ellapsed = moment
      .utc(moment().diff(moment(appointment.started_at)))
      .format('HH:mm:ss');

    if (moment(ellapsed, 'HH:mm:ss').get('hour') >= 1) {
      return moment(ellapsed, 'HH:mm:ss').format('HH [h] mm [min]');
    }

    return moment(ellapsed, 'HH:mm:ss').format('mm [min] ss [sec]');
  });

  const [buttonState, setButtonState] = useState(false);
  const [clock, setClock] = useState(handleClock());
  const [comment, setComment] = useState('');
  const [commentLength, setCommentLength] = useState('');
  const [compliment, setCompliment] = useState('');
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (appointment.status === 'finished') setTitle('Rate Event');
    if (appointment.status === 'payed') setTitle('Start Event');
    if (appointment.status === 'started') setTitle('Treatment Detail');

    const timeToUpdate = setInterval(() => setClock(handleClock()), 1 * 1000);

    return () => {
      clearInterval(timeToUpdate);
    };
  }, [appointment]);

  useEffect(() => {
    setCommentLength(`${comment.length}/255`);
  }, [comment]);

  useEffect(() => {
    if (rating > 0 && compliment) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [comment, compliment, rating]);

  const handleAction = useCallback(action => {
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
                navigation.goBack();
              },
            },
            { text: 'Cancel', onPress: () => console.log('Canceled') },
          ],
          { cancelable: false }
        );

        break;
      }

      case 'finish': {
        const obj = { appointment_id: appointment.id, status: 'finished' };

        Alert.alert(
          'WARNING',
          'Do you really want to finish this appointment?',
          [
            {
              text: 'OK',
              onPress: async () => {
                await updateAppointments(obj);
                appointment.status = 'finished';
                appointment.finished_at = moment();
                setTitle('Rate your provider');
              },
            },
            { text: 'Cancel', onPress: () => console.log('Done') },
          ],
          { cancelable: false }
        );

        break;
      }

      case 'start': {
        const obj = { appointment_id: appointment.id, status: 'started' };

        Alert.alert(
          'WARNING',
          'Do you really want to start this appointment?',
          [
            {
              text: 'OK',
              onPress: async () => {
                await updateAppointments(obj);
                appointment.status = 'started';
                appointment.started_at = moment();
                setClock(handleClock());
              },
            },
            { text: 'Cancel', onPress: () => console.log('Done') },
          ],
          { cancelable: false }
        );

        break;
      }

      default:
        break;
    }
  });

  const handleSubmit = useCallback(async () => {
    Alert.alert(
      'WARNING',
      'Do you really want to rating this appointment?',
      [
        {
          text: 'OK',
          onPress: async () => {
            const obj = {
              appointment_id: appointment.id,
              comment,
              compliment,
              rating,
            };

            await storeRating(obj);
            navigation.goBack();
          },
        },
        { text: 'Cancel', onPress: () => console.log('Done') },
      ],
      { cancelable: false }
    );
  });

  function renderContent() {
    switch (appointment.status) {
      case 'finished': {
        const {
          customer,
          finished_at,
          observation,
          started_at,
          value,
        } = appointment;

        let finishedClock = moment
          .utc(moment(finished_at).diff(moment(started_at)))
          .format('HH:mm:ss [min]');

        if (moment(finishedClock, 'HH:mm:ss').get('hour') >= 1) {
          finishedClock = moment(finishedClock, 'HH:mm:ss').format(
            'HH [h] mm [min]'
          );
        }

        finishedClock = moment(finishedClock, 'HH:mm:ss').format(
          'mm [min] ss [sec]'
        );

        return (
          <>
            <CustomerAvatar source={customer.avatar}>
              <CustomerName>
                <CustomerNameText>
                  {customer.name} {customer.lastname}
                </CustomerNameText>
              </CustomerName>
            </CustomerAvatar>

            <Card>
              <CardHeader>
                <CardHeaderText>Event finished</CardHeaderText>
                <CardHeaderSubText>{observation}</CardHeaderSubText>
              </CardHeader>

              <CardFooter color="#afaebf">
                <IconHourglass color="#2A3152" />
                <CardFooterText>{finishedClock}</CardFooterText>
                <CardFooterText>${value}</CardFooterText>
              </CardFooter>

              <CardHeader>
                <CardHeaderText>Leave a comment about the event</CardHeaderText>
                <Input
                  maxLength={255}
                  multiline
                  numberOfLines={4}
                  onChangeText={setComment}
                  value={comment}
                />
                <InputLegend>{commentLength}</InputLegend>
              </CardHeader>

              <CardRating>
                <CardRatingStars>
                  <CardRatingText>{rating},0</CardRatingText>
                </CardRatingStars>

                <StarRating
                  emptyStar={require('../../../assets/frendlee-icon-star-empty.png')}
                  fullStar={require('../../../assets/frendlee-icon-star-full.png')}
                  maxStars={5}
                  rating={rating}
                  selectedStar={e => setRating(e)}
                  starSize={35}
                  starStyle={{ marginHorizontal: 5 }}
                />
              </CardRating>

              <CardCompliment>
                <CardComplimentTitle>
                  <CardComplimentTitleText selected>
                    Choose a compliment for your Frendlee!
                  </CardComplimentTitleText>
                </CardComplimentTitle>

                <CardComplimentRow>
                  <CardComplimentIcon
                    onPress={() => setCompliment('nice')}
                    selected={compliment === 'nice'}
                  >
                    <IconImage
                      selected={compliment === 'nice'}
                      source={require('../../../assets/frendlee-icon-vector.png')}
                    />
                    <CardComplimentText selected={compliment === 'nice'}>
                      Nice
                    </CardComplimentText>
                  </CardComplimentIcon>

                  <CardComplimentIcon
                    onPress={() => setCompliment('organized')}
                    selected={compliment === 'organized'}
                  >
                    <IconImage
                      selected={compliment === 'organized'}
                      source={require('../../../assets/frendlee-icon-cabinet.png')}
                    />
                    <CardComplimentText selected={compliment === 'organized'}>
                      Organized
                    </CardComplimentText>
                  </CardComplimentIcon>
                </CardComplimentRow>

                <CardComplimentRow>
                  <CardComplimentIcon
                    onPress={() => setCompliment('professional')}
                    selected={compliment === 'professional'}
                  >
                    <IconImage
                      selected={compliment === 'professional'}
                      source={require('../../../assets/frendlee-icon-tie.png')}
                    />
                    <CardComplimentText
                      selected={compliment === 'professional'}
                    >
                      Professional
                    </CardComplimentText>
                  </CardComplimentIcon>

                  <CardComplimentIcon
                    onPress={() => setCompliment('informed')}
                    selected={compliment === 'informed'}
                  >
                    <IconImage
                      selected={compliment === 'informed'}
                      source={require('../../../assets/frendlee-icon-book.png')}
                    />
                    <CardComplimentText selected={compliment === 'informed'}>
                      Informed
                    </CardComplimentText>
                  </CardComplimentIcon>
                </CardComplimentRow>

                <CardComplimentRow>
                  <CardComplimentIcon
                    onPress={() => setCompliment('effective')}
                    selected={compliment === 'effective'}
                  >
                    <IconImage
                      selected={compliment === 'effective'}
                      source={require('../../../assets/frendlee-icon-time.png')}
                    />
                    <CardComplimentText selected={compliment === 'effective'}>
                      Effective
                    </CardComplimentText>
                  </CardComplimentIcon>
                  <CardComplimentIcon
                    onPress={() => setCompliment('mannerly')}
                    selected={compliment === 'mannerly'}
                  >
                    <IconImage
                      selected={compliment === 'mannerly'}
                      source={require('../../../assets/frendlee-icon-shake-hands.png')}
                    />
                    <CardComplimentText selected={compliment === 'mannerly'}>
                      Mannerly
                    </CardComplimentText>
                  </CardComplimentIcon>
                </CardComplimentRow>
              </CardCompliment>

              <CardAction size="full">
                <CardActionButton
                  onPress={handleSubmit}
                  size="95%"
                  state={buttonState}
                >
                  <CardActionButtonText>SEND RATING</CardActionButtonText>
                </CardActionButton>
              </CardAction>
            </Card>
          </>
        );
      }

      case 'payed': {
        const {
          address,
          customer,
          detail,
          finish_at,
          observation,
          start_at,
          value,
        } = appointment;
        const dateClockStart = moment(start_at).format('HH');
        const dateClockFinish = moment(finish_at).format('HH[h]');
        const dateLong = moment(start_at).format('dddd, MMMM DD');
        const dateShort = `${dateClockStart} - ${dateClockFinish}`;

        return (
          <>
            <CustomerAvatar source={customer.avatar}>
              <CustomerName>
                <CustomerNameText>
                  {customer.name} {customer.lastname}
                </CustomerNameText>
              </CustomerName>
            </CustomerAvatar>

            <Card>
              <CardHeader>
                <CardHeaderText>{detail.service.name}</CardHeaderText>
                <CardHeaderSubText>{observation}</CardHeaderSubText>
              </CardHeader>

              <CardBody>
                <CardBodyItem>
                  <CardBodyItemIcon>
                    <IconClock />
                  </CardBodyItemIcon>
                  <CardBodyItemData>
                    <CardBodyItemText>{dateLong}</CardBodyItemText>
                    <CardBodyItemText>{dateShort}</CardBodyItemText>
                  </CardBodyItemData>
                </CardBodyItem>

                <CardBodyItemDivisor />

                <CardBodyItem>
                  <CardBodyItemIcon>
                    <IconAddress />
                  </CardBodyItemIcon>
                  <CardBodyItemData>
                    <CardBodyItemText>{address}</CardBodyItemText>
                  </CardBodyItemData>
                </CardBodyItem>
              </CardBody>

              <CardFooter color="#afaebf">
                <CardFooterText />
                <CardFooterText />
                <CardFooterText>${value}</CardFooterText>
              </CardFooter>

              <CardAction>
                <CardActionButton
                  color="#906dda"
                  onPress={() => handleAction('cancel')}
                  state
                >
                  <CardActionButtonText>CANCEL</CardActionButtonText>
                </CardActionButton>
                <CardActionButton
                  color="#7244D4"
                  onPress={() => handleAction('start')}
                  state
                >
                  <CardActionButtonText>START</CardActionButtonText>
                </CardActionButton>
              </CardAction>
            </Card>
          </>
        );
      }

      case 'started': {
        const {
          address,
          customer,
          detail,
          finish_at,
          observation,
          start_at,
          value,
        } = appointment;
        const dateClockStart = moment(start_at).format('HH');
        const dateClockFinish = moment(finish_at).format('HH[h]');
        const dateLong = moment(start_at).format('dddd, MMMM DD');
        const dateShort = `${dateClockStart} - ${dateClockFinish}`;

        return (
          <>
            <CustomerAvatar source={customer.avatar}>
              <CustomerName>
                <CustomerNameText>
                  {customer.name} {customer.lastname}
                </CustomerNameText>
              </CustomerName>
            </CustomerAvatar>

            <Card>
              <CardHeader>
                <CardHeaderText>{detail.service.name}</CardHeaderText>
                <CardHeaderSubText>{observation}</CardHeaderSubText>
              </CardHeader>

              <CardBody>
                <CardBodyItem>
                  <CardBodyItemIcon>
                    <IconClock />
                  </CardBodyItemIcon>
                  <CardBodyItemData>
                    <CardBodyItemText>{dateLong}</CardBodyItemText>
                    <CardBodyItemText>{dateShort}</CardBodyItemText>
                  </CardBodyItemData>
                </CardBodyItem>

                <CardBodyItemDivisor />

                <CardBodyItem>
                  <CardBodyItemIcon>
                    <IconAddress />
                  </CardBodyItemIcon>
                  <CardBodyItemData>
                    <CardBodyItemText>{address}</CardBodyItemText>
                  </CardBodyItemData>
                </CardBodyItem>
              </CardBody>

              <CardFooter>
                <IconHourglass />
                <CardFooterText>{clock}</CardFooterText>
                <CardFooterText>${value}</CardFooterText>
              </CardFooter>
            </Card>
          </>
        );
      }

      default:
        return null;
    }
  }

  return (
    <Container>
      <Header left="goBack" title={title} />

      <Content>{renderContent()}</Content>
    </Container>
  );
}
