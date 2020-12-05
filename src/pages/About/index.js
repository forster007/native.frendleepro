import React, { useState } from 'react';
import { Linking } from 'react-native';
import { Header, Modal } from '../../components';
import {
  Container,
  Content,
  BlockBody,
  BlockHeader,
  FreendleLink,
  Divisor,
  HeaderLogo,
  DescriptionFooterText,
  DescriptionDiv,
  DescriptionText,
  DescriptionLink,
  SocialMediaTwitterIcon,
  SocialMediaFacebookIcon,
  SocialMediaInstagramIcon,
  SocialMediasDiv,
} from './styles';

export default function About({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Header
        left="profile"
        right="menu"
        rightFunction={setModalVisible}
        rightProps={modalVisible}
        title="About Frendlee"
      />

      <Content>
        <BlockHeader>
          <HeaderLogo />
          <DescriptionDiv>
            <DescriptionText>
              Live-edge shabby chic portland 3 wolf moon squid meggings tumeric
              hell of put a bird on it bespoke jianbing mlkshk chillwave tote
              bag cold-pressed.{'\n\n'} Ennui raw denim austin thundercats pug
              venmo. Raw denim before they sold out truffaut man braid stumptown
              tumblr next level slow-carb.
            </DescriptionText>
          </DescriptionDiv>
        </BlockHeader>

        <BlockBody>
          <SocialMediasDiv>
            <SocialMediaTwitterIcon onPress={() => {}} />

            <SocialMediaInstagramIcon onPress={() => {}} />

            <SocialMediaFacebookIcon onPress={() => {}} />
          </SocialMediasDiv>

          <DescriptionDiv>
            <FreendleLink
              onPress={() => Linking.openURL('http://frendlee.com.br')}
            >
              frendlee.com.br
            </FreendleLink>
          </DescriptionDiv>

          <DescriptionDiv>
            <DescriptionText>
              Quer mais informações? Veja aqui nossos{' '}
              <DescriptionLink onPress={() => navigation.navigate('TermsUse')}>
                Termos de Serviço
              </DescriptionLink>{' '}
              (TOS)
            </DescriptionText>
          </DescriptionDiv>
        </BlockBody>

        <Divisor />
        <DescriptionDiv>
          <DescriptionFooterText>VERSÃO 1.0</DescriptionFooterText>
        </DescriptionDiv>
      </Content>
    </Container>
  );
}
