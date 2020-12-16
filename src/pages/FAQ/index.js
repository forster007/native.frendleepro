import React, { useState } from 'react';
import { Header, Modal, Accordion } from '../../components';
import { Container, Content } from './styles';

export default function FAQ() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Container>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Header
        left="profile"
        right="menu"
        rightFunction={setModalVisible}
        rightProps={modalVisible}
        title="Common questions"
      />

      <Content>
        <Accordion
          itens={[
            {
              title: 'Cloud bread iPhone viral shoreditch',
              content:
                'Sartorial, scenester air plant try-hard. Listicle slow-carb glossier pitchfork kinfolk venmo. Taiyaki ramps cliche VHS, la croix tousled cray austin. Normcore live-edge before they sold out chia. Skateboard VHS chillwave snackwave.',
            },
            {
              title: 'Glossier shoreditch try-hard?',
              content:
                'Sartorial, scenester air plant try-hard. Listicle slow-carb glossier pitchfork kinfolk venmo. Taiyaki ramps cliche VHS, la croix tousled cray austin. Normcore live-edge before they sold out chia. Skateboard VHS chillwave snackwave.',
            },
            {
              title: 'Taiyaki ramps cliche VHS?',
              content:
                'Sartorial, scenester air plant try-hard. Listicle slow-carb glossier pitchfork kinfolk venmo. Taiyaki ramps cliche VHS, la croix tousled cray austin. Normcore live-edge before they sold out chia. Skateboard VHS chillwave snackwave.',
            },
            {
              title: 'Normcore live-edge before they sold out?',
              content:
                'Sartorial, scenester air plant try-hard. Listicle slow-carb glossier pitchfork kinfolk venmo. Taiyaki ramps cliche VHS, la croix tousled cray austin. Normcore live-edge before they sold out chia. Skateboard VHS chillwave snackwave.',
            },
            {
              title: 'Chia skateboard chillwave?',
              content:
                'Sartorial, scenester air plant try-hard. Listicle slow-carb glossier pitchfork kinfolk venmo. Taiyaki ramps cliche VHS, la croix tousled cray austin. Normcore live-edge before they sold out chia. Skateboard VHS chillwave snackwave.',
            },
            {
              title: 'Snackwave craft IPA kinfolk venmo?',
              content:
                'Sartorial, scenester air plant try-hard. Listicle slow-carb glossier pitchfork kinfolk venmo. Taiyaki ramps cliche VHS, la croix tousled cray austin. Normcore live-edge before they sold out chia. Skateboard VHS chillwave snackwave.',
            },
            {
              title: 'Glossier shoreditch try-hard?',
              content:
                'Sartorial, scenester air plant try-hard. Listicle slow-carb glossier pitchfork kinfolk venmo. Taiyaki ramps cliche VHS, la croix tousled cray austin. Normcore live-edge before they sold out chia. Skateboard VHS chillwave snackwave.',
            },
            {
              title: 'Snackwave craft IPA kinfolk venmo?',
              content:
                'Sartorial, scenester air plant try-hard. Listicle slow-carb glossier pitchfork kinfolk venmo. Taiyaki ramps cliche VHS, la croix tousled cray austin. Normcore live-edge before they sold out chia. Skateboard VHS chillwave snackwave.',
            },
          ]}
        />
      </Content>
    </Container>
  );
}
