import Moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import api from '../../services/api';
import { updateProvider, updateProviderImages } from '../../services/providers';
import { Header } from '../../components';
import {
  Block,
  ButtonSubmit,
  ButtonSubmitText,
  Container,
  Content,
  Divisor,
  FormGroup,
  H1,
  Input,
  InputDatePicker,
  InputIcon,
  KeyboardAvoidingView,
  Label,
  LabelImage,
  ProfileImage,
  Row,
} from './styles';

export default function ProfileUpdate({ navigation }) {
  const nameInputRef = useRef();
  const lastnameInputRef = useRef();
  const phoneInputRef = useRef();
  const { showActionSheetWithOptions } = useActionSheet();
  const [loading, setLoading] = useState(false);
  const [provider] = useState({ ...navigation.state.params.profile });
  const [pictureProfile, setPictureProfile] = useState(provider.avatar.uri);
  const [birthdate, setBirthdate] = useState(
    Moment(provider.birthdate)
      .utc()
      .format('ll')
  );
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [lastname, setLastname] = useState(provider.lastname);
  const [name, setName] = useState(provider.name);
  const [phone_number, setPhoneNumber] = useState(provider.phone_number);
  const [validName, setValidName] = useState(true);
  const [validLastname, setValidLastname] = useState(true);
  const [validPhone, setValidPhone] = useState(true);

  const handleAvatar = useCallback(async result => {
    const image = await ImageManipulator.manipulateAsync(result.uri, [], {
      compress: 0.5,
      format: ImageManipulator.SaveFormat.JPEG,
    });

    setPictureProfile(image.uri);
  });

  const handleDatePicker = useCallback(date => {
    if (date)
      setBirthdate(
        Moment(date)
          .utc()
          .format('ll')
      );
    setDatePickerVisible(false);
  });

  const handleImage = useCallback(() => {
    const options = ['Take a picture', 'Find on galery', 'Cancel'];
    const cancelIndex = 2;

    showActionSheetWithOptions({ options, cancelIndex }, async i => {
      switch (i) {
        case 0: {
          const { status } = await Permissions.askAsync(Permissions.CAMERA);

          if (status !== 'granted') {
            Alert.alert('Warning!', 'Sorry - We need camera roll permissions to make this work');
            break;
          }

          const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
          });

          if (!result.cancelled) handleAvatar(result);
          break;
        }

        case 1: {
          const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

          if (status !== 'granted') {
            Alert.alert('Warning!', 'Sorry - We need camera roll permissions to make this work');
            break;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.4,
          });

          if (!result.cancelled) handleAvatar(result);
          break;
        }

        default:
          break;
      }
    });
  });

  const handleLastname = useCallback(async () => {
    if (name && name.length >= 2) {
      setValidLastname(true);
    } else {
      Alert.alert('WARNING', 'LASTNAME invalid');
      setValidLastname(false);
    }
  });

  const handleName = useCallback(async () => {
    if (name && name.length >= 2) {
      setValidName(true);
    } else {
      Alert.alert('WARNING', 'NAME invalid');
      setValidName(false);
    }
  });

  const handlePhone = useCallback(async () => {
    if (phone === provider.phone_number) {
      setValidPhone(true);
    } else if (phone && phone.length >= 6) {
      const { data } = await api.get(`/checks?field=phone_number&value=${phone}`);
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

  const handleUpdate = useCallback(async () => {
    setLoading(true);

    if (
      !Moment(birthdate).isSame(provider.birthdate) ||
      lastname !== provider.lastname ||
      name !== provider.name ||
      phone_number !== provider.phone_number ||
      pictureProfile !== provider.avatar.uri
    ) {
      if (validName && validLastname && validPhone) {
        await updateProvider({ birthdate, name, lastname, phone_number });
      }

      if (provider.avatar.uri !== pictureProfile) {
        const formData = new FormData();

        formData.append('picture_profile', {
          uri: pictureProfile,
          name: pictureProfile.split('/').pop(),
          type: 'image/jpg',
        });

        await updateProviderImages(provider.id, formData);
      }

      Alert.alert('SUCCESS', 'Profile updated!', [{ text: 'Ok', onPress: () => navigation.goBack() }], {
        cancelable: false,
      });
    } else {
      Alert.alert(
        'WARNING',
        'Nothing has change. Profile not updated!',
        [{ text: 'Ok', onPress: () => setLoading(false) }],
        { cancelable: false }
      );
    }
  });

  return (
    <Container>
      <Header left="goBack" title="Profile Update" />

      <KeyboardAvoidingView>
        <Content>
          <Block>
            <H1>Document</H1>
            <FormGroup>
              <Label>BSN registered</Label>
              <Input disabled value={provider.ssn} />
            </FormGroup>
          </Block>

          <Divisor />

          <Block>
            <H1>Profile</H1>

            <Row>
              <FormGroup>
                <Label>Profile selfie</Label>
                <Row>
                  <TouchableWithoutFeedback onPress={handleImage}>
                    <ProfileImage source={{ uri: pictureProfile }} />
                  </TouchableWithoutFeedback>

                  <FormGroup width="60%">
                    <LabelImage>Use a selfie where your face can be seen clearly, preferably.</LabelImage>
                  </FormGroup>
                </Row>
              </FormGroup>
            </Row>

            <Row>
              <FormGroup>
                <Label>Name</Label>
                <Input
                  autoCapitalize="words"
                  autoCorrect={false}
                  onBlur={handleName}
                  onChangeText={setName}
                  onSubmitEditing={() => lastnameInputRef.current.focus()}
                  ref={nameInputRef}
                  returnKeyType="next"
                  value={name}
                />
                <InputIcon icon="check-circle-o" size={30} valid={validName} />
              </FormGroup>
            </Row>

            <Row>
              <FormGroup>
                <Label>Lastname</Label>
                <Input
                  autoCapitalize="words"
                  autoCorrect={false}
                  onBlur={handleLastname}
                  onChangeText={setLastname}
                  onSubmitEditing={() => phoneInputRef.current.focus()}
                  ref={lastnameInputRef}
                  returnKeyType="next"
                  value={lastname}
                />
                <InputIcon icon="check-circle-o" size={30} valid={validLastname} />
              </FormGroup>
            </Row>

            <Row>
              <FormGroup>
                <Label>E-mail registered</Label>
                <Input disabled value={provider.user.email} />
              </FormGroup>
            </Row>

            <Row>
              <FormGroup width="48%">
                <Label>Telephone</Label>
                <Input
                  onBlur={handlePhone}
                  onChangeText={e => setPhoneNumber(e)}
                  ref={phoneInputRef}
                  keyboardType="numeric"
                  value={phone_number}
                />
                <InputIcon icon="check-circle-o" size={30} valid={validPhone} />
              </FormGroup>

              <FormGroup width="48%">
                <Label>Date of birth</Label>
                <TouchableOpacity activeOpacity={1} onPress={() => setDatePickerVisible(true)}>
                  <View pointerEvents="none">
                    <Input colored disabled value={birthdate} />
                  </View>
                  <InputIcon icon="calendar" size={24} style={{ right: 12, top: 12 }} valid />
                </TouchableOpacity>

                <InputDatePicker
                  isVisible={isDatePickerVisible}
                  onCancel={handleDatePicker}
                  onConfirm={handleDatePicker}
                />
              </FormGroup>
            </Row>

            <Row>
              <ButtonSubmit disabled={loading} onPress={handleUpdate}>
                {loading ? <ActivityIndicator /> : <ButtonSubmitText>UPDATE PROFILE</ButtonSubmitText>}
              </ButtonSubmit>
            </Row>
          </Block>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
