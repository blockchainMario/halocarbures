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
    brand: "",
    model: "",
    serialNumber: "",
    year: "",
    haloType: "",
    haloQty: "",
    weight: "",
    provenance: "",
    receptionDate: "",
    transporter: "",
    receptionEmployee: GLOBALS.FULLNAME,
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
  }

  saveunit = (navigation) => {
    //alert("http://18.190.29.217:8080/saveunit/"+GLOBALS.UUID+"/"+this.state.receptionDate);
    axios.get("http://18.190.29.217:8080/saveunit/"+GLOBALS.UUID+"/"+this.state.receptionDate
    +"/"+this.state.brandModel+"/"+this.state.year+"/"+this.state.serialNumber
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

    const getbrandmodel = (selection) => {
      this.setState({ brandModel: selection });
      //alert("http://18.190.29.217:8080/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
      axios.get("http://18.190.29.217:8080/brandModel/"+selection, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
        }
      })
        .then(res => {
          const selBrandModel = res.data;
          //alert(JSON.stringify(selBrandModel));
          this.setState({ brand: selBrandModel.brand });
          this.setState({ model: selBrandModel.model });
          this.setState({ unitType: selBrandModel.unitType });
          this.setState({ haloType: selBrandModel.haloType });
          this.setState({ haloQty: selBrandModel.quantity });
          this.setState({ weight: selBrandModel.weight });
        })
        .catch((error) => {
          alert("Erreur de connexion Unit : "+error)
        })
  
    }

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
                        onChangeItem={item => getbrandmodel(item.value)}
                      />
                    </View>

                    {this.state.brandModel.length > 0 && <View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:brand")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.brand}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:model")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.model}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:unitType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.unitType}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:haloType")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.haloType}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:quantity")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.haloQty}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>{t("unittype:weight")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.weight}</NunitoBoldText>
                      </View>
                    </View>}

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
                        <NunitoText style={styles.label}>{t("unit:receptionEmployee")} : </NunitoText>
                        <NunitoBoldText style={styles.info}>{this.state.receptionEmployee}</NunitoBoldText>
                    </View>

                  {this.state.serialNumber.length > 0 && <TouchableOpacity
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
 