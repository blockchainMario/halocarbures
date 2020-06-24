import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';
import TaskList from '../components/TaskList';
import {CalendarProvider, WeekCalendar, ExpandableCalendar, AgendaList} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';

import axios from 'axios'

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['D','L','M','M','J','V','S'],
    today: 'Aujourd\'hui'
  };
LocaleConfig.defaultLocale = 'fr';

let SELECTED_DAY = '2020-05-03';
let MARKED_DATES = {
  [SELECTED_DAY]: {disabled: true}
};

export default function CarePlanScreen() {

  onDayPress = (day) => {
      //this.setState({selected: day.dateString});
      alert("Date requise "+day.dateString);
      SELECTED_DAY = day.dateString;
    }

  return (
    <View style={styles.container}>

      <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>

      <CalendarProvider> 
        <WeekCalendar
          hideKnob={true}
          refreshing={true}
          onDayPress={(day) => this.onDayPress(day)}
          // Collection of dates that have to be marked. Default = {}
          markedDates={
            MARKED_DATES
          }
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: 'green',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: 'black',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'black',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'black',
            indicatorColor: 'black',
            textDayFontFamily: 'nunito-extra-bold',
            textMonthFontFamily: 'nunito-extra-bold',
            textDayHeaderFontFamily: 'nunito-extra-bold',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 14,
            textDayHeaderFontSize: 16
          }}
        />
      </CalendarProvider>

        <TaskList date={SELECTED_DAY}></TaskList>
        
      </ScrollView>
    </View>
  );
}

CarePlanScreen.navigationOptions = {
  header: null,
};

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
  developmentModeText: {
    marginBottom: 20,
    color: 'black',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
  },
  contentContainer2: {
    paddingTop: 0,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
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
