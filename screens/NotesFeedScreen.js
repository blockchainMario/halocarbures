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

class NotesFeedScreen extends Component {
  state = {
    comments: null
  }

  render() {
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
          <View style={styles.container}>
            <Image style={styles.avatar}
              source={require('../assets/images/kenmore795.jpg')}
            />
              <View style={styles.body}>
                  <View style={styles.bodyContent}>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:company")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"Kenmore"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:model")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"795.79754.904"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:years")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"1998 - 2014"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:unitType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"Réfrigérateur"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:haloType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"R134a"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:quantity")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"0,145 kg"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:weight")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"128,4 kg"}</NunitoBoldText>
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
    width: 200,
    height: 280,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:0
  },
  body:{
    marginTop: 270,
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

export default withTranslation()(NotesFeedScreen);
