import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import axios from 'axios';

import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

const endPoint = 'https://xmy30ackkf.execute-api.us-east-2.amazonaws.com/api/';

export default class NursingHomeScreen extends Component {
  state = {
    residence: null
  }

  componentDidMount() {
    //axios.get('http://18.191.91.177:8080/residence/0')
    axios.get(endPoint+'residencies/8d3e5cdd-b9b8-11ea-8ef4-cf8716974132')
      .then(res => {
        const residence = res.data;
        this.setState({ residence: residence });
        //alert(resident);
      })
  }

  render() {
    return (
      (this.state.residence == null) ? (
        <View style={styles.container}>
          <NunitoText style={styles.info}>Loading...</NunitoText>
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
            <View style={styles.container}>
                <Image style={styles.avatar} source={{uri : this.state.residence.image}}/>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                      <NunitoBoldText style={styles.name}>{this.state.residence.name}</NunitoBoldText>
                      <NunitoBoldText style={styles.info}>{this.state.residence.address}</NunitoBoldText>
                      <NunitoText style={styles.description}>{this.state.residence.description}</NunitoText>
                      <NunitoBoldText style={styles.name}>Nous contacter</NunitoBoldText>
                      <NunitoBoldText style={styles.info}>Réception +1 418 546-0914</NunitoBoldText>
                      <NunitoBoldText style={styles.info}>Équipe de soins +1 418 546-4049</NunitoBoldText>
                      <NunitoBoldText style={styles.info}>Comptabilité +1 418 546-6578</NunitoBoldText>
                      <NunitoBoldText style={styles.info}>Direction +1 418 546-3367</NunitoBoldText>
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
    width: 400,
    height: 200,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:20
  },
  name:{
    fontSize:24,
    color:"black",
  },
  body:{
    marginTop:240,
  },
  bodyContent: {
    padding:10,
  },
  name:{
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
 