import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

export default class CommentCard extends Component {

	render() {

		return (
			<Card containerStyle={styles.card}>
                <View style={styles.row}>
                    <Image 
                        style={{ width: 60, height: 60, borderRadius: 60/2, marginLeft : 0, borderColor: '#fff', borderWidth: 2 }}
                        source={{uri : 'http://18.190.29.217/SyMO/avatar.jpg'}}/>
                    <NunitoBoldText style={styles.cardDate}>{this.props.date.substr(0,10)}</NunitoBoldText>
                </View>
				<NunitoBoldText style={styles.cardTitle}>{this.props.title}</NunitoBoldText>
				<NunitoText style={styles.cardText}>{this.props.comment}</NunitoText>
			</Card>
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