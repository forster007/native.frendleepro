import React, { useCallback, useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { SafeAreaView } from 'react-native';
import { Header } from '../../components';
import {
  Container,
  Content,
  Div,
  ProfileAvatar,
  ProfileName,
  ProfileNameText,
  ProfileCardBiography,
  ProfileCardBiographyText,
  ProfileCardBiographyTitle,
  ProfileCardInformation,
  ProfileCardInformationText,
  ProfileCardInformationSsnIcon,
  ProfileCardInformationEmailIcon,
  ProfileCardInfo,
  ProfileCardInfoAgeIcon,
  ProfileCardInfoPhone,
  ProfileCardInfoPhoneIcon,
  ProfileCardInfoPhoneText,
  ProfileCardInfoWhatsapp,
  ProfileCardInfoWhatsappIcon,
  ProfileCardInfoWhatsappText,
  ProfileCardStuff,
  ProfileCardStuffText,
  DivisorInfo,
  ProfileCardInfoSmokerIcon,
  ProfileCardInfoPetFrendlyIcon,
  ProfileHalfCardInfo,
  ProfileCardInfoGenderIcon,
  ProfileHalfCardInfoText,
  ProfileCardInfoFacebookIcon,
  ProfileCardInfoInstagramIcon,
  ProfileCardAtLeft,
  ProfileCardRating,
  ProfileCardRatingText,
  ProfileCardRatingTextDown,
  ProfileCardRatingItem,
  ProfileTitle,
  ProfileCardInfoRating,
  ProfileCardInfoCertificationIcon,
  ProfileCardEspecialization,
  ButtonEditDiv,
  ButtonEdit,
  ButtonEditText,
  ButtonEditService,
  ButtonEditServiceText
} from './styles';

import { getProviders } from '../../services/providers';

function Profile({ isFocused, navigation }) {
  const { user, token } = useSelector(state => state.auth);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [monthsOnFrendlee, setMonthsOnFrendlee] = useState('');
  const [profile, setProfile] = useState({});

  const handleProfile = useCallback(async () => {
    const response = await getProviders();
    setProfile(response.data);
<<<<<<< HEAD
    // console.log(response.data);
=======
    console.log(response.data);
  });

  const handleEdit = useCallback(() => {
    console.log('editing');
    navigation.navigate('ProfileUpdate', { profile });
  });

  const handleServicesEdit = useCallback(() => {
    console.log('editing services');
    // navigation.navigate('ProfileServicesEdit', {profile});
>>>>>>> origin
  });

  useEffect(() => {
    handleProfile();
  }, []);

  useEffect(() => {
    setName(`${profile.name} ${profile.lastname}`);
    setAge(`${moment().diff(profile.birthdate, 'years')} years old`);
    setMonthsOnFrendlee(`${moment().diff(profile.created_at, 'months')}`);
  }, [profile]);

  function renderStuff( name ) {
    return (
      <ProfileCardStuff>
        <ProfileCardStuffText>{name}</ProfileCardStuffText>
      </ProfileCardStuff>
    );
  }

  function renderProfile() {
    return (
      <Div>
        <ProfileCardBiography>
          <ProfileCardBiographyTitle>Biography</ProfileCardBiographyTitle>
          <ProfileCardBiographyText>
            {profile.description}
          </ProfileCardBiographyText>
        </ProfileCardBiography>

        <ProfileCardInformation>
          <ProfileCardInformationSsnIcon />
          <ProfileCardInformationText>{profile.ssn}</ProfileCardInformationText>
        </ProfileCardInformation>

        <ProfileCardInformation>
          <ProfileCardInformationEmailIcon />
          <ProfileCardInformationText>{user.email}</ProfileCardInformationText>
        </ProfileCardInformation>

        <ProfileCardInfo>
          <ProfileCardInfoPhone>
            <ProfileCardInfoPhoneIcon />
            <ProfileCardInfoPhoneText>
              {profile.phone_number}
            </ProfileCardInfoPhoneText>
          </ProfileCardInfoPhone>

          <ProfileCardInfoWhatsapp>
            <ProfileCardInfoWhatsappIcon />
            <ProfileCardInfoWhatsappText>Whatsapp</ProfileCardInfoWhatsappText>
          </ProfileCardInfoWhatsapp>
        </ProfileCardInfo>

        <ProfileCardInfo>
          <ProfileHalfCardInfo>
            <ProfileCardInfoAgeIcon />
            <ProfileHalfCardInfoText>{age}</ProfileHalfCardInfoText>
          </ProfileHalfCardInfo>

          <ProfileHalfCardInfo>
            <ProfileCardInfoGenderIcon gender={profile.gender} />
            <ProfileHalfCardInfoText>
              {profile.gender === 'female' ? 'Woman' : 'Men'}
            </ProfileHalfCardInfoText>
          </ProfileHalfCardInfo>
        </ProfileCardInfo>

        <ProfileCardInfo>
          <ProfileHalfCardInfo>
            <ProfileCardInfoSmokerIcon smoker={profile.smoker} />
            <ProfileHalfCardInfoText>
              {profile.smoker ? 'Smoker' : 'Non-smoker'}
            </ProfileHalfCardInfoText>
          </ProfileHalfCardInfo>

          <ProfileHalfCardInfo>
            <ProfileCardInfoPetFrendlyIcon petFriendly={profile.pet_friendly} />
            <ProfileHalfCardInfoText>
              {profile.pet_friendly ? 'Pet friendly' : "Without Pet's"}
            </ProfileHalfCardInfoText>
          </ProfileHalfCardInfo>
        </ProfileCardInfo>

        <ProfileCardInfo>
          <ProfileCardAtLeft>
            <ProfileCardInfoInstagramIcon onPress={() => {}} />
            <ProfileHalfCardInfoText>•</ProfileHalfCardInfoText>
            <ProfileCardInfoFacebookIcon onPress={() => {}} />
          </ProfileCardAtLeft>
        </ProfileCardInfo>

        <DivisorInfo />

        <ProfileCardInfoRating>
          <ProfileCardRating>
            <ProfileCardRatingItem>
              <ProfileCardRatingText>
                {profile.treatments}
              </ProfileCardRatingText>
              <ProfileCardRatingTextDown>
                Pessoas Atendidas
              </ProfileCardRatingTextDown>
            </ProfileCardRatingItem>
            <ProfileCardRatingItem>
              <ProfileCardRatingText>00{profile.recomendations}</ProfileCardRatingText>
              <ProfileCardRatingTextDown>
                Recomendações super positivas
              </ProfileCardRatingTextDown>
            </ProfileCardRatingItem>
            <ProfileCardRatingItem>
              <ProfileCardRatingText>{monthsOnFrendlee}</ProfileCardRatingText>
              <ProfileCardRatingTextDown>
                Meses na plataforma
              </ProfileCardRatingTextDown>
            </ProfileCardRatingItem>
          </ProfileCardRating>
        </ProfileCardInfoRating>

        <DivisorInfo />

        <ProfileTitle>Especialization</ProfileTitle>
        <ProfileCardEspecialization>
          <ProfileCardInfoCertificationIcon />
          <ProfileHalfCardInfoText>{profile.formation}</ProfileHalfCardInfoText>
        </ProfileCardEspecialization>

        <ProfileTitle>Availability activities</ProfileTitle>
<<<<<<< HEAD
        <SafeAreaView style={{ flex: 1 }}>
          <ProfileStuffsFlatList
            data={profile.stuffs}
            keyExtractor={item => item.id}
            renderItem={renderStuff}
            ListEmptyComponent={<Div />}
          />
        </SafeAreaView>
=======
        <SafeAreaView style={{ flex: 1, marginBottom:20}}>
          {profile.stuffs?.map(({name}) => renderStuff(name))}
        </SafeAreaView>

        <ButtonEditDiv>
          <ButtonEdit onPress={handleEdit}>
            <ButtonEditText>EDIT PROFILE</ButtonEditText>
          </ButtonEdit>
        </ButtonEditDiv>

        <ButtonEditDiv>
          <ButtonEditService onPress={handleServicesEdit}>
            <ButtonEditServiceText>EDIT SERVICES</ButtonEditServiceText>
          </ButtonEditService>
        </ButtonEditDiv>
>>>>>>> origin
      </Div>
    );
  }

  return (
    <Container>
      <Header left="goBack" right="none" title="Profile" titleAlign="left" />

      <Content>
        <ProfileAvatar source={{ uri: profile.avatar.uri }}>
          <ProfileName>
            <ProfileNameText>{name}</ProfileNameText>
          </ProfileName>
        </ProfileAvatar>

        {renderProfile()}
      </Content>
    </Container>
  );
}

export default withNavigationFocus(Profile);
