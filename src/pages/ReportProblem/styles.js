import { Dimensions, Picker, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

const screenWidth = Math.round(Dimensions.get('window').width);
const { height } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Platform.OS === 'ios' && height >= 812
    ? '50px'
    : Platform.OS === 'android'
    ? '0px'
    : '30px'};
  background: #ebf2fa;
`;

export const Content = styled.ScrollView.attrs({
  bounces: false,
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  showsVerticalScrollIndicator: false,
})`
  margin: 0 20px;
`;

export const DescriptionText = styled.Text`
  color: #33658a;
  text-align: left;
  font-size: 16px;
  line-height: 20px;
  padding: 20px 0;
`;

export const ProblemDiv = styled.View`
  margin-bottom: 25px;
  width: 100%;
`;

export const InputTitle = styled.Text`
  color: #585175;
  font-size: 16px;
  font-weight: bold;
  margin: 0 0 10px;
`;

export const Input = styled.TextInput`
  align-items: center;
  background-color: ${({ disabled }) => (disabled ? '#a9a9a9' : '#ffffff')};
  border-top-color: #497697;
  border-top-width: 2px;
  border-radius: 4px;
  color: #585175;
  font-size: 17px;
  height: 200px;
  padding: 0 10px;
  width: 100%;
`;

export const TypePicker = styled(Picker)`
  align-items: center;
  background-color: #fff;
  border-top-color: #497697;
  border-top-width: 2px;
  border-radius: 4px;
  color: #585175;
  font-size: 17px;
  padding: 0 10px;
  width: 100%;
`;

export const ButtonAttach = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  align-content: center;
  border: 2px solid #16b8dc;
  border-radius: 4px;
  height: 42px;
  justify-content: center;
  width: ${screenWidth - 40}px;
`;

export const ButtonAttachText = styled.Text`
  color: #16b8dc;
  font-size: 20px;
  font-weight: bold;
`;

export const ButtonSend = styled(TouchableOpacity)`
  flex: 1;
  background-color: #16b8dc;
  align-items: center;
  justify-content: center;
  align-content: center;
  border-radius: 4px;
  height: 42px;
  justify-content: center;
  width: ${screenWidth - 40}px;
`;

export const ButtonSendText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
export const ButtonDiv = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 20px;
`;
