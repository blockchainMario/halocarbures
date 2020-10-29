import React, { Component } from 'react';
import {
  AsyncStorage,
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
  state = {
    email: "",
    password: ""
  }

  onClickListener = (navigation, viewId) => {
  
    const setData = async () => {
      try {
            await AsyncStorage.setItem('@username', this.state.email.toLowerCase());
            await AsyncStorage.setItem('@password', this.state.password);
            alert('SUCCESSFULLY WRITTEN');
      } catch(e) {
            // save error
            alert('CANNOT WRITE ASYNC')
      }
    }
    //Alert.alert("Alert", "Button pressed "+viewId);
    setData();
    navigation.dispatch(StackActions.replace('Root'));
  }

  render() {
    
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
      <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
        <View style={styles.container3}>
          <Image style={styles.avatar} source={require('../assets/images/logoBlackongray.png')}/>
          <NunitoText style={styles.title}>proximité</NunitoText>
        </View>
        <View>
          <NunitoBoldText style={styles.label}>Courriel</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Adresse courriel"
              placeholderTextColor = "#A071B1"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}
            />
        </View>
        
        <View>
          <NunitoBoldText style={styles.label}>Mot de passe</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Mot de passe"
              placeholderTextColor = "#A071B1"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}
            />
        </View>
        
        <View>
          <NunitoBoldText style={styles.label}>Confirmation du mot de passe</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Mot de passe"
              placeholderTextColor = "#A071B1"
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
                  backgroundColor: '#A071B1'
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
    padding: 20,
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
 