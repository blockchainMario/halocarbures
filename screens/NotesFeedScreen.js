import React, { Component } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';
import CommentCard from '../components/CommentCard';

import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

import GLOBALS from '../constants/Globals'

export default class NotesFeedScreen extends Component {
  state = {
    comments: null
  }

  componentDidMount() {
    //axios.get('http://18.191.91.177:8080/comments/0')
    //alert(GLOBALS.BEARERTOKEN);
    axios.get(GLOBALS.ENDPOINT+"/comments/"+GLOBALS.RESIDENCYID+"/"+GLOBALS.RESIDENTID, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const comments = res.data;
        this.setState({ comments: comments });
        //alert(JSON.stringify(resident));
      })
      .catch((error) => {
        this.setState({ comments: [ ] });
        //alert("Erreur de connexion comments : "+error)
      })
  }

  render() {
  return (
    (this.state.comments == null) ? (
      <View style={styles.container}>
        <NunitoText style={styles.info}>Loading...</NunitoText>
      </View>
    ) : (
      <View style={styles.container}>
        <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
          <View>
            { this.state.comments.map(comment => <CommentCard key={comment.id} date={comment.date} title={comment.issuer} comment={comment.message} image={comment.image} />)}
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
