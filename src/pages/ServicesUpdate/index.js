import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, TouchableWithoutFeedback, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useActionSheet } from '@expo/react-native-action-sheet';

import {
  BlockBody,
  BlockFooter,
  BlockHeader,
  BodyText,
  ButtonNext,
  ButtonNextText,
  Container,
  Content,
  Div,
  Divisor,
  FrendleeProfilePicture,
  HeaderLogo,
  HeaderSubTitle,
  HeaderTitle,
  Input,
  InputTitle,
  Slider,
  TermsCheckBox,
} from './styles';
import api from '../../services/api';
import { updateProvider } from '../../services/providers';
import { Header } from '~/components';

export default function ServicesUpdate({ navigation }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [clocks, setClocks] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [services, setServices] = useState([]);
  const [stuffs, setStuffs] = useState([]);

  const [pictureCertification, setPictureCertification] = useState('');
  const [ocupation, setOcupation] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [checked, setChecked] = useState(false);
  const [clocksCheckeds, setClocksCheckeds] = useState();
  const [periodsCheckeds, setPeriodsCheckeds] = useState();
  const [servicesCheckeds, setServicesCheckeds] = useState([]);
  const [stuffsCheckeds, setStuffsCheckeds] = useState([]);

  const [profile, setProfile] = useState([]);

  useEffect(() => {
    setProfile(navigation.getParam('profile'));
    console.log(`profile: ${JSON.stringify(profile)}`);
    setOcupation(profile.formation);
  }, [ocupation]);

  useEffect(() => {
    if (ocupation && true) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [ocupation]);

  useEffect(() => {
    async function getServices() {
      const { data: a } = await api.get('/clocks');
      const { data: b } = await api.get('/periods');
      const { data: c } = await api.get('/services');
      const { data: d } = await api.get('/stuffs');

      setClocks(a);
      setPeriods(b);
      setServices(c);
      setStuffs(d);
    }

    getServices();
  }, []);

  const handleAvatar = useCallback(async result => {
    const image = await ImageManipulator.manipulateAsync(result.uri, [], {
      compress: 0.4,
      format: ImageManipulator.SaveFormat.JPEG,
    });

    setPictureCertification(image.uri);
  });

  const handleImage = useCallback(() => {
    const options = ['Take a picture', 'Find on galery', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async buttonIndex => {
        let result;

        switch (buttonIndex) {
          case 0:
            if (Constants.platform.ios) {
              const perm = await Permissions.askAsync(
                Permissions.CAMERA,
                Permissions.CAMERA_ROLL
              );

              if (perm.status !== 'granted') {
                Alert.alert(
                  'Eita!',
                  'Precisamos da permissão da câmera para você tirar uma foto'
                );
                break;
              }
            }

            result = await ImagePicker.launchCameraAsync({
              mediaTypes: 'Images',
              aspect: [1, 1],
              allowsEditing: true,
              quality: 0.4,
            });

            if (result.cancelled) {
              break;
            }

            handleAvatar(result);

            break;
          case 1:
            if (Constants.platform.ios) {
              const perm = await Permissions.askAsync(Permissions.CAMERA_ROLL);

              if (perm.status !== 'granted') {
                Alert.alert(
                  'Eita!',
                  'Precisamos da permissão da galeria para selecionar uma imagem'
                );
                break;
              }
            }

            result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: 'Images',
              aspect: [1, 1],
              allowsEditing: true,
              quality: 0.4,
            });

            if (result.cancelled) {
              break;
            }

            handleAvatar(result);

            break;
          default:
            break;
        }
      }
    );
  });

  const handleInput = e => {
    switch (e) {
      case 'clocksCheckeds':
        return 'You need to fill at least one Availability Clock';
      case 'periodsCheckeds':
        return 'You need to fill at least one Availability Period';
      case 'servicesCheckeds':
        return 'You need to fill at least one Service to Provide';
      case 'stuffsCheckeds':
        return 'You need to fill at least one Stuff';
      default:
        return 'You forgot to fill some field';
    }
  };

  const updateServices = useCallback(async () => {
    if (
      clocksCheckeds &&
      periodsCheckeds &&
      servicesCheckeds.length >= 1 &&
      stuffsCheckeds.length >= 1
    ) {
      const data = navigation.getParam('data');

      if (pictureCertification) {
        const filenamePictureCertification = pictureCertification
          .split('/')
          .pop();
        data.picture_certification = {
          uri: pictureCertification,
          name: filenamePictureCertification,
          type: 'image/jpg',
        };
      }

      data.formation = ocupation;
      data.is_medical_provider = checked;
      data.provider_clocks = clocksCheckeds;
      data.provider_periods = periodsCheckeds;
      data.provider_services = servicesCheckeds;
      data.provider_stuffs = stuffsCheckeds;

      // const response = await updateProvider(data);
      // console.log(response);

      navigation.goBack();
    } else {
      const items = [
        { state: servicesCheckeds, string: 'servicesCheckeds' },
        { state: stuffsCheckeds, string: 'stuffsCheckeds' },
        { state: clocksCheckeds, string: 'clocksCheckeds' },
        { state: periodsCheckeds, string: 'periodsCheckeds' },
      ];

      _.forEach(items, item => {
        if (
          item.state === '' ||
          item.state === undefined ||
          item.state.length === 0
        ) {
          Alert.alert('WARNING', handleInput(item.string));
          return false;
        }

        return true;
      });
    }
  });

  const checkClock = clock_id => {
    setClocksCheckeds(clock_id);
  };

  const checkPeriod = period_id => {
    setPeriodsCheckeds(period_id);
  };

  const checkService = service_id => {
    const ids = servicesCheckeds;

    const exists = ids.find(e => {
      return e.service_id === service_id;
    });

    if (!exists) {
      ids.push({
        service_id,
        value: services.find(e => e.id === service_id).min_value,
      });
    } else {
      const index = ids.findIndex(e => e.service_id === service_id);
      ids.splice(index, 1);
    }

    setServicesCheckeds([...ids]);
  };

  const checkServiceValue = (value, service_id) => {
    const ids = servicesCheckeds;
    const index = ids.findIndex(e => e.service_id === service_id);
    ids[index].value = value;

    setServicesCheckeds([...ids]);
  };

  const checkStuff = stuff_id => {
    const ids = stuffsCheckeds;

    const exists = ids.find(e => {
      return e === stuff_id;
    });

    if (!exists) {
      ids.push(stuff_id);
    } else {
      const index = ids.findIndex(e => e === stuff_id);
      ids.splice(index, 1);
    }

    setStuffsCheckeds([...ids]);
  };

  const renderClocks = () => {
    return clocks.map(({ id, name }) => (
      <Div direction="row" key={`clock-${id}`}>
        <Div width="8%">
          <TermsCheckBox
            checked={clocksCheckeds === id}
            onPress={() => checkClock(id)}
          />
        </Div>
        <Div justify="center" width="90%">
          <TouchableWithoutFeedback onPress={() => checkClock(id)}>
            <BodyText>{name}</BodyText>
          </TouchableWithoutFeedback>
        </Div>
      </Div>
    ));
  };

  const renderPeriods = () => {
    return periods.map(({ id, name }) => (
      <Div direction="row" key={`period-${id}`}>
        <Div width="8%">
          <TermsCheckBox
            checked={periodsCheckeds === id}
            onPress={() => checkPeriod(id)}
          />
        </Div>
        <Div justify="center" width="90%">
          <TouchableWithoutFeedback onPress={() => checkPeriod(id)}>
            <BodyText>{name}</BodyText>
          </TouchableWithoutFeedback>
        </Div>
      </Div>
    ));
  };

  const renderServices = () => {
    return services.map(({ id, max_value, min_value, name }) => (
      <Div key={`service-${id}`}>
        <Div direction="row">
          <Div width="8%">
            <TermsCheckBox
              checked={!!servicesCheckeds.find(e => e.service_id === id)}
              onPress={() => checkService(id)}
            />
          </Div>
          <Div justify="center" width="90%">
            <TouchableWithoutFeedback onPress={() => checkService(id)}>
              <BodyText>{name}</BodyText>
            </TouchableWithoutFeedback>
          </Div>
        </Div>
        {!!servicesCheckeds.find(e => e.service_id === id) && (
          <Div align="center" direction="row" justify="space-between">
            <Slider
              maximumTrackTintColor="#497697"
              maximumValue={max_value}
              minimumTrackTintColor="#1ec5ea"
              minimumValue={min_value}
              onSlidingComplete={value => checkServiceValue(value, id)}
              step={1}
            />
            <Div
              align="flex-end"
              width={Platform.OS === 'android' ? '20%' : '30%'}
            >
              <BodyText size="20px">
                € {servicesCheckeds.find(e => e.service_id === id).value},00
              </BodyText>
            </Div>
          </Div>
        )}
      </Div>
    ));
  };

  const renderStuffs = () => {
    return stuffs.map(({ id, name }) => (
      <Div direction="row" key={`stuff-${id}`}>
        <Div width="8%">
          <TermsCheckBox
            checked={!!stuffsCheckeds.find(e => e === id)}
            onPress={() => checkStuff(id)}
          />
        </Div>
        <Div justify="center" width="90%">
          <TouchableWithoutFeedback onPress={() => checkStuff(id)}>
            <BodyText>{name}</BodyText>
          </TouchableWithoutFeedback>
        </Div>
      </Div>
    ));
  };

  return (
    <Container>
      <Content>
        <Header left="goBack" title="Profile Services" />

        <BlockBody>
          <Div direction="row" justify="space-between">
            <BodyText weight="bold">Professional data</BodyText>
          </Div>
          <HeaderSubTitle>
            Art party bitters twee humblebrag polaroid typewriter cold-pressed
            hammock direct trade photo booth shaman.
          </HeaderSubTitle>
          <Divisor marginTop="15px" />

          <Div direction="column" justify="flex-start" marginBottom>
            <InputTitle>Ocupation</InputTitle>
            <Input onChangeText={setOcupation} value={ocupation} />
          </Div>

          <Div direction="column" justify="flex-start" marginBottom>
            <InputTitle>Certification</InputTitle>
            <Div direction="row" justify="space-between">
              <Div width="20%">
                <TouchableWithoutFeedback onPress={handleImage}>
                  <FrendleeProfilePicture
                    source={{ uri: pictureCertification }}
                  />
                </TouchableWithoutFeedback>
              </Div>

              <Div align="flex-start" justify="center" width="80%">
                <BodyText>PDF or JPG files</BodyText>
              </Div>
            </Div>
          </Div>

          <Div direction="row">
            <Div width="8%">
              <TermsCheckBox
                checked={checked}
                onPress={() => setChecked(!checked)}
              />
            </Div>
            <Div justify="center" width="90%">
              <TouchableWithoutFeedback onPress={() => setChecked(!checked)}>
                <BodyText>Enable to provide medical services</BodyText>
              </TouchableWithoutFeedback>
            </Div>
          </Div>

          <Divisor marginTop="10px" />

          <Div marginBottom>
            <InputTitle>Activities, services and others stuffs</InputTitle>
            <BodyText>Types of services that I provide:</BodyText>
          </Div>
          <Div marginBottom>{renderServices()}</Div>

          <Div marginBottom>
            <BodyText>What I like more:</BodyText>
          </Div>
          <Div marginBottom>{renderStuffs()}</Div>

          <Div marginBottom>
            <InputTitle>Availability</InputTitle>
            <BodyText>Clocks:</BodyText>
          </Div>
          <Div marginBottom>{renderClocks()}</Div>

          <Div marginBottom>
            <BodyText>Periods:</BodyText>
          </Div>
          <Div>{renderPeriods()}</Div>
        </BlockBody>

        <BlockFooter>
          <ButtonNext state={buttonState} onPress={updateServices}>
            <ButtonNextText>SAVE CHANGES</ButtonNextText>
          </ButtonNext>
        </BlockFooter>
      </Content>
    </Container>
  );
}
