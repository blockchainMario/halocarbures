import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';
import { Card, Divider } from 'react-native-elements';

import GLOBALS from '../constants/Globals'

import axios from 'axios';
import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

export default class ProfessionalCard extends React.Component {
  state = {
    professional: null
  }

  componentDidMount() {
    //axios.get('http://18.190.29.217:8080/api/v1/comments/0')
    //alert(this.props.id);
    axios.get("https://v504.livia-parcoursdevie.fr/api/v1"+this.props.id, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        //alert("De retour");
        const professional = res.data;
        this.setState({ professional: professional });
        //alert(JSON.stringify(professional));
      })
      .catch((error) => {
        this.setState({ professional: null });
        //alert("Erreur de connexion activities : "+error)
      })
  }

  render() {
    return (
        (this.state.professional == null) ? (
          <View style={styles.container}>
            <NunitoText style={styles.info}>Loading...</NunitoText>
          </View>
        ) : (
          <View style={styles.container}>
            <ScrollView 
              style={styles.container2}
            >
            <Card style={styles.card}>
                <View style={styles.line}>
                    <NunitoBoldText style={styles.info}>{this.state.professional.prenom} {this.state.professional.nom}</NunitoBoldText>
                </View>
                <NunitoText style={styles.info}>{this.state.professional.professionRomes[0].metier}</NunitoText>
                <NunitoText style={styles.info}>{this.state.professional.adresse}</NunitoText>
                <NunitoText style={styles.info}>{this.state.professional.codePostal} {this.state.professional.ville}</NunitoText>
                <NunitoText style={styles.info}>{this.state.professional.telFixe}</NunitoText>
            </Card>
           </ScrollView>
          </View>
        )
    )
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
    card: {
      marginVertical: 8,
      borderRadius: 0,
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