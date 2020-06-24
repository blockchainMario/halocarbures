import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';
import NewsCard from '../components/NewsCard';

import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';
import { SimpleLineIcons } from '@expo/vector-icons';

export default class NewsFeedScreen extends Component {
  state = {
    newsfeed: null
  }

  componentDidMount() {
    axios.get('http://18.191.91.177:8080/newsfeed/0')
      .then(res => {
        const newsfeed = res.data;
        this.setState({ newsfeed: newsfeed });
        //alert(newsfeed);
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
        <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
          <View>
            { this.state.newsfeed.map(newsfeed => <NewsCard date={newsfeed.date} logo={newsfeed.logo} title={newsfeed.title} message={newsfeed.message} image={newsfeed.image} />)}
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
  },
  info: {
    color: 'black',
    fontSize: 14,
  },
});
