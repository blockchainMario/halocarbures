import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';

import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

export default class RegisterScreen extends Component {

  onClickListener = (navigation, viewId) => {
    //Alert.alert("Alert", "Button pressed "+viewId);
    navigation.dispatch(StackActions.replace('Root'));
  }

  render() {
    
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
      <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
        <Image style={styles.avatar} source={require('../assets/images/background.png')}/>
        <View>
          <NunitoBoldText style={styles.label}>Courriel</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Adresse courriel"
              placeholderTextColor = "#a483b8"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}
            />
        </View>
        
        <View>
          <NunitoBoldText style={styles.label}>Mot de passe</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Mot de passe"
              placeholderTextColor = "#a483b8"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}
            />
        </View>
        
        <View>
          <NunitoBoldText style={styles.label}>Confirmation du mot de passe</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Mot de passe"
              placeholderTextColor = "#a483b8"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}
            />
        </View>

        <TouchableHighlight
                style={{
                  margin: 10,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#a483b8'
                }}
                //onPress={() => this.onClickListener('login')}
                onPress={() => this.onClickListener(navigation)}
          >
            <NunitoBoldText style={styles.textStyle}>S'inscrire</NunitoBoldText>
          </TouchableHighlight>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    padding: 5,
    fontSize: 20,
    color: "white"
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
  },
  promoterName:{
    fontSize:24,
    alignSelf:'center',
    padding: 10,
    marginTop: 10,
  },
  label:{
    marginLeft: 10,
	},
	field:{
    margin: 10,
    height: 40,
    padding: 10,
    borderColor: '#8B4B9D',
    borderWidth: 1
	},
  container: {
    flex: 1,
    backgroundColor: '#e9e9e9',
    marginTop: 0,
    padding: 20,
  },
  container2: {
    flex: 1,
    backgroundColor: '#e9e9e9',
    marginTop: 0,
  },
  avatar: {
    width: 180,
    height: 150,
    alignSelf:'center',
    marginTop: 30,
    marginBottom: 30,
  },
});
 