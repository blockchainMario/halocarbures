import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Divider, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';
import axios from 'axios';

import GLOBALS from '../constants/Globals'

const list2 = [
    {
        title: 'Famille et proches aidants',
        icon: 'group',
        screen: 'CircleOfCare'
    },
    {
        title: 'Plan de soins',
        icon: 'local-hospital',
        screen: 'CarePlan'
    },
]

const list3 = [
    {
        title: 'Information sur la résidence',
        icon: 'hotel',
        screen: 'NursingHome'
    },
]

function getDocs() {
}

/*
const list4 = [
    {
        title: 'Bail',
        icon: 'assignment',
        document: 'http://18.191.91.177/SyMO/Bail.pdf'
    },
    {
        title: 'Annexe 19',
        icon: 'assignment',
        document: 'http://18.191.91.177/SyMO/Annexe19.pdf'
    },
]
*/

const Stack = createStackNavigator()

export default class MoreOptionsScreen extends Component {
  state = {
    documents: null
  }

  componentDidMount() {
    axios.get(GLOBALS.ENDPOINT+"/documents/"+GLOBALS.RESIDENCYID+"/"+GLOBALS.RESIDENTID, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+global.token
      }
    })
    .then(res => {
      const documents = res.data;
      this.setState({ documents: documents })
    })
    .catch((error) => {
      this.setState({ documents: [ ] });
      //alert("Erreur de connexion documents : "+error)
    })
  }

  render() {

    const navigation = this.props.navigation;
    
  return (
        
    (this.state.documents == null) ? (
      <View>
        <NunitoText style={styles.info}>Loading...</NunitoText>
      </View>
    ) : (
    <View style={styles.container}>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <NunitoText style={styles.subSection}>SOINS</NunitoText>

        <View>
        {
            list2.map((item, i) => (
            <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                bottomDivider
                chevron
                onPress={() => navigation.navigate(item.screen)}
            />
            ))
        }
        </View>

        <NunitoText style={styles.subSection}>HÉBERGEMENT</NunitoText>

        <View>
        {
            list3.map((item, i) => (
            <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                bottomDivider
                chevron
                onPress={() => navigation.navigate(item.screen)}
            />
            ))
        }
        </View>

        <NunitoText style={styles.subSection}>DOCUMENTS</NunitoText>

      <View>
      {
        this.state.documents.map((item, i) => (
        <ListItem
            key={i}
            title={item.name}
            leftIcon={{ name: 'assignment' }}
            bottomDivider
            chevron
            //onPress={() => navigation.navigate(item.screen)}
            onPress={() => WebBrowser.openBrowserAsync(item.file)}
        />
        ))
      }
      </View>

      </ScrollView>
    </View>
    )
  );
}
}

MoreOptionsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9e9e9',
    marginTop: -15,
  },
  contentContainer: {
    paddingTop: 30,
  },
  info:{
    fontSize:16,
    color: "black",
    marginTop:10
  },
  subSection: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  card: {
    marginVertical: 8,
    borderRadius: 0,
  },
  cover: {
    height: 160,
    borderRadius: 0,
  },
  content: {
    marginBottom: 12,
  },
  attribution: {
    margin: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
  },
  carePlanScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'black',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 24,
    color: 'black',
    lineHeight: 30,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
