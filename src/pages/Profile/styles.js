import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

export const Container = styled.View`
  background-color: #dcd9e3;
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  keyboardShouldPersistTaps: 'always',
  nestedScrollEnabled: true,
  showsVerticalScrollIndicator: false,
})`
  background-color: #ffffff;
  border-bottom-color: #f2f2f2;
  border-bottom-width: 1px;
`;

export const Div = styled.View`
  padding-horizontal: 10px;
  background: #dcd9e3;
`;

export const DivisorInfo = styled.View`
  background-color: #cfced8;
  height: 1px;
  margin-bottom: 10px;
  margin-top: 10px;
  width: 100%;
`;

export const ProfileAvatar = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  height: 240px
  justify-content: flex-end;
  overflow: hidden;
  width: 100%;
`;

export const ProfileName = styled.View`
  padding-vertical: 10px;
  width: 100%;
`;

export const ProfileNameText = styled.Text`
  color: #ffffff;
  font-size: 26px;
  font-weight: bold;
  padding-left: 10px;
`;

export const ProfileCardBiography = styled.View`
  color: #2a3152;
  width: 100%;
  margin: 10px 0;
`;

export const ProfileCardBiographyTitle = styled.Text`
  color: #2a3152;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const ProfileCardBiographyText = styled.Text.attrs({
  numberOfLines: 7,
})`
  color: #2a3152;
  font-size: 16px;
  line-height: 22.5px;
`;

export const ProfileCardInformation = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  border: 2px solid #e9e5ee;
  border-radius: 5px;
  height: 50px;
  margin-top: 10px;
`;

export const ProfileCardInformationText = styled.Text`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: #2a3152;
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  padding: 10px;
`;

export const ProfileCardInformationSsnIcon = styled(FontAwesome).attrs({
  color: '#4C476F',
  name: 'id-card-o',
  size: 26,
})`
  text-align: center;
  padding: 0 10px;
  width: 50px;
`;

export const ProfileCardInformationEmailIcon = styled(FontAwesome).attrs({
  color: '#4C476F',
  name: 'envelope-o',
  size: 27,
})`
  text-align: center;
  padding: 0 10px;
  width: 50px;
`;

export const ProfileCardInfoText = styled.Text`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: #2a3152;
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  padding: 10px;
`;

export const ProfileCardInfo = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  margin-top: 10px;
  width: 100%;
`;

export const ProfileCardInfoRating = styled(ProfileCardInfo)`
  height: 85px;
`;

export const ProfileCardInfoAgeIcon = styled.Image.attrs({
  resizeMode: 'contain',
  source: require('../../../assets/frendlee-provider-cake.png'),
})`
  height: 25px;
  margin: 0 15px;
  width: 30px;
`;

export const ProfileHalfCardInfoText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
`;

export const ProfileHalfCardInfo = styled.View`
  align-items: center;
  border: 2px solid #e9e5ee;
  border-radius: 5px;
  height: 50px;
  flex-direction: row;
  justify-content: flex-start;
  width: 48%;
`;

export const ProfileCardInfoGenderIcon = styled(FontAwesome5).attrs(
  ({ gender }) => {
    return {
      color: '#4C476F',
      name: gender === 'female' ? 'female' : 'male',
      size: 26,
    };
  }
)`
  text-align: center;
  margin: 0 15px;
  width: 30px;
`;

export const ProfileCardInfoSmokerIcon = styled(FontAwesome5).attrs(
  ({ smoker }) => {
    return {
      color: `rgba(76, 71, 111, ${smoker ? '1' : '0.2'})`,
      name: 'smoking',
      size: 20,
    };
  }
)`
  text-align: center;
  margin: 0 15px;
  width: 30px;
`;

export const ProfileCardAtLeft = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  border-radius: 5px;
  height: 50px;
  margin-top: 10px;
`;

export const ProfileCardEspecialization = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  border-radius: 5px;
  height: 50px;
`;

export const ProfileCardRating = styled.View`
  align-items: center;
  flex-direction: row;
  align-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

export const ProfileCardRatingItem = styled(ProfileCardRating)`
  flex-direction: column;
  width: 33%;
