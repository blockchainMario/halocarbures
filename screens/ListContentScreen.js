import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { Button, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

class ListContentScreen extends Component {
  state = {
    listContent: [],
    newItem : "",
  }

  componentDidMount() {

    //alert("http://18.190.29.217:8080/api/v1/"+GLOBALS.ORGANIZATION+"/"+GLOBALS.TABLE,);
    axios.get("http://18.190.29.217:8080/api/v1/list/"+GLOBALS.ORGANIZATION+"/"+GLOBALS.TABLE, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const aList = res.data.listContent.sort();
        var listContent = [];
        aList.forEach(function(entry) {
            listContent.push({title: entry, icon: "", screen: "EditContent"})
        });
        //alert(JSON.stringify(providerTable));
        this.setState({listContent: listContent});
      })
      .catch((error) => {
        alert("Erreur de connexion Lists : "+error)
      })
  }

  saveitem = (navigation) => {
    //alert("http://18.190.29.217:8080/api/v1/"+GLOBALS.ORGANIZATION+"/"+GLOBALS.TABLE+"/"+this.state.newItem);
    axios.get("http://18.190.29.217:8080/api/v1/newitem/"+GLOBALS.ORGANIZATION+"/"+GLOBALS.TABLE+"/"+this.state.newItem
    , {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
      }
    })
      .then(res => {
        const aList = res.data.listContent.sort();
        var listContent = [];
        aList.forEach(function(entry) {
            listContent.push({title: entry, icon: "", screen: "EditContent"})
        });
        //alert(JSON.stringify(providerTable));
        this.setState({listContent: listContent});
      })
      .catch((error) => {
        alert("Erreur de connexion Add New Item : "+error)
      })
  }

  render() {
    const { t } = this.props;

    const navigation = this.props.navigation;
    
  return (
    <View style={styles.container}>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <NunitoText style={styles.subSection}>{GLOBALS.TABLENAME.toUpperCase()}</NunitoText>

        <View>
        {
            this.state.listContent.map((item, i) => (
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

        <View>
          <NunitoBoldText style={styles.label}>{t("settings:newitem")}</NunitoBoldText>
          <TextInput style={styles.field}
            placeholder={t("settings:newitem")}
            placeholderTextColor = "#57b0e3"
            underlineColorAndroid='transparent'
            onChangeText={(newItem) => this.setState({newItem})}
          />
        </View>

        <TouchableOpacity
                    style={{
                        margin: 10,
                        borderRadius: 10,
                        borderWidth: 0,
                        backgroundColor: '#57b0e3',
                        opacity: 1
                    }}
                    onPress={() => this.saveitem(navigation)}
                    >
          <NunitoBoldText style={styles.textStyle}>{t("settings:additem")}</NunitoBoldText>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}
}

ListContentScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    padding: 5,
    fontSize: 20,
    color: "white"
  },
  label:{
    fontSize:16,
    color: "#3e444c",
    marginTop:10,
    marginLeft:10
  },
  field:{
    margin: 10,
    height: 40,
    padding: 10,
    borderColor: '#3e444c',
    borderWidth: 1
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

export default withTranslation()(ListContentScreen);
