import * as React from 'react';
import { Text } from 'react-native';

export function MonoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
  
export function NunitoExtraText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'nunito-extra' }]} />;
}
  
export function NunitoText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'nunito-light' }]} />;
}
  
export function NunitoBoldText(props) {
  return <Text {...props} style={[props.style, { fontFamily: 'nunito-extra-bold' }]} />;
}
