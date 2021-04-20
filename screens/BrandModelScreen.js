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

class BrandModelScreen extends Component {
  state = {
    brandModel: null
  }

  componentDidMount() {
    //alert("http://18.190.29.217:8080/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://18.190.29.217:8080/brandModel/"+GLOBALS.BRANDMODEL, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const brandModel = res.data;
        this.setState({ brandModel: brandModel });
        //alert(JSON.stringify(brandModel));
      })
      .catch((error) => {
        alert("Erreur de connexion Unit : "+error)
      })
  }

  render() {
    const { t } = this.props;
    const navigation = this.props.navigation;

    return (
      (this.state.brandModel == null) ? (
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
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:brand")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.brand}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:model")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.model}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:unitType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.unitType}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:haloType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.haloType}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:quantity")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.quantity}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:weight")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.weight}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Aluminium cuivre"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.alum1}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Aluminium domestique"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.alum2}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Aluminium mixte"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.alum3}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Brasse jaune"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.brass}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Carte électronique"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.card}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Compresseurs"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.comp}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Cuivre #2"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.copper2}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Cuivre #3"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.copper3}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Fils gainés #2"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.wire2}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Fils gainés #3"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.wire3}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Huiles"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.oils}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Plastique de couleur"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.plas1}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Plastique noir"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.plas2}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Rebuts"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.waste}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Solides huileux"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.solids}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"Thermomètres"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.thermo}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{"s-s 304"} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brandModel.ss304}</NunitoBoldText>
                      </View>

                      <TouchableOpacity
                        style={{
                          margin: 10,
                          borderRadius: 10,
                          borderWidth: 0,
                          backgroundColor: '#57b0e3',
                          opacity: 1
                        }}
                        onPress={() => navigation.navigate('UpdateBrandModel')}
                      >
                      <NunitoBoldText style={styles.textStyle}>{t("settings:editbrandmodel")}</NunitoBoldText>
                      </TouchableOpacity>

                    <View>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                    </View>

                </View>
              </View>
          </View>
       </ScrollView>
      </View>)
    );
  }
}

const styles = StyleSheet.create({
  pad:{
    fontSize: 20,
    color: '#e9e9e9',
  },
  textStyle: {
    textAlign: "center",
    padding: 5,
    fontSize: 20,
    color: "white"
  },
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

export default withTranslation()(BrandModelScreen);
