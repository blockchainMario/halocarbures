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

class NewBinScreen extends Component {
  state = {
    bin: null,
    creationDate: "",
    binType: "",
  }

  componentDidMount() {
    var d = new Date();
    //today = today.toISOString().split('T')[0]+" "+today.toISOString().split('T')[1].slice(0,5);
    var today = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString());
    this.setState({creationDate: today});
  }

  savebin = (navigation) => {
    //alert("http://18.190.29.217:8081/savebin/"+GLOBALS.UUID+"/"+this.state.creationDate+"/"+this.state.binType);
    axios.get("http://18.190.29.217:8081/savebin/"+GLOBALS.UUID+"/"+this.state.creationDate+"/"+this.state.binType, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const bin = res.data[0];
        //alert(JSON.stringify(bin));
        navigation.navigate('Root');
      })
      .catch((error) => {
        alert("Erreur de connexion Bin : "+error)
      })
  }

  render() {
    const { t } = this.props;
    const navigation = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
          <View style={styles.container}>
            <Image style={styles.avatar}
              source={require('../assets/images/bin.png')}
            />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("bin:creationDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.creationDate}</NunitoBoldText>
                    </View>

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 10 }) }}>
                      <NunitoBoldText style={styles.label}>{t("bin:binType")}</NunitoBoldText>
                      <DropDownPicker
                        items={[
                          {label: 'Aluminium cuivre', value: 'Aluminium cuivre'},
                          {label: 'Aluminium domestique', value: 'Aluminium domestique'},
                          {label: 'Aluminium mixte', value: 'Aluminium mixte'},
                          {label: 'Brasse jaune', value: 'Brasse jaune'},
                          {label: 'Carte électronique', value: 'Carte électronique'},
                          {label: 'Compresseurs', value: 'Compresseurs'},
                          {label: 'Cuivre #2', value: 'Cuivre #2'},
                          {label: 'Cuivre #3', value: 'Cuivre #3'},
                          {label: 'Fils gainés #2', value: 'Fils gainés #2'},
                          {label: 'Fils gainés #3', value: 'Fils gainés #3'},
                          {label: 'Huiles', value: 'Huiles'},
                          {label: 'Plastique de couleur', value: 'Plastique de couleur'},
                          {label: 'Plastique noir', value: 'Plastique noir'},
                          {label: 'Rebuts', value: 'Rebuts'},
                          {label: 's/s 304', value: 's/s 304'},
                          {label: 'Solides huileux', value: 'Solides huileux'},
                          {label: 'Thermomètres', value: 'Thermomètres'},
                        ]}
                        defaultValue={this.state.binType}
                        placeholder={t("bin:binType")}
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
                          binType: item.value
                        })}
                      />
                    </View>

                    {this.state.binType.length > 0 && <TouchableOpacity
                    style={{
                        margin: 10,
                        borderRadius: 10,
                        borderWidth: 0,
                        backgroundColor: '#57b0e3',
                        opacity: 1
                    }}
                    onPress={() => this.savebin(navigation)}
                    >
                        <NunitoBoldText style={styles.textStyle}>{t("process:savebin")}</NunitoBoldText>
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

export default withTranslation()(NewBinScreen);
 