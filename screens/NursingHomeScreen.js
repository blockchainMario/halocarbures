import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableHighlight,
  Alert
} from 'react-native';

import axios from 'axios';

import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

import GLOBALS from '../constants/Globals'
import { withTranslation } from 'react-i18next';

class NursingHomeScreen extends Component {
  state = {
    residence: null,
    message: ""
  }

  componentDidMount() {
    axios.get(GLOBALS.ENDPOINT+"/residencies/"+GLOBALS.RESIDENCYID)
    //axios.get(endPoint+'residencies/8d3e5cdd-b9b8-11ea-8ef4-cf8716974132')
      .then(res => {
        const residence = res.data;
        this.setState({ residence: residence });
        //alert(resident);
      })
      .catch((error) => {
        alert("Erreur de connexion : "+error)
      })
  }

  render() {
    const { t } = this.props;

    onSendMessage = (aText) => {
      //alert("Button pressed "+aText);
      if (this.state.message.length < 1) {
        Alert.alert(t("app:name"),t("residency:warning"));
      } else {
        axios({
          method: 'get',
          url: "http://18.190.29.217:8080/sendMsg/"+GLOBALS.USERNAME+"/"+aText+"/"+this.state.message
        }).then(res => {
          this.setState({ message: ""});
          Alert.alert("proximité",aText);
          })
          .catch((error) => {
            this.setState({ messages: [ ] });
            alert("Erreur d'envoi d'un message : "+error)
          })
      }
    }

    return (
      (this.state.residence == null) ? (
        <View style={styles.container}>
          <NunitoText style={styles.info}>Loading...</NunitoText>
        </View>
      ) : (
        <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 110 : 0}
        >
        <ScrollView 
              keyboardShouldPersistTaps="handled" 
              showsVerticalScrollIndicator={false}
              ref={ref => {this.scrollView = ref}}
              onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
          >
            <View style={styles.container}>
                <Image style={styles.avatar} 
                  source={{
                    uri: GLOBALS.ENDPOINT+'/images/residencies/'+GLOBALS.RESIDENCYID+'/profile',
                    headers: {
                      Accept: 'image/jpeg'
                    }
                  }}
                />
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                      <NunitoBoldText style={styles.name}>{this.state.residence.name}</NunitoBoldText>
                      <NunitoText style={styles.info}>{this.state.residence.address}</NunitoText>
                      <NunitoText style={styles.info}>{this.state.residence.city}</NunitoText>
                      <NunitoText style={styles.info}>{this.state.residence.province} {this.state.residence.country} {this.state.residence.postalCode}</NunitoText>
                      
                      <NunitoBoldText style={styles.name}>{t("residency:contactus")}</NunitoBoldText>
                      <TextInput style={styles.field}
                        multiline
                        numberOfLines={10}
                        placeholder={t("residency:invite")}
                        placeholderTextColor = "#A071B1"
                        underlineColorAndroid='transparent'
                        value={this.state.message}
                        onChangeText={(message) => this.setState({message})}
                      />
                      
                      <TouchableHighlight style={styles.buttonContainer} onPress={() => onSendMessage(t("residency:sentreception"))}>
                      <NunitoText style={styles.info}>{t("residency:reception")}</NunitoText>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.buttonContainer} onPress={() => onSendMessage(t("residency:sentcareteam"))}>
                      <NunitoText style={styles.info}>{t("residency:careteam")}</NunitoText>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.buttonContainer} onPress={() => onSendMessage(t("residency:sentaccounting"))}>
                      <NunitoText style={styles.info}>{t("residency:accounting")}</NunitoText>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.buttonContainer} onPress={() => onSendMessage(t("residency:sentmanagement"))}>
                      <NunitoText style={styles.info}>{t("residency:management")}</NunitoText>
                      </TouchableHighlight>
                    </View>
                </View>
            </View>
         </ScrollView>
        </KeyboardAvoidingView>
        </View>
      )
    );
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
    width: 400,
    height: 200,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:0
  },
  name:{
    fontSize:24,
    color:"black",
  },
  body:{
    marginTop:200,
  },
  bodyContent: {
    padding:10,
  },
  name:{
    marginTop:10,
    fontSize:24,
    color: 'black',
  },
  line: {
    flexDirection:'row',
  },
  label:{
    fontSize:16,
    color: "black",
    marginTop:10
  },
	field:{
    margin: 10,
    height: 80,
    padding: 10,
    borderColor: '#8B4B9D',
    borderWidth: 1
	},
  info:{
    fontSize:16,
    color: "black",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
});

export default withTranslation()(NursingHomeScreen);
 