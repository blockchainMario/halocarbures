import React, { Component } from 'react';
import {
  Alert,
  Button,
  View,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ScrollViewProps,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { Card, Divider } from 'react-native-elements';
import { useScrollToTop, useTheme } from '@react-navigation/native';
import axios from 'axios';
import Color from 'color';

import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

import GLOBALS from '../constants/Globals'
import { withTranslation } from 'react-i18next';

//const { colors } = useTheme();

class MainScreen extends Component {
  state = {
    messages: [ ],
    typing: "",
    clearInput: false,
    type: "none",
    theObject: null,
    theObjectNotLocked: true,
  }

  componentDidMount() {

  if (GLOBALS.USERNAME) {

      if (GLOBALS.UUID.length > 0) {
      
        //alert("http://18.190.29.217:8080/qrcode/"+GLOBALS.UUID);
        axios.get("http://18.190.29.217:8080/qrcode/"+GLOBALS.UUID, {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
          }
        })
          .then(res => {
            const answer = res.data;
            //alert(JSON.stringify(answer));
            this.setState({type: answer.type});
            GLOBALS.TYPE = answer.type;
            if (answer.type != "unknown") {
              //axios.get("http://18.190.29.217:8080/"+answer.type+"/"+GLOBALS.UUID, {
              axios.get("http://18.190.29.217:8080/"+answer.type+"/"+GLOBALS.UUID, {
                headers: {
                  'Accept': 'application/json',
                  'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
                }
              })
                .then(res => {
                  const theObject = res.data;
                  //alert(JSON.stringify(theObject));
                  this.setState({theObject: theObject});
                  if (answer.type == "unit") {
                    //alert(JSON.stringify(theObject));
                    if (theObject.dismantlingDate.length > 0) this.setState({theObjectNotLocked: false});
                  }
                  if (answer.type == "tank") {
                    //alert(JSON.stringify(theObject));
                    if (theObject.disposalDate.length > 0) this.setState({theObjectNotLocked: false});
                  }
                  if (answer.type == "bin") {
                    //alert(JSON.stringify(theObject));
                    if (theObject.disposalDate.length > 0) this.setState({theObjectNotLocked: false});
                  }
                })
                .catch((error) => {
                  alert("Erreur de connexion QR Code Object : "+error)
                })
            }
          })
          .catch((error) => {
            alert("Erreur de connexion QR Code : "+error)
          })

      } else { 
        Alert.alert(GLOBALS.T("app:name"),GLOBALS.T("app:welcome")); 
      }

    } else {

      //alert("Need to login!");
      const navigation = this.props.navigation;
      navigation.dispatch(StackActions.replace('Login'));
        
    }
  }

  render() {
    const { t } = this.props;
    const navigation = this.props.navigation;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
        <View style={styles.container}>
          {this.state.type == "unknown" && <Image style={styles.avatar}
              source={require('../assets/images/question.png')}
            />}
          {this.state.type == "unit" && <Image style={styles.avatar}
              source={require('../assets/images/newUnit.png')}
            />}
          {this.state.type == "tank" && <Image style={styles.avatar}
              source={require('../assets/images/tank.jpg')}
            />}
          {this.state.type == "bin" && <Image style={styles.avatar}
              source={require('../assets/images/bin.png')}
            />}
            <View style={styles.body}>
                <View style={styles.bodyContent}>

          {this.state.type == "unit" && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('Unit')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:viewunit")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "unknown" && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('NewUnit')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:newunit")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "unknown" && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('NewTank')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:newtank")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "unknown" && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('NewBin')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:newbin")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "tank" && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('Tank')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:viewtank")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "unit" && this.state.theObjectNotLocked && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('Degassing')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:degassing")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "unit" && this.state.theObjectNotLocked && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('Storing')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:storing")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "unit" && this.state.theObjectNotLocked && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('Dismantling')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:dismantling")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "tank" && this.state.theObjectNotLocked && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('TankFull')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:tankfull")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "tank" && this.state.theObjectNotLocked && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('TankDisposal')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:tankdisposal")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "bin" && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('Bin')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:viewbin")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "bin" && this.state.theObjectNotLocked && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('BinFull')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:binfull")}</NunitoBoldText>
          </TouchableOpacity>}

          {this.state.type == "bin" && this.state.theObjectNotLocked && <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: 1
                }}
                onPress={() => navigation.navigate('BinDisposal')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:bindisposal")}</NunitoBoldText>
          </TouchableOpacity>}

        <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#a6ce39',
                  opacity: 1
                }}
                onPress={() => navigation.dispatch(StackActions.replace('Scan'))}
          >
            <NunitoBoldText style={styles.textStyle}>{t("main:scan")}</NunitoBoldText>
          </TouchableOpacity>

              </View>
            </View>
        </View>
     </ScrollView>
    </View>
    )
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
  label:{
    fontSize:16,
    color: "black",
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

export default withTranslation()(MainScreen);
