import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

export default class NewsCard extends Component {

	render() {
	return (
        (this.props.image == "") ? (
            <Card style={styles.card}>
                <View style={styles.row}>
                    <Image
                        style={styles.tinyLogo} 
                        source={{uri : this.props.logo}}
                    />
                    <NunitoBoldText style={styles.cardDate}>{this.props.date.substr(0,10)}</NunitoBoldText>
                </View>
                <NunitoBoldText style={styles.cardTitle}>{this.props.title}</NunitoBoldText>
                <NunitoText style={styles.cardText}>{this.props.message}</NunitoText>
            </Card>
        ) : (
            <Card style={styles.card}>
                <View style={styles.row}>
                    <Image
                        style={styles.tinyLogo} 
                        source={{uri : this.props.logo}}
                    />
                    <NunitoBoldText style={styles.cardDate}>{this.props.date.substr(0,10)}</NunitoBoldText>
                </View>
                <NunitoBoldText style={styles.cardTitle}>{this.props.title}</NunitoBoldText>
                <NunitoText style={styles.cardText}>{this.props.message}</NunitoText>
                <Divider style={styles.division}/>
                <Image 
                    style={styles.photo} 
                    source={{uri : this.props.image}}
                />
            </Card>
        )
	);
	}
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 0,
  },
  photo: {
    width: 320,
    height: 200,
    //borderRadius: 200/2,
    borderWidth: 4,
    borderColor: "white",
    alignSelf:'center',
    marginTop:10
  },
  cardDate: {
    fontSize: 18,
    margin: 12,
  },
  cardTitle: {
    fontSize: 16,
  },
  cardText: {
    fontSize: 16,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 80,
    height: 40,
  },
});