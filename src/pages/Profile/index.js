import React, { useCallback, useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import moment from 'moment';
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
  ButtonEditServiceText,
  AvailabilityActivitiesView,
} from './styles';

import { getProviders } from '../../services/providers';
import { uniqueId } from 'lodash';

function Profile({ isFocused, navigation }) {
  const { user, token } = useSelector(state => state.auth);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [monthsOnFrendlee, setMonthsOnFrendlee] = useState('');
  const [profile, setProfile] = useState({});

  const handleProfile = useCallback(async () => {
    const response = await getProviders();
    setProfile(response.data);
  });

  const handleEdit = useCallback(() => {
    navigation.navigate('ProfileUpdate', { profile });
  });

  const handleServicesEdit = useCallback(() => {
    navigation.navigate('ServicesUpdate', { profile });
  });

  useEffect(() => {
    handleProfile();
  }, []);

  useEffect(() => {
    setName(`${profile.name} ${profile.lastname}`);
    setAge(`${moment().diff(profile.birthdate, 'years')} years old`);
    setMonthsOnFrendlee(`${moment().diff(profile.created_at, 'months')}`);
  }, [profile]);

  function renderStuff(uname) {
    return (
      <ProfileCardStuff key={uniqueId()}>
        <ProfileCardStuffText>{uname}</ProfileCardStuffText>
      </ProfileCardStuff>
    );
  }

  function renderProfile() {
    return (
      <Div>
        <ProfileCardBiography>
          <ProfileCardBiographyTitle>Biography</ProfileCardBiographyTitle>
          <ProfileCardBiographyText>{profile.description}</ProfileCardBiographyText>
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
            <ProfileCardInfoPhoneText>{profile.phone_number}</ProfileCardInfoPhoneText>
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
            <ProfileHalfCardInfoText>{profile.gender === 'female' ? 'Woman' : 'Men'}</ProfileHalfCardInfoText>
          </ProfileHalfCardInfo>
        </ProfileCardInfo>

        <ProfileCardInfo>
          <ProfileHalfCardInfo>
            <ProfileCardInfoSmokerIcon smoker={profile.smoker} />
            <ProfileHalfCardInfoText>{profile.smoker ? 'Smoker' : 'Non-smoker'}</ProfileHalfCardInfoText>
          </ProfileHalfCardInfo>

          <ProfileHalfCardInfo>
            <ProfileCardInfoPetFrendlyIcon petFriendly={profile.pet_friendly} />
            <ProfileHalfCardInfoText>{profile.pet_friendly ? 'Pet friendly' : "Without Pet's"}</ProfileHalfCardInfoText>
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
              <ProfileCardRatingText>{profile.treatments}</ProfileCardRatingText>
              <ProfileCardRatingTextDown>Pessoas Atendidas</ProfileCardRatingTextDown>
            </ProfileCardRatingItem>
            <ProfileCardRatingItem>
              <ProfileCardRatingText>00{profile.recomendations}</ProfileCardRatingText>
              <ProfileCardRatingTextDown>Recomendações super positivas</ProfileCardRatingTextDown>
            </ProfileCardRatingItem>
            <ProfileCardRatingItem>
              <ProfileCardRatingText>{monthsOnFrendlee}</ProfileCardRatingText>
              <ProfileCardRatingTextDown>Meses na plataforma</ProfileCardRatingTextDown>
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
        <AvailabilityActivitiesView>
          {profile.stuffs?.map(({ name: uname }) => renderStuff(uname))}
        </AvailabilityActivitiesView>

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
      </Div>
    );
  }

  return (
    <Container>
      <Header left="goBack" title="Profile" />

      <Content>
        <ProfileAvatar source={{ uri: profile.avatar?.uri }}>
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
