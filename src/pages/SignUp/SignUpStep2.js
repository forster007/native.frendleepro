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
  const [services, setServices] = useState([]);

  const [buttonState, setButtonState] = useState(false);
  const [checked, setChecked] = useState(false);
  const [servicesCheckeds, setServicesCheckeds] = useState([]);
  const [pictureCertification, setPictureCertification] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    async function getServices() {
      const { data } = await api.get('/services');
      const obj = {};
      data.forEach(service => {
        obj[`service-${service.id}`] = false;
      });

      setServices(data);
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
    if (street && number && district && city && state && country) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [street, number, complement, district, city, state, country]);

  const handleNext = () => {
    const data = navigation.getParam('data');
    navigation.navigate('SignUpStep3', { data });
  };

  const checkService = service_id => {
    const ids = servicesCheckeds;

    const exists = ids.find(e => {
      return e.service_id === service_id;
    });

    if (!exists) {
      ids.push({ service_id, value: 0 });
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

  const renderServices = () => {
    return services.map(({ id: service_id, max_value, min_value, name }) => (
      <Div key={`service-${service_id}`} marginBottom>
        <Div direction="row">
          <Div width="8%">
            <TermsCheckBox
              checked={
                !!servicesCheckeds.find(e => e.service_id === service_id)
              }
              onPress={() => checkService(service_id)}
            />
          </Div>
          <Div justify="center" width="90%">
            <TouchableWithoutFeedback onPress={() => checkService(service_id)}>
              <BodyText>{name}.</BodyText>
            </TouchableWithoutFeedback>
          </Div>
        </Div>
        {!!servicesCheckeds.find(e => e.service_id === service_id) && (
          <Div align="center" direction="row" justify="space-between">
            <Slider
              maximumTrackTintColor="#497697"
              maximumValue={max_value}
              minimumTrackTintColor="#1ec5ea"
              minimumValue={min_value}
              onSlidingComplete={value => checkServiceValue(value, service_id)}
              step={1}
            />
            <Div
              align="flex-end"
              width={Platform.OS === 'android' ? '20%' : '30%'}
            >
              <BodyText size="20px">
                R$
                {servicesCheckeds.find(e => e.service_id === service_id).value}
                ,00
              </BodyText>
            </Div>
          </Div>
        )}
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
          <Divisor />

          <Div marginBottom>
            <Div direction="column" justify="flex-start" marginBottom>
              <InputTitle>Ocupation</InputTitle>
              <Input onChangeText={setStreet} value={street} />
            </Div>

            <Div direction="column" justify="flex-start" marginBottom>
              <InputTitle>Certification</InputTitle>
              <Div direction="row" justify="space-between">
                <Div width="20%">
                  <TouchableWithoutFeedback
                    onPress={() => handleSelectAvatar('pictureLicense')}
                  >
                    <FrendleeProfilePicture
                      source={{ uri: pictureCertification }}
                    />
                  </TouchableWithoutFeedback>
                </Div>

                <Div align="flex-start" justify="center" width="80%">
                  <BodyText>PDF or JPG files.</BodyText>
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
                  <BodyText>Enable to provide medical services.</BodyText>
                </TouchableWithoutFeedback>
              </Div>
            </Div>

            <Divisor marginTop="10px" />

            <Div marginBottom>
              <InputTitle>Activities, services and others stuffs</InputTitle>
              <BodyText>Types of services that I provide:</BodyText>
            </Div>

            <Div marginBottom>{renderServices()}</Div>

            <Divisor />

            <Div marginBotton>
              <ButtonNext state={false}>
                <ButtonNextText>NEXT STEP</ButtonNextText>
              </ButtonNext>
            </Div>
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
