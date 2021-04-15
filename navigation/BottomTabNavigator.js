import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useTranslation } from "react-i18next"
import { StyleSheet } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MainScreen from '../screens/MainScreen';

import MoreOptionsScreen from '../screens/MoreOptionsScreen';
import { NunitoBoldText } from '../components/StyledText';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Main';

function getHeaderTitle(route, t) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Main':
      return t("main:title");
    case 'MoreOptions':
      return t("settings:title");
  }
}


export default function BottomTabNavigator({ navigation, route }) {
	const [t, i18n] = useTranslation();
  //navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  navigation.setOptions({ headerTitle: props => <NunitoBoldText style={styles.textStyle}>{getHeaderTitle(route, t)}</NunitoBoldText> });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: t("main:title"),
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons focused={focused} name="qrcode-scan" size={24} />,
        }}
      />
      <BottomTab.Screen
        name="MoreOptions"
        component={MoreOptionsScreen}
        options={{
          title: t("settings:title"),
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons focused={focused} name="cogs" size={24} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    padding: 0,
    fontSize: 20,
    color: "white"
  },
});