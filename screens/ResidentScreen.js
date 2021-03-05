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

class ResidentScreen extends Component {
  state = {
    unit: null,
    admissionDate: "",
    base64image: "",
  }

  componentDidMount() {
    //axios.get('http://18.190.29.217:8080/resident/0')
    //alert("Bienvenue dans proximité");
    const getData = async () => {
      try {
          const myusername = await AsyncStorage.getItem('@username');
          const mypassword = await AsyncStorage.getItem('@password');
          const navigation = this.props.navigation;
          //if (myusername === null) {
          if (true) {
            navigation.dispatch(StackActions.replace('Login'));
          } else {
            //const navigation = this.props.navigation;
            //navigation.dispatch(StackActions.replace('Register'));
            //navigation.dispatch(StackActions.replace('Login'));
          //alert('Current value is: '+myusername+'/'+mypassword);
            i18n
              .use(initReactI18next)
              .init({
                resources: {
                  en: english,
                  fr: french,
                },
                //lng: Localization.locale,
                lng: GLOBALS.LANGUAGE,
                fallbackLng: 'fr',
                interpolation: {
                  escapeValue: false,
                },
                cleanCode: true,
              }).then(function(t) { GLOBALS.T = t; });
            //alert('Translation all set');
            //alert(GLOBALS.T);
            navigation.dispatch(StackActions.replace('Root'));
          
          }
      } catch(e) {
        // error reading value
          alert('ERROR READING ASYNC VALUE!');
      }
    }

  if (GLOBALS.BEARERTOKEN) {
    //alert("https://"+GLOBALS.PREFIXEDEPLOIEMENT+".livia-parcoursdevie.fr/api/usagers/340");
    } else {
      //alert("Need to getData!");
      //getData();
      setTimeout(function(){ getData(); }, 1000);
        
    }
    
  }

  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
          <View style={styles.container}>
            <Image style={styles.avatar}
              source={require('../assets/images/tagID.jpg')}
            />
              <View style={styles.body}>
                  <View style={styles.bodyContent}>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:receptionOrg")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"REP Coderr"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:receptionDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"2021-02-15 09:15"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:transport")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"Transport Morneau"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:receptionEmployee")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"Jean Untel, #001291297"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:provenance")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"Écocentre St-Ludger-De-Milot"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:unitType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"Kenmore 795.79754.904"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:haloType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"R134a"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:estimatedQty")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"0,145 kg"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:destination")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"PureSphéra"}</NunitoBoldText>
                      </View>
                </View>
              </View>
          </View>
       </ScrollView>
      </View>
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
    flex: 1,
    width: 260,
    height: 240,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:0
  },
  body:{
    marginTop: 230,
  },
  bodyContent: {
    padding:10,
  },
  name:{
    fontSize:24,
    color: 'black',
  },
  title:{
    fontSize:24,
    color: 'black',
    marginTop:20
  },
  line: {
    flexDirection:'row',
  },
  label:{
    fontSize:16,
    color: "#3e444c",
    marginTop:10
  },
  info:{
    fontSize:16,
    color: "black",
    marginTop:10
  },
  addr:{
    fontSize:16,
    color: "black",
    marginLeft:70,
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
});

export default withTranslation()(ResidentScreen);
 