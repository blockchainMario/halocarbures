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
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

import GLOBALS from '../constants/Globals'

export default class LoginScreen extends Component {

  onClickListener = (navigation) => {
    //alert("Button pressed "+this.state.email);
    //await axios.get('http://18.191.91.177:8080/login')
    axios.get('http://18.191.91.177:8080/sign/'+this.state.email+'/'+this.state.password)
    .then(res => {
      const pack = res.data;
      GLOBALS.BEARERTOKEN = pack.token;
      GLOBALS.RESIDENCYID = pack.residencyId;
      GLOBALS.RESIDENTID = pack.residentId;
      GLOBALS.USERNAME = this.state.email;
      //alert(token);
      navigation.dispatch(StackActions.replace('Root'));
    })
  }

  render() {
    
    const navigation = this.props.navigation;
    //alert(Object.keys(navigation));
    return (
      <View style={styles.container}>
      <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
        <View  style={styles.container3}>
          <Image style={styles.avatar} source={require('../assets/images/logoBlackongray.png')}/>
          <NunitoText style={styles.title}>proximité</NunitoText>
        </View>
        <View>
          <NunitoBoldText style={styles.label}>Courriel</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Adresse courriel"
              placeholderTextColor = "#8B4B9D"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}
            />
        </View>
        
        <View>
          <NunitoBoldText style={styles.label}>Mot de passe</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Mot de passe"
              placeholderTextColor = "#8B4B9D"
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
            <NunitoBoldText style={styles.textStyle}>Accéder</NunitoBoldText>
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
  title:{
    marginTop: 30,
    marginLeft: 10,
    fontSize: 36,
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
    padding: 0,
  },
  container2: {
    flex: 1,
    backgroundColor: '#e9e9e9',
    marginTop: 0,
  },
  container3: {
    flexDirection: "row",
    alignSelf:'center',
    backgroundColor: '#e9e9e9',
    marginTop: 0,
  },
  avatar: {
    width: 60,
    height: 60,
    alignSelf:'center',
    marginTop: 30,
    marginBottom: 30,
  },
});
 