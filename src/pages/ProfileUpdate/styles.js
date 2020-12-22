import Moment from 'moment';
import { Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';

export const Block = styled.SafeAreaView``;

export const ButtonSubmit = styled.TouchableOpacity`
  align-items: center;
  background-color: ${({ disabled }) => (disabled ? '#cdcdcd' : '#16b8dc')};
  border-radius: 4px;
  justify-content: center;
  height: 42px;
  justify-content: center;
  margin: 10px 0;
  width: 100%;
`;

export const ButtonSubmitText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const Container = styled.View`
  background-color: #ebf2fa;
  flex: 1;
`;

export const Content = styled.ScrollView`
  flex: 1;
  padding: 20px 20px 0 20px;
`;

export const Divisor = styled.View`
  background-color: #86bbd8;
  height: 1px;
  margin: 20px 0;
  width: 100%;
`;

export const FormGroup = styled.View`
  flex-direction: column;
  margin: 5px 0;
  position: relative;
  width: ${({ width }) => width || '100%'};
`;

export const H1 = styled.Text`
  color: #302d46;
  font-size: 30px;
`;

export const Input = styled.TextInput.attrs(({ disabled }) => ({
  editable: !disabled,
}))`
  align-items: center;
  background-color: ${({ colored, disabled }) => (colored && disabled ? '#ffffff' : disabled ? '#a9a9a9' : '#ffffff')};
  border-top-color: #497697;
  border-top-width: 2px;
  border-radius: 4px;
  color: #585175;
  font-size: 17px;
  height: 48px;
  padding: 0 10px;
  width: 100%;
`;

export const InputDatePicker = styled(DateTimePickerModal).attrs({
  maximumDate: Moment()
    .subtract(18, 'years')
    .toDate(),
  mode: 'date',
})``;

export const InputIcon = styled(FontAwesome).attrs(({ color, icon, size, valid, visible }) => ({
  color: valid ? '#1ec5ea' : '#e0e0e0',
  name: icon || (visible ? 'eye' : 'eye-slash'),
  size: size || 24,
}))`
  bottom: 8px;
  position: absolute;
  right: 8px;
`;

export const KeyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
`;

export const Label = styled.Text`
  color: #585175;
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
`;

export const LabelImage = styled.Text`
  align-self: center;
  color: #585175;
  font-size: 16px;
  margin: 5px 0;
`;

export const ProfileImage = styled.Image.attrs(props => {
  return {
    resizeMode: 'contain',
    source: props.source && props.source.uri ? props.source : require('../../../assets/frendlee-profile-picture.png'),
  };
})`
  ${props => (props.source && props.source.uri ? 'border-radius: 4px;' : '')}
  height: 120px;
  padding-right: 20px;
  width: 120px;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
