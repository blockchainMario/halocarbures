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

export default class NursingHomeScreen extends Component {
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

    onSendMessage = (aText) => {
      //alert("Button pressed "+aText);
      if (this.state.message.length < 1) {
        Alert.alert("proximité","Entrez d'abord un message ci-dessus");
      } else {
        axios({
          method: 'get',
          url: "http://18.191.91.177:8080/sendMsg/"+GLOBALS.USERNAME+"/"+aText+"/"+this.state.message
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
                      
                      <NunitoBoldText style={styles.name}>Nous contacter</NunitoBoldText>
                      <TextInput style={styles.field}
                        placeholder="Écrire votre message ici..."
                        placeholderTextColor = "#A071B1"
                        underlineColorAndroid='transparent'
                        value={this.state.message}
                        onChangeText={(message) => this.setState({message})}
                      />
                      
                      <TouchableHighlight style={styles.buttonContainer} onPress={() => onSendMessage("Votre message a été envoyé à la réception")}>
                      <NunitoText style={styles.info}>Envoyer à la réception</NunitoText>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.buttonContainer} onPress={() => onSendMessage("Votre message a été envoyé à l'équipe de soins")}>
                      <NunitoText style={styles.info}>Envoyer à l'équipe de soins</NunitoText>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.buttonContainer} onPress={() => onSendMessage("Votre message a été envoyé à la comptabilité")}>
                      <NunitoText style={styles.info}>Envoyer à la comptabilité</NunitoText>
                      </TouchableHighlight>
                      <TouchableHighlight style={styles.buttonContainer} onPress={() => onSendMessage("Votre message a été envoyé à la direction")}>
                      <NunitoText style={styles.info}>Envoyer à la direction</NunitoText>
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
    height: 40,
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
 