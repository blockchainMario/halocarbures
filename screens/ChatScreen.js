import * as React from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ScrollViewProps,
} from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { useScrollToTop, useTheme } from '@react-navigation/native';
import Color from 'color';

import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

const MESSAGES = [
    'Bonjour papa!',
    'Bonjour Véronique',
    'Comment vas-tu aujourd\'hui ?',
    'Très bien',
];

export default function ChatScreen() {

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
      >
        {MESSAGES.map((text, i) => {
          const odd = i % 2;

          return (
			<Card containerStyle={odd ? styles.card0 : styles.card1}>
                <Card containerStyle={odd ? styles.card2 : styles.card3}>
                    <View
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        style={[odd ? styles.even : styles.odd]}
                    >
                        <Image
                            style={[odd ? styles.avatarEven : styles.avatarOdd]}
                            source={
                            odd
                                ? require('../assets/images/gerard.jpg')
                                : require('../assets/images/veronique.jpg')
                            }
                        />
                        <View style={{flex:4}}>
                            <NunitoBoldText style={[odd ? styles.evenDate : styles.oddDate]}>8 mai 2020</NunitoBoldText>
                            <NunitoText style={styles.name}>{text}</NunitoText>
                        </View>
                    </View>
			    </Card>
			</Card>
          );
        })}
        
      </ScrollView>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.card, color: colors.text },
        ]}
        placeholderTextColor={Color(colors.text).alpha(0.5).rgb().string()}
        placeholder="Écrire un message"
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  evenDate:{
      fontSize: 14,
      textAlign: 'left',
      color:'black',
  },
  oddDate:{
      fontSize: 14,
      textAlign: 'left',
      color:'black',
  },
  name:{
    fontSize: 16,
    color: 'black',
  },
  card0:{
      backgroundColor:'#f8f8f8',
      borderColor:'#f0f0f0',
      borderWidth:0,
      borderRadius:10
  },
  card1:{
      backgroundColor:'#c5e5ec',
      borderWidth:0,
      borderRadius:10
  },
  card2:{
      backgroundColor:'#f8f8f8',
      borderColor:'#f4f4f4',
      borderWidth:0,
      borderRadius:5,
      margin:-10,
      marginBottom: -11
  },
  card3:{
      backgroundColor:'#c5e5ec',
      borderColor:'#b1d7df',
      borderWidth:0,
      borderRadius:5,
      margin:-10,
      marginBottom: -11
  },
  inverted: {
    transform: [{ scaleY: -1 }],
  },
  content: {
    padding: 0,
  },
  even: {
    flexDirection: 'row',
  },
  odd: {
    flexDirection: 'row-reverse',
  },
  avatarEven: {
    marginVertical: 0,
    marginHorizontal: 0,
    height: 40,
    width: 40,
    borderRadius: 40/2,
    marginRight : 12, 
    borderColor: '#fff',
    borderWidth: 2,
  },
  avatarOdd: {
    marginVertical: 0,
    marginHorizontal: 0,
    height: 40,
    width: 40,
    borderRadius: 40/2,
    marginLeft : 12, 
    borderColor: '#fff',
    borderWidth: 2,
  },
  input: {
    height: 48,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
