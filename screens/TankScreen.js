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

class TankScreen extends Component {
  state = {
    tank: null,
    /*
		"tankId" : "7f9a293e-561a-4747-b459-034e767a5b36",
		"tankType" : "Small",
		"location" : "Degassing",
		"haloType" : "R22",
		"haloQty" : "12.3",
		"fullDate" : "2020-05-01 13:15",
		"departureDate" : "2020-05-14 8:15",
		"ticketId" : "PS-1001",
		"departureEmployee" : "99f642b1-7e9e-4165-9829-89f6876f6dd9",
		"provider" : "PureSphéra"
    */
  }

  componentDidMount() {
    //alert("http://18.190.29.217:8080/api/v1/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://18.190.29.217:8080/api/v1/"+GLOBALS.TYPE+"/"+GLOBALS.UUID, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const tank = res.data;
        this.setState({ tank: tank });
        //alert(JSON.stringify(unit));
      })
      .catch((error) => {
        alert("Erreur de connexion Unit : "+error)
      })
  }

  render() {
    const { t } = this.props;
    return (
      (this.state.tank == null) ? (
        <View style={styles.container}>
          <NunitoText style={styles.info}>Loading...</NunitoText>
        </View>
      ) : (
      <View style={styles.container}>
        <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
          <View style={styles.container}>
            <Image style={styles.avatar}
              source={require('../assets/images/tank.jpg')}
            />
              <View style={styles.body}>
                  <View style={styles.bodyContent}>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:tankType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.tankType}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:haloType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.haloType}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:location")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.processLoc}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:creationDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.creationDate}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:partialQty")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.partialQty}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:fullDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.fullDate}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:haloQty")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.haloQty}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:disposalDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.disposalDate}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:ticketId")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.ticketId}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:disposalEmployee")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.disposalEmployee}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:provider")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.provider}</NunitoBoldText>
                      </View>
                      <View style={styles.line2}>
                        <NunitoText style={styles.label}>{t("tank:tankId")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tank.tankId}</NunitoBoldText>
                      </View>
                  </View>
              </View>
          </View>
       </ScrollView>
      </View>
    )
    )
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
    width: 140,
    height: 140,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:0
  },
  body:{
    marginTop: 140,
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
  line2: {
    flexDirection:'column',
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

export default withTranslation()(TankScreen);
 