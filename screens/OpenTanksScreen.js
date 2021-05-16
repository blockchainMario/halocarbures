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
import { withTranslation } from 'react-i18next';

const Stack = createStackNavigator()

class OpenTanksScreen extends Component {
  state = {
    openTanks: []
  }

  componentDidMount() {

    //alert(GLOBALS.ENDPOINT+GLOBALS.TYPE+"/"+GLOBALS.UUID);
    axios.get(GLOBALS.ENDPOINT+"opentanks/"+GLOBALS.ORGANIZATION, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const openTanks = res.data;
		openTanks.sort((a, b) => {
			let fa = a.haloType+" - "+a.tankType+" - "+a.creationDate,
				fb = b.haloType+" - "+b.tankType+" - "+b.creationDate;
			if (fa < fb) {
				return -1;
			}
			if (fa > fb) {
				return 1;
			}
			return 0;
		  });
        //alert(JSON.stringify(providerTable));
        this.setState({openTanks: openTanks});
      })
      .catch((error) => {
        alert("Erreur de connexion openTanks : "+error)
      })
  }

  render() {
    const { t } = this.props;
    const navigation = this.props.navigation;
    
  return (
    <View style={styles.container}>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <NunitoText style={styles.subSection}>{t("settings:opentanks").toUpperCase()}</NunitoText>

        <View>
        {
            this.state.openTanks.map((item, i) => (
            <ListItem
                key={i}
                title={item.haloType+" - "+item.tankType+" - "+item.creationDate}
                leftIcon={{ name: item.icon }}
                bottomDivider
                chevron
                onPress={() => {GLOBALS.TYPE = "tank"; GLOBALS.UUID = item.tankId; navigation.navigate('ForceTank')}}
            />
            ))
        }
        </View>

                    <View>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                      <NunitoBoldText style={styles.pad}>{"pad"}</NunitoBoldText>
                    </View>

      </ScrollView>
    </View>
  );
}
}

OpenTanksScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  pad:{
    fontSize: 20,
    color: '#e9e9e9',
  },
  textStyle: {
    textAlign: "center",
    padding: 5,
    fontSize: 20,
    color: "white"
  },
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

export default withTranslation()(OpenTanksScreen);
