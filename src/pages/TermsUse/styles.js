import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';

const { height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: #ebf2fa;
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
  margin: 0 20px;
`;

export const TermDiv = styled.View`
  align-items: stretch;
  width: 100%;
`;

export const DescriptionText = styled.Text`
  color: #33658a;
  text-align: left;
  font-size: 16px;
  line-height: 20px;
  padding-bottom: 20px;
`;

export const DescriptionTitleText = styled(DescriptionText)`
  font-weight: bold;
  padding: 15px 0 10px 0;
`;
