import React, { Component } from 'react';
import {
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

//const { colors } = useTheme();

export default class ChatScreen extends Component {
  state = {
    messages: [ ],
    typing: "",
    clearInput: false
  }

  componentDidMount() {
    //axios.get('http://18.191.91.177:8080/comments/0')
    axios.get(GLOBALS.ENDPOINT+"/messages/"+GLOBALS.RESIDENCYID+"/"+GLOBALS.RESIDENTID, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const messages = res.data;
        this.setState({ messages: messages.reverse() });
        //alert(JSON.stringify(messages));
      })
      .catch((error) => {
        this.setState({ messages: [ ] });
        //alert("Erreur de connexion messages : "+error);
      })
  }

  render() {

    onSendMessage = (aText) => {
      //alert("Button pressed "+aText);
      axios({
        method: 'post',
        url: GLOBALS.ENDPOINT+"/messages",
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
        },
        data: {
          residencyId: GLOBALS.RESIDENCYID,
          date: (new Date()).toISOString().substr(0,10),
          residentId: GLOBALS.RESIDENTID,
          issuer: GLOBALS.USERNAME,
          message: aText
        }
      }).then(res => {
        var ms = this.state.messages;
        ms.push({
          residencyId: GLOBALS.RESIDENCYID,
          date: (new Date).getTime()/1000,
          residentId: GLOBALS.RESIDENTID,
          issuer: GLOBALS.USERNAME,
          message: aText
        });
        this.setState({ messages: ms });
        this.setState({ typing: ""});
        //alert("Message ajouté");
        })
        .catch((error) => {
          this.setState({ messages: [ ] });
          alert("Erreur de connexion messages : "+error)
        })
    }

  return (
    (this.state.messages == null) ? (
      <View style={styles.container}>
        <NunitoText style={styles.info}>Loading...</NunitoText>
      </View>
    ) : (
    <View style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
    <ScrollView 
          keyboardShouldPersistTaps="handled" 
          showsVerticalScrollIndicator={false}
          ref={ref => {this.scrollView = ref}}
          onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}
      >
        {this.state.messages.map((msg, i) => {
          //const odd = 0;
          var odd = 0;
          if (msg.issuer == GLOBALS.USERNAME) {
            odd = 1
          } else {
            odd = 0
          }
          return (
			        <Card key={i} containerStyle={odd ? styles.card0 : styles.card1}>
                <Card containerStyle={odd ? styles.card2 : styles.card3}>
                    <View
                        // eslint-disable-next-line react/no-array-index-key
                        key={i}
                        style={[odd ? styles.even : styles.odd]}
                    >
                       <View style={{flex:1}}>
                        <Image
                            style={[odd ? styles.avatarEven : styles.avatarOdd]}
                            source={require('../assets/images/avatar.jpg')}
                        />
                        {msg.issuer != GLOBALS.USERNAME && <NunitoText style={styles.micro}>{msg.issuer}</NunitoText>}
                      </View>
                      <View style={{flex:4}}>
                            <NunitoBoldText style={[odd ? styles.evenDate : styles.oddDate]}>{(new Date(1000*msg.date)).toISOString().substr(0,16).replace('T',' ')}</NunitoBoldText>
                            <NunitoText style={styles.name}>{msg.message}</NunitoText>
                      </View>
                    </View>
			          </Card>
			        </Card>
          );
        })}
        <TextInput
          style={[
            styles.input,
            { backgroundColor: '#fff', color: '#000' },
          ]}
          placeholderTextColor={Color('#000').alpha(0.5).rgb().string()}
          placeholder="Écrire un message"
          underlineColorAndroid="transparent"
          value={this.state.typing}
          onChangeText={(typing) => this.setState({typing})}
          onSubmitEditing={()=>{
            onSendMessage(this.state.typing)
          }}
        />
      </ScrollView>
        </KeyboardAvoidingView>
    </View>
    )
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    marginBottom: 10,
  },
  textStyle: {
    textAlign: "center",
    padding: 5,
    fontSize: 20,
    color: "white"
  },
  evenDate:{
      fontSize: 14,
      textAlign: 'left',
      color:'black',
  },
  oddDate:{
      fontSize: 14,
      textAlign: 'left',
      color:'black',
  },
  name:{
    fontSize: 16,
    color: 'black',
  },
  micro:{
    fontSize: 8,
    color: 'black',
    textAlign: "center",
  },
  card0:{
      backgroundColor:'white',
      borderColor:'#f0f0f0',
      borderWidth:0,
      borderRadius:10
  },
  card1:{
      backgroundColor:'white',
      borderWidth:0,
      borderRadius:10
  },
  card2:{
      backgroundColor:'white',
      borderColor:'#f0f0f0',
      borderWidth:0,
      borderRadius:5,
      margin:-10,
      marginBottom: -11
  },
  card3:{
      backgroundColor:'white',
      borderColor:'#f0f0f0',
      borderWidth:0,
      borderRadius:5,
      margin:-10,
      marginBottom: -11
  },
  inverted: {
    transform: [{ scaleY: -1 }],
  },
  content: {
    padding: 0,
    flex: 1,
    backgroundColor: '#e9e9e9',
  },
  even: {
    flexDirection: 'row',
  },
  odd: {
    flexDirection: 'row-reverse',
  },
  avatarEven: {
    marginVertical: 0,
    marginHorizontal: 0,
    height: 40,
    width: 40,
    borderRadius: 40/2,
    marginRight : 12, 
    borderColor: '#fff',
    borderWidth: 2,
  },
  avatarOdd: {
    marginVertical: 0,
    marginHorizontal: 0,
    height: 40,
    width: 40,
    borderRadius: 40/2,
    marginLeft : 12, 
    borderColor: '#fff',
    borderWidth: 2,
  },
  input: {
    height: 48,
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
});
