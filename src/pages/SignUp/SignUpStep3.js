import React, { useEffect, useState } from 'react';
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

export default function SignUpStep2({ navigation }) {
  const [buttonState, setButtonState] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const data = navigation.getParam('data');
    setUser(data ? data.email : '');
  }, []);

  useEffect(() => {
    if (user && password && validPassword && checked) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [user, password, validPassword, checked]);

  useEffect(() => {
    const regex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
    );
    setValidPassword(regex.test(password));
  }, [password, validPassword]);

  const handleNext = () => {
    const data = navigation.getParam('data');

    data.password = password;

    console.log(data);
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
