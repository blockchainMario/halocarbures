import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Divider, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

const list1 = [
    {
      title: 'Profil de Gérard Lavallée',
      icon: 'person',
      screen: 'Resident'
    },
]

const list2 = [
    {
        title: 'Proches aidants',
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
        title: 'Résidence Steve',
        icon: 'hotel',
        screen: 'NursingHome'
    },
]

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

const Stack = createStackNavigator()

export default function MoreOptionsScreen({ navigation }) {

  return (
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
            list4.map((item, i) => (
            <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                bottomDivider
                chevron
                //onPress={() => navigation.navigate(item.screen)}
                onPress={() => WebBrowser.openBrowserAsync(item.document)}
            />
            ))
        }
        </View>

      </ScrollView>
    </View>
  );
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
