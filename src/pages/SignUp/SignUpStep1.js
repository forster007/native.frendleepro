import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getAddress } from '../../services/address';
import { isEmail, isValidateBSN } from '../../services/helpers';
import {
  BlockBody,
  BlockFooter,
  BlockHeader,
  BodyText,
  BodyTitle,
  ButtonInput,
  ButtonNext,
  ButtonNextText,
  ButtonSignUpFacebook,
  ButtonSignUpFacebookIcon,
  ButtonSignUpFacebookText,
  Container,
  Content,
  Div,
  Divisor,
  FooterStep,
  FrendleeProfilePicture,
  Gender,
  GenderImage,
  GenderText,
  HeaderLogo,
  HeaderSubTitle,
  HeaderTitle,
  Input,
  InputDatePicker,
  InputIcon,
  InputTitle,
  StepNumber,
  StepText,
} from './styles';
import api from '../../services/api';

export default function SignUpStep1({ navigation }) {
  const { showActionSheetWithOptions } = useActionSheet();

  const bsnInputRef = useRef();
  const nameInputRef = useRef();
  const lastnameInputRef = useRef();
  const emailInputRef = useRef();
  const phoneInputRef = useRef();

  const [account_type] = useState('provider');
  const [pictureAddress, setPictureAddress] = useState('');
  const [pictureLicense, setPictureLicense] = useState('');
  const [pictureProfile, setPictureProfile] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [bsn, setBsn] = useState('');
  const [buttonState, setButtonState] = useState(false);
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [status] = useState('locked');

  const [city, setCity] = useState('');
  const [complement, setComplement] = useState('');
  const [country] = useState('Holland');
  const [district, setDistrict] = useState('');
  const [number, setNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');

  const [validBsn, setValidBsn] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  const handleAddress = useCallback(async () => {
    if (postalCode && number) {
      try {
        console.log('data ');
        const response = await getAddress(postalCode, number);
        console.log(`data:${postalCode} ${number} ${JSON.stringify(response)}`);
        const { data } = await getAddress(postalCode, number);

        setCity(data.city);
        setDistrict(data.municipality);
        setState(data.province);
        setStreet(data.street);
      } catch (error) {
        Alert.alert('WARNING', error.response.data.exception);

        setCity('');
        setDistrict('');
        setState('');
        setStreet('');
      }
    }
  });

  const handleAvatar = useCallback(async (option, result) => {
    const image = await ImageManipulator.manipulateAsync(result.uri, [], {
      compress: 0.5,
      format: ImageManipulator.SaveFormat.JPEG,
    });

    switch (option) {
      case 'pictureAddress':
        setPictureAddress(image.uri);
        break;
      case 'pictureLicense':
        setPictureLicense(image.uri);
        break;
      case 'pictureProfile':
        setPictureProfile(image.uri);
        break;
      default:
        break;
    }
  });

  const handleBSN = useCallback(async () => {
    if (bsn && bsn.length === 9 && isValidateBSN([...bsn])) {
      const { data } = await api.get(`/checks?field=bsn&value=${bsn}`);
      setValidBsn(data.available);

      if (data.available === false) {
        Alert.alert('WARNING', 'BSN already in use');
      }
    } else if (bsn && bsn.length === 9 && !isValidateBSN([...bsn])) {
      Alert.alert('WARNING', 'BSN invalid');
      setValidEmail(false);
    } else {
      setValidBsn(false);
    }
  });

  const handleEmail = useCallback(async () => {
    if (email && isEmail(email)) {
      const { data } = await api.get(`/checks?field=email&value=${email}`);
      setValidEmail(data.available);

      if (data.available === false) {
        Alert.alert('WARNING', 'EMAIL already in use');
      }
    } else if (email && !isEmail(email)) {
      Alert.alert('WARNING', 'EMAIL invalid');
      setValidEmail(false);
    } else {
      setValidEmail(false);
    }
  });

  const handleImage = useCallback(option => {
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

            handleAvatar(option, result);

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

            handleAvatar(option, result);

            break;
          default:
            break;
        }
      }
    );
  });

  const handleInput = e => {
    switch (e) {
      case 'bsn':
        return 'You forgot to fill in the BSN';
      case 'pictureAddress':
        return 'You forgot to fill in the Address Picture';
      case 'pictureLicense':
        return 'You forgot to fill in the License Picture';
      case 'pictureProfile':
        return 'You forgot to fill in the Profile Picture';
      case 'birthdate':
        return 'You forgot to fill in the Birthdate';
      case 'gender':
        return 'You forgot to fill in the Gender';
      case 'email':
        return 'You forgot to fill in the Email';
      case 'name':
        return 'You forgot to fill in the Name';
      case 'lastname':
        return 'You forgot to fill in the Lastname';
      case 'phone':
        return 'You forgot to fill in the Phone';
      case 'validBsn':
        return 'Your BSN is invalid';
      case 'validEmail':
        return 'Your EMAIL is invalid';
      case 'validPhone':
        return 'Your PHONE is invalid';
      case 'postalCode':
        return 'You forgot to fill in the Postal Code';
      case 'street':
        return 'You forgot to fill in the Street';
      case 'number':
        return 'You forgot to fill in the Number';
      case 'district':
        return 'You forgot to fill in the District';
      case 'city':
        return 'You forgot to fill in the City';
      case 'state':
        return 'You forgot to fill in the State';
      default:
        return 'You forgot to fill some field';
    }
  };

  const handleNext = useCallback(() => {
    if (
      pictureAddress &&
      pictureLicense &&
      pictureProfile &&
      birthdate &&
      bsn &&
      gender &&
      email &&
      name &&
      lastname &&
      phone &&
      validBsn &&
      validEmail &&
      validPhone &&
      postalCode &&
      street &&
      number &&
      district &&
      city &&
      state
    ) {
      const filenamePictureAddress = pictureAddress.split('/').pop();
      const filenamePictureLicense = pictureLicense.split('/').pop();
      const filenamePictureProfile = pictureProfile.split('/').pop();

      const data = {
        birthdate: `${birthdate}T00:00:00-03:00`,
        gender,
        lastname,
        name,
        phone_number: phone,
        phone_number_is_whatsapp: true,
        ssn: bsn,
        user: {
          account_type,
          email,
          status,
        },
        picture_address: {
          uri: pictureAddress,
          name: filenamePictureAddress,
          type: 'image/jpg',
        },
        picture_license: {
          uri: pictureLicense,
          name: filenamePictureLicense,
          type: 'image/jpg',
        },
        picture_profile: {
          uri: pictureProfile,
          name: filenamePictureProfile,
          type: 'image/jpg',
        },
        address: {
          postal_code: postalCode,
          street,
          number,
          complement,
          district,
          city,
          state,
          country,
        },
      };

      navigation.navigate('SignUpStep2', { data });
    } else {
      const items = [
        { state: bsn, string: 'bsn' },
        { state: validBsn, string: 'validBsn' },
        { state: pictureLicense, string: 'pictureLicense' },
        { state: pictureProfile, string: 'pictureProfile' },
        { state: name, string: 'name' },
        { state: lastname, string: 'lastname' },
        { state: email, string: 'email' },
        { state: validEmail, string: 'validEmail' },
        { state: phone, string: 'phone' },
        { state: validPhone, string: 'validPhone' },
        { state: birthdate, string: 'birthdate' },
        { state: gender, string: 'gender' },
        { state: pictureAddress, string: 'pictureAddress' },
        { state: postalCode, string: 'postalCode' },
        { state: number, string: 'number' },
        { state: street, string: 'street' },
        { state: district, string: 'district' },
        { state: city, string: 'city' },
        { state, string: 'state' },
      ];

      _.forEach(items, item => {
        if (item.state === '' || item.state === false) {
          Alert.alert('WARNING', handleInput(item.string));
          return false;
        }

        return true;
      });
    }
  });

  const handlePhone = useCallback(async () => {
    if (phone && phone.length >= 6) {
      const { data } = await api.get(
        `/checks?field=phone_number&value=${phone}`
      );
      setValidPhone(data.available);

      if (data.available === false) {
        Alert.alert('WARNING', 'PHONE already in use');
      }
    } else if (phone && phone.length < 6) {
      Alert.alert('WARNING', 'PHONE invalid');
      setValidPhone(false);
    } else {
      setValidPhone(false);
    }
  });

  useEffect(() => {
    if (bsn && bsn.length !== 9) {
      setValidBsn(false);
    }
  }, [bsn, validBsn]);

  useEffect(() => {
    if (email && !isEmail(email)) {
      setValidEmail(false);
    }
  }, [email, validEmail]);

  useEffect(() => {
    if (phone && phone.length < 6) {
      setValidPhone(false);
    }
  }, [phone, validPhone]);

  return (
    <Container>
      <Content>
        <BlockHeader>
          <HeaderLogo />
          <HeaderTitle>CREATE ACCOUNT</HeaderTitle>
        </BlockHeader>

        <BlockBody>
          <Div direction="row" justify="space-between">
            <BodyText weight="bold">Personal data</BodyText>
            <BodyText>
              Step <BodyText weight="bold">1</BodyText> of{' '}
              <BodyText weight="bold">3</BodyText>
            </BodyText>
          </Div>
          <HeaderSubTitle>
            Art party bitters twee humblebrag polaroid typewriter cold-pressed
            hammock direct trade photo booth shaman.
          </HeaderSubTitle>
          <ButtonSignUpFacebook>
            <ButtonSignUpFacebookText>
              Signup with Facebook
            </ButtonSignUpFacebookText>
            <ButtonSignUpFacebookIcon />
          </ButtonSignUpFacebook>

          <Divisor />

          <BodyTitle>Document</BodyTitle>
          <InputTitle>Type your BSN</InputTitle>
          <Div align="center" direction="row" marginBottom>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              maxLength={9}
              onBlur={handleBSN}
              onChangeText={setBsn}
              onSubmitEditing={() => nameInputRef.current.focus()}
              ref={bsnInputRef}
              returnKeyType="next"
              value={bsn}
            />
            <ButtonInput>
              <InputIcon
                color={validBsn ? '#1ec5ea' : '#e0e0e0'}
                icon="check-circle-o"
                size={30}
              />
            </ButtonInput>
          </Div>
          <Div direction="column" justify="flex-start">
            <InputTitle>Selfie with document</InputTitle>
            <Div direction="row" justify="space-between">
              <Div width="20%">
                <TouchableWithoutFeedback
                  onPress={() => handleImage('pictureLicense')}
                >
                  <FrendleeProfilePicture source={{ uri: pictureLicense }} />
                </TouchableWithoutFeedback>
              </Div>

              <Div align="center" justify="center" width="80%">
                <BodyText>
                  Take a picture of your face, holding your BSN open and close
                  to it.
                </BodyText>
              </Div>
            </Div>
          </Div>

          <Divisor />

          <BodyTitle>Profile</BodyTitle>
          <Div direction="column" justify="flex-start" marginBottom>
            <InputTitle>Profile selfie</InputTitle>
            <Div direction="row" justify="space-between">
              <Div width="20%">
                <TouchableWithoutFeedback
                  onPress={() => handleImage('pictureProfile')}
                >
                  <FrendleeProfilePicture source={{ uri: pictureProfile }} />
                </TouchableWithoutFeedback>
              </Div>

              <Div align="center" justify="center" width="80%">
                <BodyText>
                  Use a selfie where your face can be seen clearly, preferably.
                </BodyText>
              </Div>
            </Div>
          </Div>

          <Div direction="column" justify="flex-start" marginBottom>
            <InputTitle>Name</InputTitle>
            <Input
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={setName}
              onSubmitEditing={() => lastnameInputRef.current.focus()}
              ref={nameInputRef}
              returnKeyType="next"
              value={name}
            />
          </Div>

          <Div direction="column" justify="flex-start" marginBottom>
            <InputTitle>Lastname</InputTitle>
            <Input
              autoCapitalize="words"
              autoCorrect={false}
              onChangeText={setLastname}
              onSubmitEditing={() => emailInputRef.current.focus()}
              ref={lastnameInputRef}
              returnKeyType="next"
              value={lastname}
            />
          </Div>

          <Div direction="column" justify="flex-start" marginBottom>
            <InputTitle>E-mail</InputTitle>
            <Div align="center" direction="row">
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onBlur={handleEmail}
                onChangeText={setEmail}
                onSubmitEditing={() => phoneInputRef.current.focus()}
                ref={emailInputRef}
                returnKeyType="next"
                value={email}
              />
              <ButtonInput>
                <InputIcon
                  color={validEmail ? '#1ec5ea' : '#e0e0e0'}
                  icon="check-circle-o"
                  size={30}
                />
              </ButtonInput>
            </Div>
          </Div>

          <Div direction="row" justify="space-between" marginBottom>
            <Div width="48%">
              <InputTitle>Telephone</InputTitle>
              <Div align="center" direction="row">
                <Input
                  onBlur={handlePhone}
                  onChangeText={text => setPhone(text)}
                  ref={phoneInputRef}
                  keyboardType="numeric"
                  value={phone}
                />
                <ButtonInput>
                  <InputIcon
                    color={validPhone ? '#1ec5ea' : '#e0e0e0'}
                    icon="check-circle-o"
                    size={30}
                  />
                </ButtonInput>
              </Div>
            </Div>

            <Div width="48%">
              <InputTitle>Date of birth</InputTitle>
              <InputDatePicker onDateChange={setBirthdate} date={birthdate} />
            </Div>
          </Div>

          <Div direction="column" justify="flex-start">
            <InputTitle>Gender</InputTitle>
            <Div direction="row" justify="space-between">
              <Gender
                onPress={() => setGender('female')}
                genderSelected={gender === 'female'}
              >
                <GenderImage gender="female" />
                <GenderText genderSelected={gender === 'female'}>
                  Female
                </GenderText>
              </Gender>
              <Gender
                onPress={() => setGender('male')}
                genderSelected={gender === 'male'}
              >
                <GenderImage gender="male" />
                <GenderText genderSelected={gender === 'male'}>Male</GenderText>
              </Gender>
            </Div>
          </Div>

          <Divisor />

          <BodyTitle>Address</BodyTitle>

          <Div direction="column" justify="flex-start" marginBottom>
            <InputTitle>Address comprovement</InputTitle>
            <Div direction="row" justify="space-between">
              <Div width="20%">
                <TouchableWithoutFeedback
                  onPress={() => handleImage('pictureAddress')}
                >
                  <FrendleeProfilePicture source={{ uri: pictureAddress }} />
                </TouchableWithoutFeedback>
              </Div>

              <Div align="center" justify="center" width="80%">
                <BodyText>
                  You can attach electricity, water or cable TV bills, in PDF or
                  JPG format.
                </BodyText>
              </Div>
            </Div>
          </Div>

          <Div direction="row" justify="space-between" marginBottom>
            <Div width="48%">
              <InputTitle>Postcode</InputTitle>
              <Input
                autoCapitalize="characters"
                maxLength={6}
                minLength={6}
                onBlur={handleAddress}
                onChangeText={setPostalCode}
                value={postalCode}
              />
            </Div>

            <Div width="48%">
              <InputTitle>House number</InputTitle>
              <Input
                keyboardType="numeric"
                onBlur={handleAddress}
                onChangeText={setNumber}
                value={number}
              />
            </Div>
          </Div>

          <Div direction="column" justify="flex-start" marginBottom>
            <InputTitle>Street</InputTitle>
            <Input
              disabled
              editable={false}
              onChangeText={setStreet}
              value={street}
            />
          </Div>

          <Div direction="column" justify="flex-start" marginBottom>
            <InputTitle>Complement</InputTitle>
            <Input onChangeText={setComplement} value={complement} />
          </Div>

          <Div direction="row" justify="space-between" marginBottom>
            <Div width="48%">
              <InputTitle>District</InputTitle>
              <Input
                disabled
                editable={false}
                onChangeText={setDistrict}
                value={district}
              />
            </Div>

            <Div width="48%">
              <InputTitle>City</InputTitle>
              <Input
                disabled
                editable={false}
                onChangeText={setCity}
                value={city}
              />
            </Div>
          </Div>

          <Div direction="column" justify="flex-start">
            <InputTitle>State</InputTitle>
            <Input
              disabled
              editable={false}
              onChangeText={setState}
              value={state}
            />
          </Div>

          <Divisor />

          <Div direction="column" marginBottom>
            <ButtonNext state onPress={handleNext}>
              <ButtonNextText>NEXT STEP</ButtonNextText>
            </ButtonNext>
          </Div>
        </BlockBody>

        <BlockFooter>
          <FooterStep selected>
            <StepNumber selected>1</StepNumber>
            <StepText>Profile</StepText>
          </FooterStep>
          <FooterStep>
            <StepNumber>2</StepNumber>
          </FooterStep>
          <FooterStep>
            <StepNumber>3</StepNumber>
          </FooterStep>
        </BlockFooter>
      </Content>
    </Container>
  );
}
