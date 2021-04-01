import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

import GLOBALS from '../constants/Globals'

export default class ProfileScreen extends Component {

  render() {
    return (
        <View style={styles.container}>
          <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
            <View style={styles.container}>
                <Image style={styles.avatar} source={require('../assets/images/avatar.jpg')}/>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <NunitoText style={styles.name}>{"Joel Tremblay"}</NunitoText>
                        <NunitoText style={styles.info}>{"joeltremblay@coderr.ca"}</NunitoText>
                        <NunitoText style={styles.description}>Jack of all trade</NunitoText>
                        <NunitoText style={styles.description}>de1a8a4e-ab8b-4ebc-937b-455bbb8ea50e</NunitoText>
                    </View>
                </View>
            </View>
         </ScrollView>
        </View>
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
    width: 200,
    height: 200,
    borderRadius: 200/2,
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
    alignItems: 'center',
    padding:10,
  },
  name:{
    fontSize:28,
    color: "black",
    fontWeight: "600"
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
 