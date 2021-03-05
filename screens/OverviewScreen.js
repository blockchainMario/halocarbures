import React, { Component } from 'react';
import {
  Alert,
  View,
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ScrollViewProps,
  TouchableHighlight,
} from 'react-native';
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

class OverviewScreen extends Component {
  state = {
    messages: [ ],
    typing: "",
    clearInput: false
  }

  render() {
    const { t } = this.props;
    const navigation = this.props.navigation;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
        <View style={styles.container}>
          <Image style={styles.avatar}
            source={require('../assets/images/table1.jpg')}
          />
            <View style={styles.body}>
                <View style={styles.bodyContent}>

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
    width: 370,
    height: 300,
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

export default withTranslation()(OverviewScreen);
