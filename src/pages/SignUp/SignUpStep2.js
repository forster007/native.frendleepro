import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, TouchableWithoutFeedback } from 'react-native';
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
  BodyTitle,
  ButtonNext,
  ButtonNextText,
  Container,
  Content,
  Div,
  Divisor,
  FooterStep,
  FrendleeProfilePicture,
  HeaderLogo,
  HeaderSubTitle,
  HeaderTitle,
  Input,
  InputTitle,
  Slider,
  StepNumber,
  StepText,
  TermsCheckBox,
} from './styles';

import api from '~/services/api';

export default function SignUpStep2({ navigation }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [clocks, setClocks] = useState([]);
  const [periods, setPeriods] = useState([]);
  const [services, setServices] = useState([]);
  const [stuffs, setStuffs] = useState([]);

  const [pictureCertification, setPictureCertification] = useState('');
  const [ocupation, setOcupation] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [checked, setChecked] = useState(false);
  const [clocksCheckeds, setClocksCheckeds] = useState([]);
  const [periodsCheckeds, setPeriodsCheckeds] = useState([]);
  const [servicesCheckeds, setServicesCheckeds] = useState([]);
  const [stuffsCheckeds, setStuffsCheckeds] = useState([]);

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

  const selectImage = async (option, result) => {
    const image = await ImageManipulator.manipulateAsync(result.uri, [], {
      compress: 0.5,
      format: ImageManipulator.SaveFormat.JPEG,
    });

    switch (option) {
      case 'pictureCertification':
        setPictureCertification(image.uri);
        break;
      default:
        break;
    }
  };

  const handleSelectAvatar = useCallback(option => {
    const options = ['Tirar foto', 'Buscar da galeria', 'Cancelar'];
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
              const { status } = await Permissions.askAsync(
                Permissions.CAMERA,
                Permissions.CAMERA_ROLL
              );

              if (status !== 'granted') {
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
              quality: 0.8,
            });

            if (result.cancelled) {
              break;
            }

            selectImage(option, result);

            break;
          case 1:
            if (Constants.platform.ios) {
              const { status } = await Permissions.askAsync(
                Permissions.CAMERA_ROLL
              );

              if (status !== 'granted') {
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
              quality: 0.8,
            });

            if (result.cancelled) {
              break;
            }

            selectImage(option, result);

            break;
          default:
            break;
        }
      }
    );
  }, []);

  useEffect(() => {
    if (
      clocksCheckeds.length >= 1 &&
      periodsCheckeds.length >= 1 &&
      servicesCheckeds.length >= 1 &&
      stuffsCheckeds.length >= 1
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [clocksCheckeds, periodsCheckeds, servicesCheckeds, stuffsCheckeds]);

  const handleNext = () => {
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

    navigation.navigate('SignUpStep3', { data });
  };

  const checkClock = clock_id => {
    const ids = clocksCheckeds;

    const exists = ids.find(e => {
      return e === clock_id;
    });

    if (!exists) {
      ids.push(clock_id);
    } else {
      const index = ids.findIndex(e => e === clock_id);
      ids.splice(index, 1);
    }

    setClocksCheckeds([...ids]);
  };

  const checkPeriod = period_id => {
    const ids = periodsCheckeds;

    const exists = ids.find(e => {
      return e === period_id;
    });

    if (!exists) {
      ids.push(period_id);
    } else {
      const index = ids.findIndex(e => e === period_id);
      ids.splice(index, 1);
    }

    setPeriodsCheckeds([...ids]);
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
            checked={!!clocksCheckeds.find(e => e === id)}
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
            checked={!!periodsCheckeds.find(e => e === id)}
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
                R$
                {servicesCheckeds.find(e => e.service_id === id).value}
                ,00
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
        <BlockHeader>
          <HeaderLogo />
          <HeaderTitle>CREATE ACCOUNT</HeaderTitle>
        </BlockHeader>

        <BlockBody>
          <Div direction="row" justify="space-between">
            <BodyText weight="bold">Professional data</BodyText>
            <BodyText>
              Step <BodyText weight="bold">2</BodyText> of{' '}
              <BodyText weight="bold">3</BodyText>
            </BodyText>
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
                <TouchableWithoutFeedback
                  onPress={() => handleSelectAvatar('pictureCertification')}
                >
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
            <BodyText>Periods:</BodyText>
          </Div>
          <Div marginBottom>{renderClocks()}</Div>

          <Div marginBottom>
            <BodyText>Hours:</BodyText>
          </Div>
          <Div>{renderPeriods()}</Div>

          <Divisor />

          <Div marginBotton>
            <ButtonNext state={buttonState} onPress={handleNext}>
              <ButtonNextText>NEXT STEP</ButtonNextText>
            </ButtonNext>
          </Div>
        </BlockBody>

        <BlockFooter>
          <FooterStep selected>
            <StepNumber>1</StepNumber>
          </FooterStep>
          <FooterStep selected>
            <StepNumber selected>2</StepNumber>
            <StepText>Professional</StepText>
          </FooterStep>
          <FooterStep>
            <StepNumber>3</StepNumber>
          </FooterStep>
        </BlockFooter>
      </Content>
    </Container>
  );
}
