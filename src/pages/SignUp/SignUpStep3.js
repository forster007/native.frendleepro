import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import {
  BlockBody,
  BlockFooter,
  BlockHeader,
  BodyText,
  ButtonInput,
  ButtonNext,
  ButtonNextText,
  Container,
  Content,
  Div,
  Divisor,
  FooterStep,
  HeaderLogo,
  HeaderSubTitle,
  HeaderTitle,
  Input,
  InputIcon,
  InputTitle,
  StepNumber,
  StepText,
  TermsCheckBox,
} from './styles';

import api from '~/services/api';

export default function SignUpStep3({ navigation }) {
  const [buttonState, setButtonState] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState('');
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    const data = navigation.getParam('data');
    setUser(data ? data.user.email : '');
  }, []);

  useEffect(() => {
    const regex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
    );
    setValidPassword(regex.test(password));
  }, [password, validPassword]);

  const handleSignUp = useCallback(async () => {
    try {
      setLoading(true);

      const data = await navigation.getParam('data');
      const formData = new FormData();

      data.user.password = password;

      formData.append('picture_address', data.picture_address);
      formData.append('picture_certification', data.picture_certification);
      formData.append('picture_license', data.picture_license);
      formData.append('picture_profile', data.picture_profile);

      delete data.picture_address;
      delete data.picture_certification;
      delete data.picture_license;
      delete data.picture_profile;

      const { data: provider } = await api.post('/providers', data);
      api.defaults.headers.common.Authorization = `Bearer ${provider.token}`;

      await api.post(`/providers/files`, formData);

      Alert.alert(
        'SUCCESS',
        'Register successfully sent! Open your email and click on the verification link. After review by our staff, you will be advised of the deferment',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('SignIn'),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
  });

  useEffect(() => {
    if (user && password && validPassword && checked) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [user, password, validPassword, checked]);

  return (
    <Container>
      <Content>
        <BlockHeader>
          <HeaderLogo />
          <HeaderTitle>CREATE ACCOUNT</HeaderTitle>
        </BlockHeader>

        <BlockBody>
          <Div direction="row" justify="space-between">
            <BodyText weight="bold">Access data</BodyText>
            <BodyText>
              Step <BodyText weight="bold">3</BodyText> of{' '}
              <BodyText weight="bold">3</BodyText>
            </BodyText>
          </Div>
          <HeaderSubTitle>
            Art party bitters twee humblebrag polaroid typewriter cold-pressed
            hammock direct trade photo booth shaman.
          </HeaderSubTitle>
          <Divisor marginTop="15px" />

          <Div direction="column" justify="flex-start" marginBottom>
            <InputTitle>User</InputTitle>
            <Input editable={false} value={user} />
          </Div>

          <Div direction="column" justify="flex-start">
            <InputTitle>Choose your password</InputTitle>
            <Div align="center" direction="row" marginBottom>
              <Input
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                value={password}
              />
              <ButtonInput onPress={() => setPasswordVisible(!passwordVisible)}>
                <InputIcon visible={passwordVisible} />
              </ButtonInput>
            </Div>
            <BodyText>
              Minimum of 8 characters. Use letters and numbers.
            </BodyText>
          </Div>

          <Divisor marginTop="15px" />

          <Div marginBotton>
            <Div direction="row" marginBottom>
              <Div width="8%">
                <TermsCheckBox
                  checked={checked}
                  onPress={() => setChecked(!checked)}
                />
              </Div>
              <Div justify="center" width="88%">
                <BodyText>
                  To proceed, you need to agree with our{' '}
                  <BodyText
                    color="#1ec5ea"
                    decoration="underline"
                    weight="bold"
                  >
                    Terms of use
                  </BodyText>
                  .
                </BodyText>
              </Div>
            </Div>

            <ButtonNext
              enabled={!loading}
              onPress={handleSignUp}
              state={buttonState}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <ButtonNextText>TAKE ME TO THE APP</ButtonNextText>
              )}
            </ButtonNext>
          </Div>
        </BlockBody>

        <BlockFooter>
          <FooterStep selected>
            <StepNumber>1</StepNumber>
          </FooterStep>
          <FooterStep selected>
            <StepNumber>2</StepNumber>
          </FooterStep>
          <FooterStep selected>
            <StepNumber selected>3</StepNumber>
            <StepText>Access</StepText>
          </FooterStep>
        </BlockFooter>
      </Content>
    </Container>
  );
}
