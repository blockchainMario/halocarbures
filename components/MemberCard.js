/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { StyleSheet, View, Image, TouchableHighlight, Alert } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

import GLOBALS from '../constants/Globals'

export default class MemberCard extends Component {

	render() {
		return (
			<Card containerStyle={styles.card}>
                <Card containerStyle={styles.card2}>
                    <TouchableHighlight onPress={() => Alert.alert("proximité",'Contact : '+GLOBALS.USERNAME)} underlayColor="white">
                        <View style={{flexDirection:"row"}}>
                            <View style={{flex:4}}>
				                <NunitoText style={styles.name}>{this.props.firstName} {this.props.lastName}</NunitoText>
                            </View>
                            <View style={{flex:1}}>
                                <Image
                                    source={{uri : this.props.image}}
                                    style={{ width: 60, height: 60, borderRadius: 60/2, marginLeft : 0, borderColor: '#fff', borderWidth: 2 }} 
                                />
                            </View>
                        </View>
                    </TouchableHighlight>
                </Card>
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
        margin:-7,
        marginBottom: -8
	},
	name:{
		fontSize:24,
		color:'black',
        marginTop: 15
	}
});