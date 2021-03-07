import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  UIManager,
  findNodeHandle,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
//import { AsyncStorage } from '@react-native-community/async-storage';

// import components
import DropDown from '../components/DropDown';
import MyButton from '../components/MyButton';

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

class NewUnitScreen extends Component {
  state = {
    unit: null,
    serialNumber: "",
    today: "2021-03-05 11:15",
    show: false,
    position: {},
  }

  componentDidMount() {
    var today = new Date();
    today = today.toISOString().split('T')[0]+" "+today.toISOString().split('T')[1].slice(0,5)
    this.setState({today: today});
  }
  // handle showing the dropdown
  showDropDown = () => {
    if (this.button) {
      // use the uimanager to measure the button's position in the window
      UIManager.measure(findNodeHandle(this.button), (x, y, width, height, pageX, pageY) => {
        const position = { left: pageX, top: pageY, width: width, height: height };
        // setState, which updates the props that are passed to the DropDown component
        this.setState({show: true, position: { x: pageX + (width / 2), y: pageY + (2 * height / 3) }})
      });
    }
  }

  // hide the dropdown
  hideDropDown = (item) => {
    alert(item)
    this.setState({show: false, position: {}})
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
                      <View>
                        <NunitoBoldText style={styles.label}>{t("unit:serialNumber")}</NunitoBoldText>
                        <TextInput style={styles.field}
                            placeholder={t("unit:serialNumber")}
                            placeholderTextColor = "#3e444c"
                            underlineColorAndroid='transparent'
                            onChangeText={(serialNumber) => this.setState({serialNumber})}
                        />
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:receptionOrg")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{"REP Coderr"}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:receptionDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.today}</NunitoBoldText>
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
  label2:{
    fontSize:14,
    color: "black",
    marginTop:5,
    marginLeft:15
  },
  field:{
    margin: 10,
    height: 40,
    padding: 10,
    borderColor: '#3e444c',
    borderWidth: 1
  },
  info:{
    fontSize:16,
    color: "black",
    marginTop:10
  },
  info2:{
    fontSize:14,
    color: "black",
    marginTop:5
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

export default withTranslation()(NewUnitScreen);
 