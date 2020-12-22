import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';

export const Container = styled.View`
  align-items: center;
  background-color: #ebf2fa;
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: 'center',
  },
})`
  flex: 1;
  width: 80%;
`;

export const ContentLink = styled.Text`
  color: #16b8dc;
  font-style: normal;
  font-size: 18px;
  font-weight: bold;
  line-height: 25px;
  margin: 10px 0;
  text-align: center;
`;

export const ContentSocialIcons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0;
`;

export const ContentText = styled.Text`
  color: #33658a;
  font-size: 14px;
  line-height: 20px;
  margin: 10px 0;
  text-align: center;
`;

export const ContentTextColored = styled.Text`
  color: #16b8dc;
  font-size: 14px;
  line-height: 20px;
  margin: 10px 0;
  text-align: center;
`;

export const Footer = styled.SafeAreaView`
  align-items: center;
  border-top-width: 1px;
  border-top-color: #d4dcec;
  height: 80px;
  justify-content: center;
  width: 80%;
`;

export const FooterVersionText = styled.Text`
  color: #33658a;
  font-size: 12px;
`;

export const FrendleeLogo = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-logo.png'),
})`
  height: 70px;
  margin: 10px 0;
  width: 275px;
`;

export const SocialMediaFacebookIcon = styled(FontAwesome).attrs({
  color: '#16B8DC',
  name: 'facebook',
  size: 40,
})`
  text-align: center;
  width: 70px;
`;

export const SocialMediaInstagramIcon = styled(FontAwesome).attrs({
  color: '#16B8DC',
  name: 'instagram',
  size: 40,
})`
  text-align: center;
  width: 70px;
`;

export const SocialMediaTwitterIcon = styled(FontAwesome).attrs({
  color: '#16B8DC',
  name: 'twitter',
  size: 40,
})`
  text-align: center;
  width: 70px;
`;
