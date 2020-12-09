import React, { useCallback, useRef, useState } from 'react';
import { Header, Modal } from '../../components';
import {
  Container,
  Content,
  DescriptionText,
  ProblemDiv,
  InputTitle,
  Input,
  TypePicker,
  ButtonDiv,
  ButtonAttach,
  ButtonAttachText,
  ButtonSend,
  ButtonSendText,
} from './styles';

export default function ReportProblem() {
  const [modalVisible, setModalVisible] = useState(false);
  const descricaoInputRef = useRef();
  const [descricao, setDescricao] = useState('');
  const [type, setType] = useState('');

  const handleAttach = useCallback(() => {
    console.log('handleAttach');
  });

  const handleSendFeedback = useCallback(() => {
    console.log('handleSendFeedback');
    console.log(`${type}: ${descricao}`);
  });

  return (
    <Container>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Header
        left="profile"
        right="menu"
        rightFunction={setModalVisible}
        rightProps={modalVisible}
        title="Report Problem"
      />

      <Content>
        <ProblemDiv>
          <DescriptionText>
            VHS vice sriracha pug humblebrag chicharrones artisanal craft
            Williamsburg.
          </DescriptionText>
        </ProblemDiv>

        <ProblemDiv>
          <InputTitle>Problem Type</InputTitle>
          <TypePicker
            placeHolder="fff"
            selectedValue={type}
            onValueChange={(itemValue, itemIndex) => setType(itemValue)}
          >
            <TypePicker.Item label="Select" value={null} color="#49769780" />
            <TypePicker.Item label="Problem type 1" value="1" />
            <TypePicker.Item label="Problem type 2" value="2" />
            <TypePicker.Item label="Problem type 3" value="3" />
            <TypePicker.Item label="Other" value="4" />
          </TypePicker>
        </ProblemDiv>

        <ProblemDiv>
          <InputTitle>Description</InputTitle>
          <Input
            multiline
            autoCapitalize="words"
            autoCorrect={false}
            onChangeText={setDescricao}
            onSubmitEditing={() => descricaoInputRef.current.focus()}
            ref={descricaoInputRef}
            returnKeyType="next"
            value={descricao}
          />
        </ProblemDiv>

        <ButtonDiv>
          <ButtonAttach onPress={handleAttach}>
            <ButtonAttachText>ATTACH FILE</ButtonAttachText>
          </ButtonAttach>
        </ButtonDiv>

        <ButtonDiv>
          <ButtonSend onPress={handleSendFeedback}>
            <ButtonSendText>SEND FEEDBACK</ButtonSendText>
          </ButtonSend>
        </ButtonDiv>
      </Content>
    </Container>
  );
}
