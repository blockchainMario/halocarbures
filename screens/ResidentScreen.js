import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';

import axios from 'axios';
import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';
import { LinearGradient } from 'expo-linear-gradient';

import GLOBALS from '../constants/Globals'

export default class ResidentScreen extends Component {
  state = {
    resident: null,
    professional: null
  }

  componentDidMount() {
    //axios.get('http://18.191.91.177:8080/resident/0')
    //alert("Bienvenue dans proximité");
    //alert(global.token);

  if (global.token) {

    axios.get(GLOBALS.ENDPOINT+"/residents/"+GLOBALS.RESIDENCYID+"/"+GLOBALS.RESIDENTID, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+global.token
      }
    })
      .then(res => {
        const resident = res.data;
        this.setState({ resident: resident });
        //alert(JSON.stringify(resident));
      })
      .catch((error) => {
        alert("Erreur de connexion residents : "+error)
      })
    
    axios.get(GLOBALS.ENDPOINT+"/professionals/"+GLOBALS.RESIDENCYID+"/"+GLOBALS.PROFESSIONALID, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+global.token
        }
      })
        .then(res => {
          const professional = res.data;
          this.setState({ professional: professional });
          //alert(JSON.stringify(professional));
        })
        .catch((error) => {
          alert("Erreur de connexion professionals : "+error)
        })

    } else {

      //alert("Need to login!");
      const navigation = this.props.navigation;
      navigation.dispatch(StackActions.replace('Login'));
        
    }
    
  }

  render() {
    return (
      (this.state.resident == null || this.state.professional == null) ? (
        <View style={styles.container}>
          <NunitoText style={styles.info}>Loading...</NunitoText>
        </View>
    ) : (
      <View style={styles.container}>
        <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
          <View style={styles.container}>
              <Image style={styles.avatar} 
                  source={{
                    uri: GLOBALS.ENDPOINT+'/images/residents/'+GLOBALS.RESIDENCYID+"/"+GLOBALS.RESIDENTID+'/profile.jpg',
                    headers: {
                      Accept: 'image/jpeg',
                      'Authorization': 'Bearer '+global.token
                    }
                  }}
                />
              <View style={styles.body}>
                  <View style={styles.bodyContent}>
                      <NunitoBoldText style={styles.name}>{this.state.resident.firstName} {this.state.resident.lastName}</NunitoBoldText>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>Date de naissance : </NunitoText><NunitoBoldText style={styles.info}>{this.state.resident.birthDate.substr(0,10)}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>Date d'admission : </NunitoText><NunitoBoldText style={styles.info}>{""}</NunitoBoldText>
                      </View>
                      <NunitoBoldText style={styles.title}>Professionnels</NunitoBoldText>
                      <View style={styles.line}>
                        <NunitoBoldText style={styles.info}>{this.state.professional.firstName} {this.state.professional.lastName}</NunitoBoldText><NunitoText style={styles.label}> ({this.state.professional.jobTitle})</NunitoText>
                      </View>
                      <NunitoText style={styles.info}>{this.state.professional.address}, {this.state.professional.city}</NunitoText>
                      <NunitoText style={styles.info}>{this.state.professional.province}, {this.state.professional.country} {this.state.professional.postalCode}</NunitoText>
                      <NunitoText style={styles.info}>{this.state.professional.phone}</NunitoText>

                </View>
              </View>
          </View>
       </ScrollView>
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
    flex: 1,
    width: 400,
    height: 200,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:0
  },
  body:{
    marginTop: 210,
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
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
});
 