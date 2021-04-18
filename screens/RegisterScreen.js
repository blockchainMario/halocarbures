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
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

import GLOBALS from '../constants/Globals';
import { withTranslation } from 'react-i18next';

import DropDownPicker from 'react-native-dropdown-picker';
import { Platform } from 'react-native';

class RegisterScreen extends Component {
  state = {
    organization: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    jobName: "",
  }

  onClickListener = (navigation, viewId) => {
  
    const setData = async () => {
      try {
            await AsyncStorage.setItem('@username', this.state.email.toLowerCase());
            await AsyncStorage.setItem('@password', this.state.password);
            GLOBALS.ORGANIZATION = this.state.organization;
            GLOBALS.USERNAME = this.state.email.toLowerCase();
            GLOBALS.FULLNAME = this.state.firstName+" "+this.state.lastName;
            //alert(this.state.organization+"/"+this.state.email+"/"+this.state.password
            //+"/"+this.state.firstName+"/"+this.state.lastName+"/"+this.state.jobName);
            //alert('SUCCESSFULLY WRITTEN');
            axios.get("http://18.190.29.217:8080/saveprofile/"+this.state.email.toLowerCase()
            +"/"+this.state.password+"/"+this.state.organization
            +"/"+this.state.firstName+"/"+this.state.lastName+"/"+this.state.jobName, {
              headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
              }
            })
              .then(res => {
                const profile = res.data;
                //alert(JSON.stringify(profile));
                navigation.dispatch(StackActions.replace('Root'));
              })
              .catch((error) => {
                alert("Erreur de connexion Bin : "+error)
              })
      } catch(e) {
            // save error
            alert('CANNOT WRITE ASYNC')
      }
    }
    //Alert.alert("Alert", "Button pressed "+viewId);
    setData();
  
  }

  render() {
    
    const navigation = this.props.navigation;
    const { t } = this.props;

    return (
      <View style={styles.container}>
      <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
        <View  style={styles.container3}>
          <Image style={styles.avatar} source={require('../assets/images/rivraLogo.png')}/>
        </View>

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 90 }) }}>
                      <NunitoBoldText style={styles.label}>{t("register:organization")}</NunitoBoldText>
                      <DropDownPicker
                        items={[
                          {label: "Défi Polyteck", value: "Polyteck"},
                          {label: "Groupe Aptas", value: "Aptas"},
                          {label: "Option Métal Recyclé du Québec", value: "Option"},
                          {label: "Papiers Soliderr inc", value: "Coderr"},
                          {label: "Recyclo-Centre", value: "Recyclo"}
                        ]}
                        defaultValue={this.state.organization}
                        placeholder={t("register:organization")}
                        placeholderStyle={{color: '#57b0e3', marginLeft:0}}
                        containerStyle={{height: 40, margin:10}}
                        style={{backgroundColor: '#e9e9e9', borderColor: '#8B4B9D',
                          borderTopLeftRadius: 0, borderTopRightRadius: 0,
                          borderBottomLeftRadius: 0, borderBottomRightRadius: 0
                        }}
                        itemStyle={{
                          justifyContent: 'flex-start', marginLeft:0
                        }}
                        dropDownStyle={{backgroundColor: '#e9e9e9'}}
                        onChangeItem={item => this.setState({
                          organization: item.value
                        })}
                      />
                    </View>

        <View>
          <NunitoBoldText style={styles.label}>Courriel</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Adresse courriel"
              placeholderTextColor = "#57b0e3"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}
            />
        </View>
        
        <View>
          <NunitoBoldText style={styles.label}>Mot de passe</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Mot de passe"
              placeholderTextColor = "#57b0e3"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}
            />
        </View>
        
        <View>
          <NunitoBoldText style={styles.label}>Confirmation du mot de passe</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Mot de passe"
              placeholderTextColor = "#57b0e3"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}
            />
        </View>

        <View>
          <NunitoBoldText style={styles.label}>Prénom</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Prénom"
              placeholderTextColor = "#57b0e3"
              underlineColorAndroid='transparent'
              onChangeText={(firstName) => this.setState({firstName})}
            />
        </View>

        <View>
          <NunitoBoldText style={styles.label}>Nom de famille</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Nom de famille"
              placeholderTextColor = "#57b0e3"
              underlineColorAndroid='transparent'
              onChangeText={(lastName) => this.setState({lastName})}
            />
        </View>

        <View>
          <NunitoBoldText style={styles.label}>Poste de travail</NunitoBoldText>
          <TextInput style={styles.field}
              placeholder="Poste de travail"
              placeholderTextColor = "#57b0e3"
              underlineColorAndroid='transparent'
              onChangeText={(jobName) => this.setState({jobName})}
            />
        </View>

        <TouchableHighlight
                style={{
                  margin: 10,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3'
                }}
                onPress={() => this.onClickListener(navigation)}
          >
            <NunitoBoldText style={styles.textStyle}>{t("register:confirm")}</NunitoBoldText>
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
    borderColor: '#3e444c',
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
    width: 320,
    height: 196,
    alignSelf:'center',
    marginTop: 30,
    marginBottom: 30,
  },
});

export default withTranslation()(RegisterScreen);