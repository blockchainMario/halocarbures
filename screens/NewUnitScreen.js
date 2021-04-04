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

class NewUnitScreen extends Component {
  state = {
    unit: null,
    unitType: "",
    brandModel: "",
    serialNumber: "",
    weight: "",
    year: "",
    haloType: "",
    provenance: "",
    receptionDate: "",
    transporter: "",
    receptionEmployee: "Joel Tremblay",
  }

  componentDidMount() {
    var d = new Date();
    //today = today.toISOString().split('T')[0]+" "+today.toISOString().split('T')[1].slice(0,5);
    var today = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString());
    this.setState({receptionDate: today});
  }

  saveunit = (navigation) => {
    //alert("http://18.190.29.217:8081/saveunit/"+GLOBALS.UUID+"/"+this.state.receptionDate+"/"+this.state.unitType
    //+"/"+this.state.brandModel+"/"+this.state.year+"/"+this.state.haloType+"/"+this.state.haloQty
    //+"/"+this.state.serialNumber+"/"+this.state.weight
    //+"/"+this.state.provenance+"/"+this.state.transporter+"/"+this.state.receptionEmployee);
    axios.get("http://18.190.29.217:8081/saveunit/"+GLOBALS.UUID+"/"+this.state.receptionDate+"/"+this.state.unitType
    +"/"+this.state.brandModel+"/"+this.state.year+"/"+this.state.haloType+"/"+this.state.haloQty
    +"/"+this.state.serialNumber+"/"+this.state.weight
    +"/"+this.state.provenance+"/"+this.state.transporter+"/"+this.state.receptionEmployee
    , {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const unit = res.data[0];
        //alert(JSON.stringify(unit));
        navigation.navigate('Root');
      })
      .catch((error) => {
        alert("Erreur de connexion Unit : "+error)
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
              source={require('../assets/images/newUnit.png')}
            />
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:receptionDate")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.receptionDate}</NunitoBoldText>
                    </View>

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 90 }) }}>
                      <NunitoBoldText style={styles.label}>{t("unit:provenance")}</NunitoBoldText>
                      <DropDownPicker
                        items={[
                          {label: 'Alma', value: 'Alma'},
                          {label: 'Dolbeau', value: 'Dolbeau'},
                          {label: 'Hébertville', value: 'Hébertville'},
                          {label: 'Normandin', value: 'Normandin'},
                          {label: 'Roberval', value: 'Roberval'},
                          {label: 'Saint-Félicien', value: 'Saint-Félicien'},
                          {label: 'Saint-François-de-Sales', value: 'Saint-François-de-Sales'},
                          {label: 'Saint-Ludger-de-Milot', value: 'Saint-Ludger-de-Milot'},
                          {label: 'Aucun fournisseur', value: 'Aucun fournisseur'},
                        ]}
                        defaultValue={this.state.provenance}
                        placeholder={t("unit:provenance")}
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
                          provenance: item.value
                        })}
                      />
                    </View>

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 80 }) }}>
                      <NunitoBoldText style={styles.label}>{t("unit:transporter")}</NunitoBoldText>
                      <DropDownPicker
                        items={[
                          {label: 'Bernière', value: 'Bernière'},
                          {label: 'Besner', value: 'Besner'},
                          {label: 'Cascades', value: 'Cascades'},
                          {label: 'Collectes Coderr', value: 'Collectes Coderr'},
                          {label: 'CRE Transport', value: 'CRE Transport'},
                          {label: 'Grégoire', value: 'Grégoire'},
                          {label: 'Jardins du Saguenay', value: 'Jardins du Saguenay'},
                          {label: 'Jonadahi', value: 'Jonadahi'},
                          {label: 'RCI', value: 'RCI'},
                          {label: 'Rossignol Transport', value: 'Rossignol Transport'},
                          {label: 'Transport Guillemette', value: 'Transport Guillemette'},
                          {label: 'Transport Morneau', value: 'Transport Morneau'},
                          {label: 'Transport Robert', value: 'Transport Robert'},
                          {label: 'Transport Sanitaire Fortin', value: 'Transport Sanitaire Fortin'},
                          {label: 'Autre transporteur', value: 'Autre transporteur'},
                        ]}
                        defaultValue={this.state.transporter}
                        placeholder={t("unit:transporter")}
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
                          transporter: item.value
                        })}
                      />
                    </View>

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 70 }) }}>
                      <NunitoBoldText style={styles.label}>{t("unit:unitType")}</NunitoBoldText>
                      <DropDownPicker
                        items={[
                          {label: 'Air climatisé', value: 'Air climatisé'},
                          {label: 'Thermopompe', value: 'Thermopompe'},
                          {label: 'Déshumidificateur', value: 'Déshumidificateur'},
                          {label: 'Refroidisseur à vin', value: 'Refroidisseur à vin'},
                          {label: 'Cellier réfrigérant', value: 'Cellier réfrigérant'},
                          {label: "Distributeur d'eau", value: "Distributeur d'eau"},
                        ]}
                        defaultValue={this.state.tankType}
                        placeholder={t("unit:unitType")}
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
                          unitType: item.value
                        })}
                      />
                    </View>

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 60 }) }}>
                      <NunitoBoldText style={styles.label}>{t("unit:brandModel")}</NunitoBoldText>
                      <DropDownPicker
                        items={[
                          {label: 'Arctic King AP10SEWBA1RCM', value: 'Arctic King AP10SEWBA1RCM'},
                          {label: 'Arctic King MWDUL10CRN1BCJ4', value: 'Arctic King MWDUL10CRN1BCJ4'},
                          {label: 'Arctic King MWHUK10CRN8BCL0', value: 'Arctic King MWHUK10CRN8BCL0'},
                          {label: 'Arctic King MWHUK12CRN8BCL0', value: 'Arctic King MWHUK12CRN8BCL0'},
                          {label: 'Danby DPA120B8WDB', value: 'Danby DPA120B8WDB'},
                          {label: 'Danby DPA140B8BDB', value: 'Danby DPA140B8BDB'},
                          {label: 'Danby DPTA090HEB1WDB', value: 'Danby DPTA090HEB1WDB'},
                          {label: 'Danby DPTA120HEB1WDB', value: 'Danby DPTA120HEB1WDB'},
                          {label: 'Danby DPTA150HEB1WDB', value: 'Danby DPTA150HEB1WDB'},
                          {label: 'Koolatron WC12', value: 'Koolatron WC12'},
                          {label: 'Koolatron WC12-35D', value: 'Koolatron WC12-35D'},
                          {label: 'Koolatron WC24', value: 'Koolatron WC24'},
                          {label: 'Koolatron WC18', value: 'Koolatron WC18'},
                        ]}
                        searchable={true}
                        searchablePlaceholder={t("unit:searchbrandmodel")}
                        searchablePlaceholderTextColor="gray"
                        seachableStyle={{}}
                        searchableError={() => <Text>{t("unit:notfound")}</Text>}
                        defaultValue={this.state.brandModel}
                        placeholder={t("unit:brandModel")}
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
                          brandModel: item.value
                        })}
                      />
                    </View>

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 50 }) }}>
                      <NunitoBoldText style={styles.label}>{t("unit:year")}</NunitoBoldText>
                      <DropDownPicker
                        items={[
                          {label: '2021', value: '2021'}, 
                          {label: '2020', value: '2020'}, 
                          {label: '2019', value: '2019'}, {label: '2018', value: '2018'}, {label: '2017', value: '2017'},
                          {label: '2016', value: '2016'}, {label: '2015', value: '2015'}, {label: '2014', value: '2014'},
                          {label: '2013', value: '2013'}, {label: '2012', value: '2012'}, {label: '2011', value: '2011'},
                          {label: '2010', value: '2010'},
                          {label: '2009', value: '2009'}, {label: '2008', value: '2008'}, {label: '2007', value: '2007'},
                          {label: '2006', value: '2006'}, {label: '2005', value: '2005'}, {label: '2004', value: '2004'},
                          {label: '2003', value: '2003'}, {label: '2002', value: '2002'}, {label: '2001', value: '2001'},
                          {label: '2000', value: '2000'},
                          {label: '1999', value: '1999'}, {label: '1998', value: '1998'}, {label: '1997', value: '1997'},
                          {label: '1996', value: '1996'}, {label: '1995', value: '1995'}, {label: '1994', value: '1994'},
                          {label: '1993', value: '1993'}, {label: '1992', value: '1992'}, {label: '1991', value: '1991'},
                          {label: '1990', value: '1990'}, 
                          {label: '1989', value: '1989'}, {label: '1988', value: '1988'}, {label: '1987', value: '1987'},
                          {label: '1986', value: '1986'}, {label: '1985', value: '1985'}, {label: '1984', value: '1984'},
                          {label: '1983', value: '1983'}, {label: '1982', value: '1982'}, {label: '1981', value: '1981'},
                          {label: '1980', value: '1980'}, 
                          {label: '1979', value: '1979'}, {label: '1978', value: '1978'}, {label: '1977', value: '1977'},
                          {label: '1976', value: '1976'}, {label: '1975', value: '1975'}, {label: '1974', value: '1974'},
                          {label: '1973', value: '1973'}, {label: '1972', value: '1972'}, {label: '1971', value: '1971'},
                          {label: '1970', value: '1970'}, 
                          {label: '1969', value: '1969'}, {label: '1968', value: '1968'}, {label: '1967', value: '1967'},
                          {label: '1966', value: '1966'}, {label: '1965', value: '1965'}, {label: '1964', value: '1964'},
                          {label: '1963', value: '1963'}, {label: '1962', value: '1962'}, {label: '1961', value: '1961'},
                          {label: '1960', value: '1960'}, 
                        ]}
                        defaultValue={this.state.year}
                        placeholder={t("unit:year")}
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
                          year: item.value
                        })}
                      />
                    </View>

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 40 }) }}>
                      <NunitoBoldText style={styles.label}>{t("unit:haloType")}</NunitoBoldText>
                      <DropDownPicker
                        items={[
                          {label: 'R22', value: 'R22'},
                          {label: 'R134a', value: 'R134a'},
                          {label: 'R12 et autres', value: 'R12 et autres'},
                          {label: 'R410', value: 'R410'},
                        ]}
                        defaultValue={this.state.haloType}
                        placeholder={t("unit:haloType")}
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
                      <NunitoBoldText style={styles.label}>{t("unit:haloQty")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          placeholder={t("unit:haloQty")}
                          placeholderTextColor = "#3e444c"
                          underlineColorAndroid='transparent'
                          onChangeText={(haloQty) => this.setState({haloQty})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unit:serialNumber")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          placeholder={t("unit:serialNumber")}
                          placeholderTextColor = "#3e444c"
                          underlineColorAndroid='transparent'
                          onChangeText={(serialNumber) => this.setState({serialNumber})}
                      />
                    </View>
                    <View>
                      <NunitoBoldText style={styles.label}>{t("unit:weight")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          placeholder={t("unit:weight")}
                          placeholderTextColor = "#3e444c"
                          underlineColorAndroid='transparent'
                          onChangeText={(weight) => this.setState({weight})}
                      />
                    </View>

                    <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unit:receptionEmployee")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.receptionEmployee}</NunitoBoldText>
                    </View>

                  {this.state.weight.length > 0 && <TouchableOpacity
                    style={{
                        margin: 10,
                        borderRadius: 10,
                        borderWidth: 0,
                        backgroundColor: '#57b0e3',
                        opacity: 1
                    }}
                    onPress={() => this.saveunit(navigation)}
                    >
                        <NunitoBoldText style={styles.textStyle}>{t("process:saveunit")}</NunitoBoldText>
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

export default withTranslation()(NewUnitScreen);
 