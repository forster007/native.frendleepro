import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Permissions from 'expo-permissions';
import { updateProvider, updateProviderImages } from '../../services/providers';
import api from '../../services/api';
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
  KeyboardAvoidingView,
  Label,
  LabelImage,
  ProfileImage,
  Row,
} from './styles';

export default function ProfileUpdate({ navigation }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const [loading, setLoading] = useState(false);
  const [profile] = useState({ ...navigation.state.params.profile });
  const [pictureProfile, setPictureProfile] = useState(profile.avatar.uri);
  const { token } = useSelector(state => state.auth);

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

  const handleUpdate = useCallback(async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('picture_profile', pictureProfile);

      console.log(formData);

      // const { data: provider } = await updateProvider('/providers', data);

      // await updateProviderImages(profile.id, formData);
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      await api.post(`/providers/${profile.id}/files`, formData);

      Alert.alert(
        'SUCCESS',
        'Profile updated!',
        [{ text: 'Ok', onPress: () => navigation.goBack() }],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  });

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  return (
    <Container>
      <Header left="goBack" title="Profile Update" />

      <KeyboardAvoidingView>
        <Content>
          <Block>
            <H1>Document</H1>
            <FormGroup>
              <Label>BSN registered</Label>
              <Input disabled value={profile.ssn} />
            </FormGroup>
          </Block>

          <Divisor />

          <Block>
            <H1>Profile</H1>

            <Row>
              <FormGroup>
                <Label>Profile selfie</Label>
                <Row>
                  <TouchableWithoutFeedback
                    onPress={() => handleImage('pictureProfile')}
                  >
                    <ProfileImage source={{ uri: pictureProfile }} />
                  </TouchableWithoutFeedback>

                  <FormGroup width="60%">
                    <LabelImage>
                      Use a selfie where your face can be seen clearly,
                      preferably.
                    </LabelImage>
                  </FormGroup>
                </Row>
              </FormGroup>
            </Row>

            <Row>
              <FormGroup>
                <Label>Name</Label>
                <Input value={profile.name} />
              </FormGroup>
            </Row>

            <Row>
              <FormGroup>
                <Label>Lastname</Label>
                <Input value={profile.lastname} />
              </FormGroup>
            </Row>

            <Row>
              <FormGroup>
                <Label>E-mail registered</Label>
                <Input disabled value={profile.user.email} />
              </FormGroup>
            </Row>

            <Row>
              <FormGroup width="48%">
                <Label>Telephone</Label>
                <Input value={profile.phone_number} />
              </FormGroup>

              <FormGroup width="48%">
                <Label>Date of birth</Label>
                <Input />
              </FormGroup>
            </Row>

            <Row>
              <ButtonSubmit disabled={loading} onPress={handleUpdate}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <ButtonSubmitText>UPDAT PROFILE</ButtonSubmitText>
                )}
              </ButtonSubmit>
            </Row>
          </Block>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
