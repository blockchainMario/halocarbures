import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TextInput,
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

import DropDownPicker from 'react-native-dropdown-picker';
import { Platform } from 'react-native';

class NewBrandModelScreen extends Component {
  state = {
    brandModel: null,
    brand: "",
    model: "",
    unitType: "",
    fromYear: "1960",
    toYear: "2021",
    haloType: "",
    quantity: "",
    weight: "",
    alum1: "",
    alum2: "",
    alum3: "",
    brass: "",
    card: "",
    comp: "",
    copper2: "",
    copper3: "",
    wire2: "",
    wire3: "",
    oils: "",
    plas1: "",
    plas2: "",
    waste: "",
    solids: "",
    thermo: "",
    ss304: "",
    unitTypeTable: [],
    haloTypeTable: [],
  }

  componentDidMount() {

    //alert("http://18.190.29.217:8080/api/v1/"+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get("http://18.190.29.217:8080/api/v1/list/"+GLOBALS.ORGANIZATION+"/unitTypeTable", {
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

  convert = () => {
    alert(eval(this.state.quantity)*0.0283495);
    this.setState({quantity: eval(this.state.quantity)*0.0283495});
  }

  savebrandmodel = (navigation, t) => {
    var valid = true;
    if (this.state.brand.length == 0 || this.state.model.length == 0 || this.state.unitType.length == 0
      || this.state.haloType.length == 0 || this.state.quantity.length == 0) {
      valid = false;
      alert(t("error:missing"));
    }
    if (isNaN(this.state.quantity)) {
      valid = false;
      alert(t("error:nan"));
    } else {
      if (eval(this.state.quantity) > 5) {
        valid = false;
        alert(t("error:lessthanfive"));
      }
    }
    if (valid) {
      const newBrand = this.state.brand.charAt(0).toUpperCase() + this.state.brand.slice(1);
      const newModel = this.state.model.toUpperCase();
      const newWeight = (this.state.weight.length == 0) ? "0" : this.state.weight;
      const newAlum1 = (this.state.alum1.length == 0) ? "0" : this.state.alum1;
      const newAlum2 = (this.state.alum2.length == 0) ? "0" : this.state.alum2;
      const newAlum3 = (this.state.alum3.length == 0) ? "0" : this.state.alum3;
      const newBrass = (this.state.brass.length == 0) ? "0" : this.state.brass;
      const newCard = (this.state.card.length == 0) ? "0" : this.state.card;
      const newComp = (this.state.comp.length == 0) ? "0" : this.state.comp;
      const newCopper2 = (this.state.copper2.length == 0) ? "0" : this.state.copper2;
      const newCopper3 = (this.state.copper3.length == 0) ? "0" : this.state.copper3;
      const newWire2 = (this.state.wire2.length == 0) ? "0" : this.state.wire2;
      const newWire3 = (this.state.wire3.length == 0) ? "0" : this.state.wire3;
      const newOils = (this.state.oils.length == 0) ? "0" : this.state.oils;
      const newPlas1 = (this.state.plas1.length == 0) ? "0" : this.state.plas1;
      const newPlas2 = (this.state.plas2.length == 0) ? "0" : this.state.plas2;
      const newWaste = (this.state.waste.length == 0) ? "0" : this.state.waste;
      const newSolids = (this.state.solids.length == 0) ? "0" : this.state.solids;
      const newThermo = (this.state.thermo.length == 0) ? "0" : this.state.thermo;
      const newss304 = (this.state.ss304.length == 0) ? "0" : this.state.ss304;
      
    axios.get("http://18.190.29.217:8080/api/v1/savebrandmodel/"+GLOBALS.ORGANIZATION
    +"/"+newBrand+"/"+newModel
    +"/"+this.state.unitType+"/"+this.state.fromYear+"/"+this.state.toYear
    +"/"+this.state.haloType+"/"+this.state.quantity+"/"+newWeight
    +"/"+newAlum1+"/"+newAlum2+"/"+newAlum3
    +"/"+newBrass+"/"+newCard+"/"+newComp
    +"/"+newCopper2+"/"+newCopper3+"/"+newWire2+"/"+newWire3
    +"/"+newOils+"/"+newPlas1+"/"+newPlas2
    +"/"+newWaste+"/"+newSolids+"/"+newThermo+"/"+newss304
    , {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const brandModel = res.data;
        //alert(JSON.stringify(brandModel));
        navigation.navigate('MoreOptions');
      })
      .catch((error) => {
        alert("Erreur de connexion New BrandModel : "+error)
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
              source={require('../assets/images/newUnit.png')}
            />
              <View style={styles.body}>
                  <View style={styles.bodyContent}>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:brand")+"*"}</NunitoBoldText>
                      <TextInput style={styles.field}
                          placeholder={t("unittype:brand")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(brand) => this.setState({brand})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:model")+"*"}</NunitoBoldText>
                      <TextInput style={styles.field}
                          placeholder={t("unittype:model")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(model) => this.setState({model})}
                      />
                    </View>

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 70 }) }}>
                      <NunitoBoldText style={styles.label}>{t("unit:unitType")+"*"}</NunitoBoldText>
                      <DropDownPicker
                        dropDownMaxHeight={250}
                        items={this.state.unitTypeTable}
                        defaultValue={this.state.unitType}
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

                    <View style={{ ...(Platform.OS !== 'android' && { zIndex: 40 }) }}>
                      <NunitoBoldText style={styles.label}>{t("unit:haloType")+"*"}</NunitoBoldText>
                      <DropDownPicker
                        dropDownMaxHeight={250}
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
                      <NunitoBoldText style={styles.label}>{t("unittype:quantity")+"*"}</NunitoBoldText>
                      <TextInput style={styles.field}
                          value={this.state.quantity}
                          keyboardType='numeric'
                          placeholder={t("unittype:quantity")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(quantity) => this.setState({quantity})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:weight")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:weight")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(weight) => this.setState({weight})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:alum1")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:alum1")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(alum1) => this.setState({alum1})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:alum2")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:alum2")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(alum2) => this.setState({alum2})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:alum3")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:alum3")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(alum3) => this.setState({alum3})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:brass")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:brass")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(brass) => this.setState({brass})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:card")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:card")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(card) => this.setState({card})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:comp")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:comp")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(comp) => this.setState({comp})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:copper2")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:copper2")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(copper2) => this.setState({copper2})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:copper3")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:copper3")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(copper3) => this.setState({copper3})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:wire2")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:wire2")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(wire2) => this.setState({wire2})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:wire3")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:wire3")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(wire3) => this.setState({wire3})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:oils")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:oils")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(oils) => this.setState({oils})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:plas1")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:plas1")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(plas1) => this.setState({plas1})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:plas2")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:plas2")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(plas2) => this.setState({plas2})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:waste")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:waste")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(waste) => this.setState({waste})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:solids")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:solids")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(solids) => this.setState({solids})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:thermo")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:thermo")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(thermo) => this.setState({thermo})}
                      />
                    </View>

                    <View>
                      <NunitoBoldText style={styles.label}>{t("unittype:ss304")}</NunitoBoldText>
                      <TextInput style={styles.field}
                          defaultvalue={""}
                          keyboardType='numeric'
                          placeholder={t("unittype:ss304")}
                          placeholderTextColor = "#57b0e3"
                          underlineColorAndroid='transparent'
                          onChangeText={(ss304) => this.setState({ss304})}
                      />
                    </View>

                  <TouchableOpacity
                    style={{
                        margin: 10,
                        borderRadius: 10,
                        borderWidth: 0,
                        backgroundColor: '#57b0e3',
                        opacity: 1
                    }}
                    onPress={() => this.savebrandmodel(navigation, t)}
                    >
                        <NunitoBoldText style={styles.textStyle}>{t("unittype:savemodel")}</NunitoBoldText>
                  </TouchableOpacity>

                    </View>
                </View>
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
  field:{
    margin: 10,
    height: 40,
    padding: 10,
    borderColor: '#3e444c',
    borderWidth: 1
  },
  field2:{
    margin: 10,
    marginLeft: 120,
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

export default withTranslation()(NewBrandModelScreen);
