import React, { useState } from 'react';
import { Header, Modal } from '../../components';
import {
  Container,
  Content,
  DescriptionText,
  DescriptionTitleText,
  TermDiv,
} from './styles';

export default function TermsUse({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Header
        left="profile"
        right="menu"
        rightFunction={setModalVisible}
        rightProps={modalVisible}
        title="Terms of use"
      />

      <Content>
        <TermDiv>
          <DescriptionTitleText>
            1 . Cloud bread iPhone viral shoreditch
          </DescriptionTitleText>
          <DescriptionText>
            Sartorial, scenester air plant try-hard. Listicle slow-carb glossier
            pitchfork kinfolk venmo. Taiyaki ramps cliche VHS, la croix tousled
            cray austin. Normcore live-edge before they sold out chia.
            Skateboard VHS chillwave snackwave.{'\n\n'} Air plant hashtag four
            dollar toast asymmetrical. Shaman microdosing cliche, wayfarers
            chicharrones tbh fashion axe. Chicharrones jianbing literally
            helvetica disrupt, fashion axe four dollar toast flexitarian organic
            kickstarter hell of biodiesel mixtape. Affogato brunch single-origin
            coffee 90's af farm-to-table chia VHS cornhole YOLO.
          </DescriptionText>

          <DescriptionTitleText>
            2 . Quinoa squid selvage paleo
          </DescriptionTitleText>
          <DescriptionText>
            Man braid hammock lumbersexual put a bird on it dreamcatcher. Enamel
            pin salvia keytar fashion axe irony photo booth before they sold
            out, bicycle rights meditation. Jianbing tumblr kitsch drinking
            vinegar venmo. Organic butcher put a bird on it waistcoat pop-up
            yuccie blue bottle VHS taiyaki next level. 8-bit godard street art
            VHS, chartreuse kinfolk single-origin coffee beard butcher try-hard.
            Flexitarian ethical church-key mlkshk hell of kale chips pour-over
            blog quinoa lyft. Mixtape jianbing ethical photo booth chia
            typewriter, man bun actually 90's messenger bag sartorial freegan
            disrupt.
          </DescriptionText>

          <DescriptionTitleText>
            3 . Pellentesque volutpat sit amet ligula ultrices scelerisque.
          </DescriptionTitleText>
          <DescriptionText>
            Aliquam efficitur ipsum ipsum, vulputate imperdiet lorem semper a.
            Vestibulum aliquet vestibulum ligula vel malesuada. Proin sit amet
            cursus arcu, non volutpat magna. Maecenas consequat odio fringilla
            diam aliquet, quis cursus lorem convallis. Mauris volutpat sagittis
            turpis. Suspendisse condimentum lorem id nisl pellentesque mollis.
            Mauris pretium sed leo at ultricies.
          </DescriptionText>
        </TermDiv>
      </Content>
    </Container>
  );
}
