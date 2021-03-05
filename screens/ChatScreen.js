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
  TouchableOpacity,
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

class ChatScreen extends Component {
  state = {
    messages: [ ],
    typing: "",
    clearInput: false,
    viewBtn: false,
    regBtn: false,
    degasBtn: true,
    disBtn: true,
    tankBtn: true,
    matBtn: true,
  }

  onClickListener({navigation}) {
    navigation.dispatch(StackActions.replace('Resident'));
  }

  onRegBtn() {
    this.setState({regBtn:true});
    this.setState({degasBtn:false});
  }

  onDegasBtn() {
    this.setState({degasBtn:true});
    this.setState({disBtn:false});
  }

  onDisBtn() {
    this.setState({disBtn:true});
    this.setState({tankBtn:false});
  }

  onTankBtn() {
    this.setState({tankBtn:true});
    this.setState({matBtn:false});
  }

  onMatBtn() {
    this.setState({matBtn:true});
    this.setState({regBtn:false});
  }

  render() {
    const { t } = this.props;
    const navigation = this.props.navigation;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container2} contentContainerStyle={styles.contentContainer2}>
        <View style={styles.container}>
          <Image style={styles.avatar}
            source={require('../assets/images/QR-250.jpg')}
          />
            <View style={styles.body}>
                <View style={styles.bodyContent}>

        <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: (this.state.viewBtn ? 0.4 : 1)
                }}
                //onPress={() => this.onClickListener('login')}
                disabled={this.state.viewBtn}
                onPress={() => navigation.navigate('Resident')}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:viewunit")}</NunitoBoldText>
          </TouchableOpacity>

        <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: (this.state.regBtn ? 0.4 : 1)
                }}
                //onPress={() => this.onClickListener('login')}
                disabled={this.state.regBtn}
                onPress={() => this.onRegBtn()}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:reception")}</NunitoBoldText>
          </TouchableOpacity>

        <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: (this.state.degasBtn ? 0.4 : 1)
                }}
                //onPress={() => this.onClickListener('login')}
                disabled={this.state.degasBtn}
                onPress={() => this.onDegasBtn()}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:degassing")}</NunitoBoldText>
          </TouchableOpacity>

        <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: (this.state.disBtn ? 0.4 : 1)
                }}
                //onPress={() => this.onClickListener('login')}
                disabled={this.state.disBtn}
                onPress={() => this.onDisBtn()}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:dismantling")}</NunitoBoldText>
          </TouchableOpacity>

        <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: (this.state.tankBtn ? 0.4 : 1)
                }}
                //onPress={() => this.onClickListener('login')}
                disabled={this.state.tankBtn}
                onPress={() => this.onTankBtn()}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:gazdisposal")}</NunitoBoldText>
          </TouchableOpacity>

        <TouchableOpacity
                style={{
                  margin: 5,
                  borderRadius: 10,
                  borderWidth: 0,
                  backgroundColor: '#57b0e3',
                  opacity: (this.state.matBtn ? 0.4 : 1)
                }}
                //onPress={() => this.onClickListener('login')}
                disabled={this.state.matBtn}
                onPress={() => this.onMatBtn()}
          >
            <NunitoBoldText style={styles.textStyle}>{t("process:materialdisposal")}</NunitoBoldText>
          </TouchableOpacity>

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
    width: 220,
    height: 220,
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

export default withTranslation()(ChatScreen);
