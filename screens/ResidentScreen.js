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

export default class ResidentScreen extends Component {
  state = {
    resident: null
  }

  componentDidMount() {
    axios.get('http://18.191.91.177:8080/resident/0')
      .then(res => {
        const resident = res.data;
        this.setState({ resident: resident });
        //alert(resident);
      })
  }

  render() {
    return (
      (this.state.resident == null) ? (
        <View style={styles.container}>
          <NunitoText style={styles.info}>Loading...</NunitoText>
        </View>
    ) : (
      <View style={styles.container}>
        <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
          <View style={styles.container}>
              <Image style={styles.avatar} source={{uri : this.state.resident.image}}/>
              <View style={styles.body}>
                  <View style={styles.bodyContent}>
                      <NunitoBoldText style={styles.name}>{this.state.resident.firstName} {this.state.resident.lastName}</NunitoBoldText>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>Date de naissance : </NunitoText><NunitoBoldText style={styles.info}>{this.state.resident.birthDate.substr(0,10)}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>Date d'admission : </NunitoText><NunitoBoldText style={styles.info}>{this.state.resident.admissionDate.substr(0,10)}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>Adresse : </NunitoText><NunitoBoldText style={styles.info}>{this.state.resident.address}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>Unité : </NunitoText><NunitoBoldText style={styles.info}>{this.state.resident.unit}</NunitoBoldText>
                      </View>
                      <View style={styles.line}>
                        <NunitoText style={styles.label}>Numéro de téléphone : </NunitoText><NunitoBoldText style={styles.info}>{this.state.resident.phoneNumber}</NunitoBoldText>
                      </View>
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
    width: 375,
    height: 240,
    marginBottom:10,
  },
  body:{
    marginTop: -10,
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
 