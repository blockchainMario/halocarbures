import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';
import ProfessionalCard from '../components/ProfessionalCard';

import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';
import { SimpleLineIcons } from '@expo/vector-icons';

import GLOBALS from '../constants/Globals'

export default class ProfessionalsScreen extends Component {
  state = {
    professionals: null
  }

  componentDidMount() {
    //axios.get('http://18.190.29.217:8080/api/v1/comments/0')
    //axios.get("https://v504.livia-parcoursdevie.fr/api/v1/"+GLOBALS.DOCTOR
        const professionals = [ ];
        professionals.push(GLOBALS.DOCTOR);
        this.setState({ professionals: professionals });
  }

  render() {
  return (
    (this.state.professionals == null) ? (
      <View style={styles.container}>
        <NunitoText style={styles.info}>Loading...</NunitoText>
      </View>
    ) : (
      <View style={styles.container}>
        <ScrollView 
          style={styles.container2} 
          contentContainerStyle={styles.contentContainer2}
          ref={ref => {this.scrollView = ref}}
        >
          <View>
            { this.state.professionals.map(professional => <ProfessionalCard key={professional} id={professional} />)}
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
    marginTop: 10,
  },
  container2: {
    flex: 1,
    marginBottom: 10,
  },
  info: {
    color: 'black',
    fontSize: 14,
  },
});
