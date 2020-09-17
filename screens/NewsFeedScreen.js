import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';
import NewsCard from '../components/NewsCard';

import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';
import { SimpleLineIcons } from '@expo/vector-icons';

import GLOBALS from '../constants/Globals'

export default class NewsFeedScreen extends Component {
  state = {
    newsfeed: null
  }

  componentDidMount() {
    //axios.get('http://18.190.29.217:8080/comments/0')
    axios.get(GLOBALS.ENDPOINT+"/newsfeeds", {
      params: {
        'residencyId': GLOBALS.RESIDENCYID
      }
    })
      .then(res => {
        const newsfeed = res.data;
        this.setState({ newsfeed: newsfeed });
        //alert(JSON.stringify(resident));
      })
      .catch((error) => {
        this.setState({ newsfeed: [ ] });
        //alert("Erreur de connexion newsfeeds : "+error)
      })
  }

  render() {
  return (
    (this.state.newsfeed == null) ? (
      <View style={styles.container}>
        <NunitoText style={styles.info}>Loading...</NunitoText>
      </View>
    ) : (
      <View style={styles.container}>
        <ScrollView 
          style={styles.container2} 
          contentContainerStyle={styles.contentContainer2}
          ref={ref => {this.scrollView = ref}}
          onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
        >
          <View>
            { this.state.newsfeed.map(newsfeed => <NewsCard key={newsfeed.id} id={newsfeed.id} date={newsfeed.date} logo={newsfeed.logo} title={newsfeed.title} message={newsfeed.message} image={newsfeed.picture} />)}
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
