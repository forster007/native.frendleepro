import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { DescriptionText, Divisor } from './styles';

export default function Accordion({ itens }) {
  const [state, setState] = useState({ expanded: true });

  const _handlePress = () => {
    setState({
      expanded: !state.expanded,
    });
  };
  return (
    <>
      {itens.map(item => (
        <List.Section style={{ backgroundColor: 'transparent' }}>
          <List.Accordion
            title={item.title}
            // expanded={state.expanded}
            onPress={_handlePress}
            titleStyle={{
              fontSize: 18,
              fontWeight: 'bold',
              marginLeft: -8,
              // marginBottom: 10,
              // paddingBottom: 20,
            }}
            style={{ padding: 0 }}
            descriptionStyle={{
              padding: 0,
              // marginBottom: 10,
            }}
            theme={{
              colors: {
                primary: '#33658a',
                text: '#16B8DC',
              },
            }}
          >
            <DescriptionText>{item.content}</DescriptionText>
          </List.Accordion>
          <Divisor />
        </List.Section>
      ))}
    </>
  );
}
