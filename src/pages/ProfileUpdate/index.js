import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import { useSelector } from 'react-redux';
import Constants from 'expo-constants';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { getAddress } from '../../services/address';
import {
  BlockBody,
  BlockFooter,
  BlockHeader,
  BodyText,
  BodyTitle,
  ButtonInput,
  ButtonNext,
  ButtonNextText,
  Container,
  Content,
  Div,
  Divisor,
  FrendleeProfilePicture,
  Gender,
  GenderImage,
  GenderText,
  HeaderLogo,
  HeaderTitle,
  Input,
  InputDatePicker,
  InputIcon,
  InputTitle,
} from './styles';
import api from '../../services/api';
import { updateProvider } from '../../services/providers';

export default function ProfileUpdate({ navigation }) {
  const { showActionSheetWithOptions } = useActionSheet();

  const { user } = useSelector(state => state.auth);
  const nameInputRef = useRef();
  const lastnameInputRef = useRef();
  const phoneInputRef = useRef();

  const [pictureProfile, setPictureProfile] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [buttonState, setButtonState] = useState(true);
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');

  const [city, setCity] = useState('');
  const [complement, setComplement] = useState('');
  const [country] = useState('Holland');
  const [district, setDistrict] = useState('');
  const [number, setNumber] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [street, setStreet] = useState('');
  const [profile, setProfile] = useState([]);

  const [validPhone, setValidPhone] = useState(true);

  const handleAddress = useCallback(async () => {
    if (postalCode && number) {
      try {
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

    setPictureProfile(image.uri);
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

  const updateProfile = useCallback(async () => {
    const filenamePictureProfile = pictureProfile.split('/').pop();

    const data = {
      birthdate: `${birthdate}T00:00:00-03:00`,
      gender,
      lastname,
      name,
      phone_number: phone,
      phone_number_is_whatsapp: true,

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

    const response = await updateProvider(data);
    console.log(response);
    navigation.goBack();
  });

  const handlePhone = useCallback(async () => {
    if (phone && phone.length >= 6) {
      const { data } = await api.get(
        `/checks?field=phone_number&value=${phone}`
      );
      console.log(`available ${data.available}`);
      console.log(`phoneInputRef ${profile.phone_number}`);
      console.log(profile.phone_number === phone);

      const availablePhone = data.available || phone === profile.phone_number;
      console.log(availablePhone);
      setValidPhone(availablePhone);
      console.log(`valid ${validPhone}`);

      if (!validPhone) {
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
    if (phone && phone.length < 6) {
      setValidPhone(false);
    }
  }, [phone, validPhone]);

  useEffect(() => {
    setProfile(navigation.getParam('profile'));
    console.log(`here${JSON.stringify(profile)}`);
    setName(profile.name);
    setLastname(profile.lastname);
    setPhone(profile.phone_number);
    setBirthdate(profile.birthdate);
    setPostalCode(profile.ssn);
    setGender(profile.gender);
  }, [name, lastname]);

  useEffect(() => {
    if (
      pictureProfile &&
      birthdate &&
      gender &&
      name &&
      lastname &&
      phone &&
      validPhone
      // && postalCode &&
      // street &&
      // number &&
      // district &&
      // city &&
      // state
    ) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [
    pictureProfile,
    birthdate,
    gender,
    name,
    lastname,
    phone,
    validPhone,
    postalCode,
    street,
    number,
    district,
    city,
    state,
  ]);

  return (
    <Container>
      <Content>
        <BlockHeader>
          <HeaderLogo />
          <HeaderTitle>PROFILE EDIT</HeaderTitle>
        </BlockHeader>

        <BlockBody>
          <BodyTitle>Document</BodyTitle>
          <InputTitle>Type your BSN</InputTitle>
          <Div align="center" direction="row" marginBottom>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              maxLength={9}
              onSubmitEditing={() => nameInputRef.current.focus()}
              returnKeyType="next"
              value={profile.ssn}
              disabled
            />
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
              onSubmitEditing={() => phoneInputRef.current.focus()}
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
                onSubmitEditing={() => phoneInputRef.current.focus()}
                returnKeyType="next"
                value={user.email}
                disabled
              />
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
            <ButtonNext state={buttonState} onPress={updateProfile}>
              <ButtonNextText>SAVE CHANGES</ButtonNextText>
            </ButtonNext>
          </Div>
        </BlockBody>
      </Content>
    </Container>
  );
}
