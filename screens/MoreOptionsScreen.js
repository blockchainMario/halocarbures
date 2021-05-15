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

class MoreOptionsScreen extends Component {
  state = {
    
  }

  componentDidMount() {
  }

  render() {
    const { t } = this.props;

    const navigation = this.props.navigation;
    
    const list1 = [
        {
          title: t("settings:brandModel"),
          icon: 'grid-on',
          screen: 'BrandModels'
        },
    ]
    
    const list4 = [
      {
        title: t("settings:opentanks"),
        icon: 'grid-on',
        screen: 'OpenTanks'
      },
      {
        title: t("settings:fulltanks"),
        icon: 'grid-on',
        screen: 'FullTanks'
      },
    ]

    const list2 = [
        {
            title: t("settings:halocarbon"),
            icon: 'grid-on',
            table: 'haloTypeTable'
        },
        {
            title: t("settings:unitType"),
            icon: 'grid-on',
            table: 'unitTypeTable'
        },
        {
            title: t("settings:tankType"),
            icon: 'grid-on',
            table: 'tankTypeTable'
        },
        {
            title: t("settings:binType"),
            icon: 'grid-on',
            table: 'binTypeTable'
        },
        {
            title: t("settings:provenance"),
            icon: 'grid-on',
            table: 'provenanceTable'
        },
        {
            title: t("settings:transporter"),
            icon: 'grid-on',
            table: 'transporterTable'
        },
        {
            title: t("settings:provider"),
            icon: 'grid-on',
            table: 'providerTable'
        },
    ]
    
    const list3 = [
        {
            title: t("settings:scale"),
            icon: 'av-timer',
            screen: 'Scale'
        },
    ]
    
  return (
    <View style={styles.container}>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <NunitoText style={styles.subSection}>{t("settings:section1")}</NunitoText>

        <View>
        {
            list1.map((item, i) => (
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

        <NunitoText style={styles.subSection}>{t("settings:section4")}</NunitoText>

        <View>
        {
            list4.map((item, i) => (
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

        <NunitoText style={styles.subSection}>{t("settings:section2")}</NunitoText>

        <View>
        {
            list2.map((item, i) => (
            <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                bottomDivider
                chevron
                onPress={() => {GLOBALS.TABLENAME = item.title; GLOBALS.TABLE = item.table; navigation.navigate('ListContent')}}
            />
            ))
        }
        </View>

        <NunitoText style={styles.subSection}>{t("settings:section3")}</NunitoText>

        <View>
        {
            list3.map((item, i) => (
            <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                bottomDivider
                chevron
            />
            ))
        }
        </View>

      </ScrollView>
    </View>
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

export default withTranslation()(MoreOptionsScreen);
