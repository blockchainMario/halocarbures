/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

export default class ActivityCard extends Component {

	render() {

		return (
			<Card containerStyle={styles.card}>
                <Card containerStyle={styles.card2}>
				    <NunitoText style={styles.activityName}>{this.props.activityName}</NunitoText>
                </Card>
				
				<View style={{flexDirection:'row', justifyContent:'space-between'}}>
					<NunitoBoldText style={styles.occupation}>{this.props.occupation}</NunitoBoldText>
					<NunitoBoldText style={styles.frequency}>{this.props.next}</NunitoBoldText>
				</View>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	card:{
		backgroundColor:'white',
		borderWidth:0,
        borderRadius:20
	},
	card2:{
        backgroundColor:'#f8f8f8',
        borderColor:'#f0f0f0',
		borderWidth:0,
        borderRadius:15,
        margin:-7
	},
	activityName:{
		fontSize:18,
		color:'black'
	},
	occupation: {
		fontSize: 16,
		color:'black',
        marginTop:8,
        marginLeft:-2,
        marginBottom:-5
	},
	frequency: {
		fontSize: 16,
		color:'black',
        marginTop:8,
        marginLeft:-2,
        marginBottom:-5
	},
	notes: {
		fontSize: 18,
		color:'#16abbf',
		textTransform:'capitalize'
	}
});