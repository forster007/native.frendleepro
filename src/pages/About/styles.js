import React from 'react';
import { Dimensions, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import Moment from 'moment';
import { CheckBox } from 'react-native-elements';
import styled from 'styled-components/native';
import { FontAwesome } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';

const { height } = Dimensions.get('window');

export const BlockBody = styled.View`
  margin: 20px 0 0 0;
  padding: 10px 20px 0 20px;
  flex: 1;
`;

export const BlockHeader = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${Platform.OS === 'android' ? '20px 20px 0px' : '0px 20px'};
`;

export const BodyRow = styled.View`
  align-items: ${({ center }) => (center ? 'center' : 'stretch')};
  justify-content: ${({ row }) => (row ? 'space-between' : 'flex-start')};
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  padding: 10px 0;
`;

export const BodyTitle = styled.Text`
  color: #16b8dc;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
  padding: 15px 15px;
`;

export const Button = styled(RectButton)`
  align-items: center;
  background-color: ${({ selected }) => (selected ? '#4c476f' : 'transparent')};
  border: ${({ selected }) => (selected ? '2px solid #4c476f' : 'transparent')};
  border-radius: 4px;
  height: 40px;
  justify-content: center;
  padding: 2px;
  width: 99%;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  background-color: #cfcedf;
  border: 2px solid #afaebf;
  border-radius: 4px;
  flex-direction: ${({ direction }) => direction || 'column'};
  height: 48px;
  justify-content: center;
  margin: 0px 0px 15px;
  width: 100%;
`;

export const ButtonGroup = styled.View`
  align-items: center;
  background-color: #cfcedf;
  border: 2px solid #afaebf;
  border-radius: 4px;
  flex-direction: row;
  height: 48px;
  justify-content: space-between;
  padding: 0px 2px;
`;

export const ButtonGroupOption = styled(RectButton)`
  align-items: center;
  background-color: ${({ selected }) => (selected ? '#4c476f' : 'transparent')}
  border-radius: 4px;
  height: 40px;
  justify-content: center;
  width: 30%;
`;

export const ButtonGroupText = styled.Text`
  color: ${({ selected }) => (selected ? '#ffffff' : '#7244d4')};
  font-size: 14px;
  font-weight: bold;
`;

export const ButtonText = styled.Text`
  color: ${({ selected }) => (selected ? '#ffffff' : '#1ec5ea')};
  font-size: 16px;
  font-weight: bold;
`;

export const Container = styled.View`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' && height >= 812
    ? '50px'
    : Platform.OS === 'android'
    ? '0px'
    : '30px'};
`;

export const Content = styled.ScrollView.attrs({
  bounces: false,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  showsVerticalScrollIndicator: false,
})`
  background: #ebf2fa;
`;

export const Divisor = styled.View`
  background-color: #86bbd8;
  height: 1px;
  margin: 0 20px;
  padding: 0 20px;
  width: 90%;
`;

export const FormContainer = styled.KeyboardAvoidingView.attrs({
  behavior: 'position',
  enabled: Platform.OS === 'ios',
})`
  bottom: 0;
  overflow: hidden;
`;

export const HeaderLogo = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-logo.png'),
})`
  height: 70px;
`;

export const DescriptionDiv = styled.View`
  align-items: stretch;
  justify-content: center;
  flex-direction: row;
  width: 100%;
`;

export const DescriptionText = styled.Text`
  color: #33658a;
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  padding: 15px 15px;
`;

export const DescriptionLink = styled(DescriptionText)`
  color: #16b8dc;
`;

export const DescriptionFooterText = styled(DescriptionText)`
  font-size: 14px;
  line-height: 25px;
`;

export const InputMasked = styled(TextInputMask)`
  align-items: center;
  background-color: #ffffff;
  border-radius: 4px;
  border-top-color: #497697;
  border-top-width: 2px;
  color: #585175;
  font-size: 17px;
  height: 48px;
  padding: 0 10px;
  width: 100%;
`;

export const Slider = styled.Slider`
  left: ${Platform.OS === 'android' ? '-10px' : '0px'};
  width: ${Platform.OS === 'android' ? '80%' : '70%'};
`;

export const TermsCheckBox = styled(CheckBox).attrs(() => ({
  checkedColor: '#302d46',
  checkedIcon: 'check-square-o',
  containerStyle: {
    marginLeft: 0,
    padding: 0,
    paddingLeft: 0,
  },
  size: 25,
}))``;

export const SocialMediasDiv = styled.View`
  align-items: stretch;
  justify-content: center;

  flex-direction: row;
  width: 100%;
  margin-bottom: 30px;
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
