import React from 'react';
import { Header } from '../../components';
import {
  Container,
  Content,
  ContentLink,
  ContentSocialIcons,
  ContentText,
  ContentTextColored,
  Footer,
  FooterVersionText,
  FrendleeLogo,
  SocialMediaFacebookIcon,
  SocialMediaInstagramIcon,
  SocialMediaTwitterIcon,
} from './styles';

export default function About() {
  return (
    <Container>
      <Header left="goBack" title="About Frendlee" />

      <Content>
        <FrendleeLogo />

        <ContentText>
          Live-edge shabby chic portland 3 wolf moon squid meggings tumeric hell
          of put a bird on it bespoke jianbing mlkshk chillwave tote bag
          cold-pressed.
        </ContentText>

        <ContentText>
          Ennui raw denim austin thundercats pug venmo. Raw denim before they
          sold out truffaut man braid stumptown tumblr next level slow-carb.
        </ContentText>

        <ContentSocialIcons>
          <SocialMediaTwitterIcon />
          <SocialMediaFacebookIcon />
          <SocialMediaInstagramIcon />
        </ContentSocialIcons>

        <ContentLink>frendlee.com.br</ContentLink>

        <ContentText>
          Want more information? {`\n`}
          See here our <ContentTextColored>
            Terms of Service
          </ContentTextColored>{' '}
          (TOS)
        </ContentText>
      </Content>
      <Footer>
        <FooterVersionText>VERSION 1.0</FooterVersionText>
      </Footer>
    </Container>
  );
}
