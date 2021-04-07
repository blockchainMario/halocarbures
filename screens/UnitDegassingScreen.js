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

import DropDownPicker from 'react-native-dropdown-picker';
import { Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

class UnitDegassingScreen extends Component {
  state = {
    unit: null,
    haloQty: "",
    degassingDate: "",
    degassingEmployee: "Joel Tremblay",
    scanned: false,
    tankId: ""
  }

  componentDidMount() {
    var d = new Date();
    //today = today.toISOString().split('T')[0]+" "+today.toISOString().split('T')[1].slice(0,5);
    var today = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString());
    this.setState({degassingDate: today});
  }

  savedegassing = (navigation) => {
    //alert("http://18.190.29.217:8080/savedegassing/"+GLOBALS.UUID+"/"+this.state.degassingDate
    //+"/"+this.state.haloQty+"/"+this.state.tankId+"/"+this.state.degassingEmployee);
    axios.get("http://18.190.29.217:8080/savedegassing/"+GLOBALS.UUID+"/"+this.state.degassingDate
    +"/"+this.state.haloQty+"/"+this.state.tankId+"/"+this.state.degassingEmployee
    , {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const unit = res.data;
        //alert(JSON.stringify(unit));
        navigation.navigate('Root');
      })
      .catch((error) => {
        alert("Erreur de connexion Degassing : "+error)
      })
  }

  render() {
    const { t } = this.props;
    const navigation = this.props.navigation;

    const handleBarCodeScanned = ({ type, data }) => {
      this.setState({scanned: true});

      axios.get("http://18.190.29.217:8080/qrcode/"+data, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
        }
      })
        .then(res => {
          const answer = res.data;
          //alert(JSON.stringify(answer));
          if (answer.type == "tank") {
            this.setState({tankId: answer.id});
          } else {
            alert(t("tank:error"));
            this.setState({scanned: false});
          }
        })
        .catch((error) => {
          alert("Erreur de connexion Scan Tank : "+error)
        })
    };

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
          <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={this.state.scanned ? undefined : handleBarCodeScanned}
            style={styles.avatar}
          />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:degassingDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.degassingDate}</NunitoBoldText>
                    </View>
                    <View style={styles.line2}>
                        <NunitoText style={styles.label}>{t("tank:tankId")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.tankId}</NunitoBoldText>
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unit:haloQty")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          placeholder={t("unit:haloQty")}
                          placeholderTextColor = "#3e444c"
                          underlineColorAndroid='transparent'
                          onChangeText={(haloQty) => this.setState({haloQty})}
                      />
                    </View>

                    <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:degassingEmployee")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.degassingEmployee}</NunitoBoldText>
                    </View>

                  {this.state.haloQty.length > 0 && this.state.tankId.length > 0 && !isNaN(this.state.haloQty) && <TouchableOpacity
                    style={{
                        margin: 10,
                        borderRadius: 10,
                        borderWidth: 0,
                        backgroundColor: '#57b0e3',
                        opacity: 1
                    }}
                    onPress={() => this.savedegassing(navigation)}
                    >
                        <NunitoBoldText style={styles.textStyle}>{t("process:degassing")}</NunitoBoldText>
                  </TouchableOpacity>}
              </View>
            </View>
          </View>
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
    width: 220,
    height: 220,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:10
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

export default withTranslation()(UnitDegassingScreen);
 