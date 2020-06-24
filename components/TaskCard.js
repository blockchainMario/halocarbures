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
import { AntDesign } from '@expo/vector-icons';

import { NunitoExtraText } from '../components/StyledText';
import { NunitoText } from '../components/StyledText';
import { NunitoBoldText } from '../components/StyledText';

function getStatusIcon(aStatus) {
	switch (aStatus) {
    case 'planned':
      return 'clockcircleo';
    case 'done':
      return 'checkcircleo';
    case 'notDone':
      return 'closecircle';
    case 'moved':
      return 'arrowright';
  }
}

function getIconColor(aStatus) {
	switch (aStatus) {
    case 'planned':
      return 'gray';
    case 'done':
      return 'black';
    case 'notDone':
      return 'red';
  }
}

export default class TaskCard extends Component {

	render() {

		return (
			<Card containerStyle={styles.card}>
                <Card containerStyle={styles.card2}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:6}}>
					        <NunitoExtraText style={styles.time}>{this.props.time}</NunitoExtraText>
				            <NunitoBoldText style={styles.taskName}>{this.props.taskName}</NunitoBoldText>
                        </View>
                        <View style={{flex:1}}>
                            <AntDesign
                                name={getStatusIcon(this.props.status)}
                                size={30}
                                style={{ marginBottom: -10, padding: 10 }}
                                color={getIconColor(this.props.status)}
                            />
                        </View>
                    </View>
                </Card>
				
				<View>
					<NunitoBoldText style={styles.justification}>{this.props.justification}</NunitoBoldText>
				</View>
			</Card>
		);
	}
}

const styles = StyleSheet.create({
	card:{
		backgroundColor:'white',
		borderWidth:0,
		borderRadius:10
	},
	card2:{
        backgroundColor:'#f8f8f8',
        borderColor:'#f0f0f0',
		borderWidth:1,
		borderRadius:5,
        margin:-7
	},
	time: {
		fontSize: 24,
		color:'black',
        marginTop:-10
	},
	taskName:{
		fontSize:16,
		color:'black'
	},
	justification: {
		fontSize: 14,
		color:'red',
        marginTop:8,
        marginLeft:-2,
        marginBottom:-5,
        textAlign:'center',
		textTransform:'uppercase'
	},
});