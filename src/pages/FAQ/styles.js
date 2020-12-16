import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';

const { height } = Dimensions.get('window');

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
  margin: 0 20px;
`;
