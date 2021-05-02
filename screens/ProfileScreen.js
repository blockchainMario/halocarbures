import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
//import { AsyncStorage } from '@react-native-community/async-storage';

import axios from 'axios';
import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';
import { LinearGradient } from 'expo-linear-gradient';

import GLOBALS from '../constants/Globals';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { withTranslation } from 'react-i18next';
import * as english from "../translations/en";
import * as french from "../translations/fr";

export default class ProfileScreen extends Component {
  state = {
    profile: null,
  }

  componentDidMount() {
    //alert("http://18.190.29.217:8080/api/v1/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://18.190.29.217:8080/api/v1/profile/"+GLOBALS.USERNAME, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const profile = res.data;
        this.setState({ profile: profile });
        //alert(JSON.stringify(profile));
      })
      .catch((error) => {
        alert("Erreur de connexion Profile : "+error)
      })
  }

  render() {
    const { t } = this.props;
    return (
      (this.state.profile == null) ? (
        <View style={styles.container}>
          <NunitoText style={styles.info}>Loading...</NunitoText>
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
            <View style={styles.container}>
                <Image style={styles.avatar} source={require('../assets/images/avatar.jpg')}/>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <NunitoText style={styles.name}>{this.state.profile.firstName+" "+this.state.profile.lastName}</NunitoText>
                        <NunitoText style={styles.info}>{this.state.profile.userName}</NunitoText>
                        <NunitoText style={styles.description}>{this.state.profile.jobName}</NunitoText>
                        <NunitoText style={styles.info}>{this.state.profile.organization}</NunitoText>
                        <NunitoText style={styles.description}>{this.state.profile.userId}</NunitoText>
                    </View>
                </View>
            </View>
         </ScrollView>
        </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9e9',
    marginTop: 0,
  },
  container2: {
    flex: 1,
    backgroundColor: '#e9e9e9',
    marginTop: 0,
  },
  contentContainer: {
    padding: 0,
  },
  contentContainer2: {
    padding: 0,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 200/2,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:20
  },
  name:{
    fontSize:24,
    color:"black",
  },
  body:{
    marginTop:240,
  },
  bodyContent: {
    alignItems: 'center',
    padding:10,
  },
  name:{
    fontSize:28,
    color: "black",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "black",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
});
 