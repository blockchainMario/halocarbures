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

class NewTankScreen extends Component {
  state = {
    tank: null,
    creationDate: "",
    tankType: "",
    haloType: "",
    tankTypeTable: [],
    haloTypeTable: [],
  }

  componentDidMount() {
    var d = new Date();
    //today = today.toISOString().split('T')[0]+" "+today.toISOString().split('T')[1].slice(0,5);
    var today = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString());
    this.setState({creationDate: today});

    //alert("http://18.190.29.217:8080/api/v1/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://18.190.29.217:8080/api/v1/list/"+GLOBALS.ORGANIZATION+"/tankTypeTable", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
        }
      })
        .then(res => {
          const aList = res.data.listContent.sort();
          var tankTypeTable = [];
          aList.forEach(function(entry) {
            tankTypeTable.push({label: entry, value: entry})
          });
          //alert(JSON.stringify(tankTypeTable));
          this.setState({tankTypeTable: tankTypeTable});
        })
        .catch((error) => {
          alert("Erreur de connexion Lists : "+error)
        })

    //alert("http://18.190.29.217:8080/api/v1/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://18.190.29.217:8080/api/v1/list/"+GLOBALS.ORGANIZATION+"/haloTypeTable", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
        }
      })
        .then(res => {
          const aList = res.data.listContent.sort();
          var haloTypeTable = [];
          aList.forEach(function(entry) {
            haloTypeTable.push({label: entry, value: entry})
          });
          //alert(JSON.stringify(haloTypeTable));
          this.setState({haloTypeTable: haloTypeTable});
        })
        .catch((error) => {
          alert("Erreur de connexion Lists : "+error)
        })
  }

  savetank = (navigation, t) => {
    var valid = true;
    if (this.state.tankType.length == 0 || this.state.haloType.length == 0) {
      valid = false;
      alert(t("error:missing"));
    }
    if (valid) {
    //alert("http://18.190.29.217:8080/api/v1/savetank/"+GLOBALS.ORGANIZATION+"/"+GLOBALS.UUID+"/"+this.state.creationDate+"/"+this.state.tankType+"/"+this.state.haloType);
    axios.get("http://18.190.29.217:8080/api/v1/savetank/"+GLOBALS.ORGANIZATION+"/"+GLOBALS.UUID+"/"+this.state.creationDate+"/"+this.state.tankType+"/"+this.state.haloType, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const tank = res.data;
        //alert(JSON.stringify(tank));
        if (tank.type == "tankexist") {
          alert(t("tank:exist")+this.state.haloType);
        } else {
          //alert("tank created!!");
        }
        GLOBALS.UUID = "";
        navigation.dispatch(StackActions.replace('Root'));
      })
      .catch((error) => {
        alert("Erreur de connexion Tank : "+error)
      })
    }
  }

  render() {
    const { t } = this.props;
    const navigation = this.props.navigation;
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
          <View style={styles.container}>
            <Image style={styles.avatar}
              source={require('../assets/images/tank.jpg')}
            />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("tank:creationDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.creationDate}</NunitoBoldText>
                    </View>

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 20 }) }}>
                      <NunitoBoldText style={styles.label}>{t("tank:tankType")+"*"}</NunitoBoldText>
                      <DropDownPicker
                        dropDownMaxHeight={250}
                        items={this.state.tankTypeTable}
                        defaultValue={this.state.tankType}
                        placeholder={t("tank:tankType")}
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
                          tankType: item.value
                        })}
                      />
                    </View>

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 10 }) }}>
                      <NunitoBoldText style={styles.label}>{t("tank:haloType")+"*"}</NunitoBoldText>
                      <DropDownPicker
                        dropDownMaxHeight={250}
                        items={this.state.haloTypeTable}
                        defaultValue={this.state.haloType}
                        placeholder={t("tank:haloType")}
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
                          haloType: item.value
                        })}
                      />
                    </View>
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

                  <TouchableOpacity
                    style={{
                        margin: 5,
                        borderRadius: 10,
                        borderWidth: 0,
                        backgroundColor: '#57b0e3',
                        opacity: 1
                    }}
                    onPress={() => this.savetank(navigation, t)}
                    >
                        <NunitoBoldText style={styles.textStyle}>{t("process:savetank")}</NunitoBoldText>
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
      </View>
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
    marginTop:10
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

export default withTranslation()(NewTankScreen);
 