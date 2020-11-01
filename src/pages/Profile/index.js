import React, { useCallback, useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Header } from '~/components';
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
  ProfileStuffsFlatList,
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
} from './styles';

import { getProvider } from '~/services/providers';

function Profile({ isFocused, navigation }) {
  const { user, token } = useSelector(state => state.auth);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [monthsOnFrenndlee, setMonthsOnFrenndlee] = useState('');
  const [profile, setProfile] = useState({});

  const handleProfile = useCallback(async () => {
    const response = await getProvider(user.uid, token);

    // setProfile(response.data);
    setProfile(response.data[2]);
    console.log(response.data[2]);
  });

  useEffect(() => {
    handleProfile();
  }, []);

  useEffect(() => {
    setName(`${profile.name} ${profile.lastname}`);
    setAge(`${moment().diff(profile.birthdate, 'years')} years old`);
    setMonthsOnFrenndlee(`${moment().diff(profile.created_at, 'months')}`);
  }, [profile]);

  function renderStuff({ item }) {
    return (
      <ProfileCardStuff>
        <ProfileCardStuffText>{item.name}</ProfileCardStuffText>
      </ProfileCardStuff>
    );
  }

  function renderProfile() {
    return (
      <Div>
        <ProfileCardBiography>
          <ProfileCardBiographyTitle>Biography</ProfileCardBiographyTitle>
          <ProfileCardBiographyText>
            Blue bottle crucifix banh mi, echo park bicycle rights godard YOLO
            XOXO hella hashtag green juice narwhal PBR&B. Freegan woke cliche,
            vaporware locavore shabby chic copper mug butcher pabst seitan
            cold-pressed. Hella sustainable viral church-key helvetica.
            {profile.biography}
          </ProfileCardBiographyText>
        </ProfileCardBiography>

        <ProfileCardInformation>
          <ProfileCardInformationSsnIcon />
          <ProfileCardInformationText>
            {profile.ssn}6188354557
          </ProfileCardInformationText>
        </ProfileCardInformation>

        <ProfileCardInformation>
          <ProfileCardInformationEmailIcon />
          <ProfileCardInformationText>{user.email}</ProfileCardInformationText>
        </ProfileCardInformation>

        <ProfileCardInfo>
          <ProfileCardInfoPhone>
            <ProfileCardInfoPhoneIcon />
            <ProfileCardInfoPhoneText>
              {profile.phone_number}995884384
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
            <ProfileHalfCardInfoText>{profile.pet_friendly ? 'Pet friendly' : 'Without Pet\'s'}</ProfileHalfCardInfoText>
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
              <ProfileCardRatingText>43{profile.attendance}</ProfileCardRatingText>
              <ProfileCardRatingTextDown>
                Pessoas Atendidas
              </ProfileCardRatingTextDown>
            </ProfileCardRatingItem>
            <ProfileCardRatingItem>
              <ProfileCardRatingText>39{profile.recommendations}</ProfileCardRatingText>
              <ProfileCardRatingTextDown>
                Recomendações super positivas
              </ProfileCardRatingTextDown>
            </ProfileCardRatingItem>
            <ProfileCardRatingItem>
              <ProfileCardRatingText>9{monthsOnFrenndlee}</ProfileCardRatingText>
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
        <ProfileStuffsFlatList
          data={profile.stuffs}
          keyExtractor={item => item.id}
          renderItem={renderStuff}
          ListEmptyComponent={<Div />}
        />
      </Div>
    );
  }

  return (
    <Container>
      <Header left="goBack" right="none" title="Profile" titleAlign="left" />

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