`;

export const ProfileCardRatingText = styled.Text`
  color: #4c476f;
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  width: 90%;
`;

export const ProfileCardRatingTextDown = styled(ProfileCardRatingText)`
  font-size: 14px;
`;

export const ProfileCardInfoPetFrendlyIcon = styled(
  MaterialCommunityIcons
).attrs(({ petFriendly }) => {
  return {
    color: `rgba(76, 71, 111, ${petFriendly ? '1' : '0.2'})`,
    name: 'dog',
    size: 26,
  };
})`
  text-align: center;
  margin: 0 15px;
  width: 30px;
`;

export const ProfileCardInfoFacebookIcon = styled(FontAwesome).attrs({
  color: '#1EC5EA50',
  name: 'facebook',
  size: 30,
})`
  text-align: center;
  margin: 0 5px;
  width: 30px;
`;

export const ProfileCardInfoInstagramIcon = styled(FontAwesome).attrs({
  color: '#1EC5EA50',
  name: 'instagram',
  size: 30,
})`
  text-align: center;
  margin-right: 15px;
  width: 30px;
`;

export const ProfileCardInfoCertificationIcon = styled(
  MaterialCommunityIcons
).attrs({
  color: '#1EC5EA',
  name: 'certificate',
  size: 30,
})`
  text-align: center;
  margin-right: 15px;
  width: 30px;
`;

export const ProfileCardInfoPhone = styled.View`
  align-items: center;
  border: 2px solid #e9e5ee;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  height: 50px;
  flex-direction: row;
  width: 65%;
`;

export const ProfileCardInfoPhoneIcon = styled(FontAwesome).attrs({
  color: '#4C476F',
  name: 'phone',
  size: 26,
})`
  text-align: center;
  padding: 0 10px;
  width: 50px;
`;

export const ProfileCardInfoPhoneText = styled.Text`
  color: #4c476f;
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
`;

export const ProfileCardInfoWhatsapp = styled.View`
  align-items: center;
  border: 2px solid #e9e5ee;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  height: 50px;
  flex-direction: row;
  width: 35%;
  background: #e9e5ee;
`;

export const ProfileCardInfoWhatsappIcon = styled(FontAwesome).attrs({
  color: '#4C476F',
  name: 'whatsapp',
  size: 22,
})`
  text-align: center;
  width: 40px;
`;

export const ProfileCardInfoWhatsappText = styled.Text`
  color: #4c476f;
  font-size: 15px;
  font-weight: bold;
`;

export const ProfileCardInfoMedical = styled.View`
  color: #2a3152;
  width: 100%;
  margin: 20px 0;
`;

export const ProfileCardInfoMedicalTitle = styled.Text`
  color: #2a3152;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
`;

export const ProfileTitle = styled.Text`
  color: #2a3152;
  font-size: 18px;
  font-weight: bold;
  margin-top: 12px;
`;

export const ProfileCardStuff = styled.View`
  align-items: center;
  border-radius: 2px;
  height: 50px;
  flex-direction: row;
  flex: 1;
  background: rgba(175, 174, 191, 0.5);
  margin-top: 10px;
`;

export const ProfileCardStuffText = styled.Text`
  color: #2a3152;
  font-size: 18px;
  font-weight: bold;
  margin: 0 15px;
`;

export const ProfileStuffsFlatList = styled.FlatList`
  padding-bottom: 15px;
`;

export const ButtonEdit = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  justify-content: center;
  align-content: center;
  border: 2px solid #16b8dc;
  border-radius: 4px;
  height: 42px;
  justify-content: center;
  width: ${screenWidth - 20}px;
`;

export const ButtonEditText = styled.Text`
  color: #16b8dc;
  font-size: 20px;
  font-weight: bold;
`;

export const ButtonEditService = styled(TouchableOpacity)`
  flex: 1;
  background-color: #16b8dc;
  align-items: center;
  justify-content: center;
  align-content: center;
  border-radius: 4px;
  height: 42px;
  justify-content: center;
  width: ${screenWidth - 20}px;
`;

export const ButtonEditServiceText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;
export const ButtonEditDiv = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  margin-bottom: 10px;
  width: 100%;
`;
