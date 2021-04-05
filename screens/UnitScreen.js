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

class UnitScreen extends Component {
  state = {
    unit: null,
    /*
"unitId":"b391f8d2-7878-4281-b377-869151ed3e4a",
"unitType":"Cellier réfrigérant",
"location":"Reception",
"destination":"Dismantling",
"brandModel":"ac0f7a7b-56b9-473b-81e6-8c0c94783227",
"brand":"Frigidaire",
"model":"795.79754.904",
"year":"2004",
"haloType":"R134a",
"haloQty":"0.144",
"weight":"103.14",
"serialNumber":"glht186jwo",
"provenance":"Alma",
"mrc":"Lac-Saint-Jean-Est",
"receptionDate":"2020-05-14 7:53",
"transporter":"CRE Transport",
"destinataire":"REP Coderr",
"receptionEmployee":"99f642b1-7e9e-4165-9829-89f6876f6dd9",
"storageIn":"2020-05-18 10:52",
"storageOut":"2020-05-30 8:11"
    */
  }

  componentDidMount() {
    //alert("http://10.0.0.81:8081/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://10.0.0.81:8081/"+GLOBALS.TYPE+"/"+GLOBALS.UUID, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const unit = res.data;
        this.setState({ unit: unit });
        //alert(JSON.stringify(unit));
      })
      .catch((error) => {
        alert("Erreur de connexion Unit : "+error)
      })
  }

  render() {
    const { t } = this.props;
    return (
      (this.state.unit == null) ? (
        <View style={styles.container}>
          <NunitoText style={styles.info}>Loading...</NunitoText>
        </View>
      ) : (
      <View style={styles.container}>
        <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
          <View style={styles.container}>
            <Image style={styles.avatar}
              source={require('../assets/images/newUnit.png')}
            />
              <View style={styles.body}>
                  <View style={styles.bodyContent}>
                      <View style={styles.line2}>
                        <NunitoText style={styles.label}>{t("unit:unitId")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.unitId}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:unitType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.unitType}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:location")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.processLoc}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:receptionDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.receptionDate}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:destination")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.destination}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:brandModel")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.brandModel}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:year")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.year}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:haloType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.haloType}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:haloQty")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.haloQty}</NunitoBoldText>
                        <NunitoText style={styles.label}> {t("measure:kg")}</NunitoText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:weight")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.weight}</NunitoBoldText>
                        <NunitoText style={styles.label}> {t("measure:kg")}</NunitoText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:serialNumber")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.serialNumber}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:provenance")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.provenance}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:mrc")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.mrc}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:transporter")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.transporter}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:destinataire")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.destinataire}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:receptionEmployee")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.receptionEmployee}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:degassingDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.degassingDate}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:degassingEmployee")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.degassingEmployee}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:storingDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.storingDate}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:dismantlingDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unit.dismantlingDate}</NunitoBoldText>
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

export default withTranslation()(UnitScreen);
 