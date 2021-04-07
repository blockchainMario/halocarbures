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
    provenanceTable: [],
    transporterTable: [],
    unitTypeTable: [],
    brandModelTable: [],
    yearTable: [],
    haloTypeTable: [],
  }

  componentDidMount() {
    var d = new Date();
    //today = today.toISOString().split('T')[0]+" "+today.toISOString().split('T')[1].slice(0,5);
    var today = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+((parseInt(d.getMinutes()/5)*5).toString().length==2?(parseInt(d.getMinutes()/5)*5).toString():"0"+(parseInt(d.getMinutes()/5)*5).toString());
    this.setState({receptionDate: today});
    //alert("http://18.190.29.217:8080/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://18.190.29.217:8080/list/provenanceTable", {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const aList = res.data.listContent.sort();
        var provenanceTable = [];
        aList.forEach(function(entry) {
          provenanceTable.push({label: entry, value: entry})
        });
        //alert(JSON.stringify(provenanceTable));
        this.setState({provenanceTable: provenanceTable});
      })
      .catch((error) => {
        alert("Erreur de connexion Lists : "+error)
      })

    //alert("http://18.190.29.217:8080/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://18.190.29.217:8080/list/transporterTable", {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const aList = res.data.listContent.sort();
        var transporterTable = [];
        aList.forEach(function(entry) {
          transporterTable.push({label: entry, value: entry})
        });
        //alert(JSON.stringify(transporterTable));
        this.setState({transporterTable: transporterTable});
      })
      .catch((error) => {
        alert("Erreur de connexion Lists : "+error)
      })

      //alert("http://18.190.29.217:8080/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
      axios.get("http://18.190.29.217:8080/list/unitTypeTable", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
        }
      })
        .then(res => {
          const aList = res.data.listContent.sort();
          var unitTypeTable = [];
          aList.forEach(function(entry) {
            unitTypeTable.push({label: entry, value: entry})
          });
          //alert(JSON.stringify(unitTypeTable));
          this.setState({unitTypeTable: unitTypeTable});
        })
        .catch((error) => {
          alert("Erreur de connexion Lists : "+error)
        })
/*
    this.setState({brandModelTable: [
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
    ]});
*/

    //alert("http://18.190.29.217:8080/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://18.190.29.217:8080/brandModels", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
        }
      })
        .then(res => {
          const aList = res.data.listContent.sort();
          var brandModelTable = [];
          aList.forEach(function(entry) {
            brandModelTable.push({label: entry, value: entry})
          });
          //alert(JSON.stringify(haloTypeTable));
          this.setState({brandModelTable: brandModelTable});
        })
        .catch((error) => {
          alert("Erreur de connexion brandModelTable : "+error)
        })

    //alert("http://18.190.29.217:8080/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://18.190.29.217:8080/list/yearTable", {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
        }
      })
        .then(res => {
          const aList = res.data.listContent.sort().reverse();
          var yearTable = [];
          aList.forEach(function(entry) {
            yearTable.push({label: entry, value: entry})
          });
          //alert(JSON.stringify(yearTable));
          this.setState({yearTable: yearTable});
        })
        .catch((error) => {
          alert("Erreur de connexion Lists : "+error)
        })

    //alert("http://18.190.29.217:8080/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://18.190.29.217:8080/list/haloTypeTable", {
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

  saveunit = (navigation) => {
    //alert("http://18.190.29.217:8080/saveunit/"+GLOBALS.UUID+"/"+this.state.receptionDate+"/"+this.state.unitType
    //+"/"+this.state.brandModel+"/"+this.state.year+"/"+this.state.haloType+"/"+this.state.haloQty
    //+"/"+this.state.serialNumber+"/"+this.state.weight
    //+"/"+this.state.provenance+"/"+this.state.transporter+"/"+this.state.receptionEmployee);
    axios.get("http://18.190.29.217:8080/saveunit/"+GLOBALS.UUID+"/"+this.state.receptionDate+"/"+this.state.unitType
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
        const unit = res.data;
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
                        items={this.state.provenanceTable}
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
                        items={this.state.transporterTable}
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
                        items={this.state.unitTypeTable}
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
                        items={this.state.brandModelTable}
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
                        items={this.state.yearTable}
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
                        items={this.state.haloTypeTable}
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
 