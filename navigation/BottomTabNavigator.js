import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useTranslation } from "react-i18next"
import { StyleSheet } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//import AgendaScreen from '../screens/AgendaScreen';
//import LoginScreen from '../screens/LoginScreen';
import UnitScreen from '../screens/UnitScreen';
import NotesFeedScreen from '../screens/NotesFeedScreen';
import ScanScreen from '../screens/ScanScreen';
import OverviewScreen from '../screens/OverviewScreen';
import MoreOptionsScreen from '../screens/MoreOptionsScreen';
import { NunitoBoldText } from '../components/StyledText';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Unit';

export default function BottomTabNavigator({ navigation, route }) {
	const [t, i18n] = useTranslation();
  //navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  navigation.setOptions({ headerTitle: props => <NunitoBoldText style={styles.textStyle}>{getHeaderTitle(route, t)}</NunitoBoldText> });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Chat"
        component={ScanScreen}
        options={{
          title: t("scan:title"),
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons focused={focused} name="qrcode-scan" size={24} />,
        }}
      />
      <BottomTab.Screen
        name="Resident"
        component={UnitScreen}
        options={{
          title: t("unit:title"),
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons focused={focused} name="fridge-outline" size={24} />,
        }}
      />
      <BottomTab.Screen
        name="Notes"
        component={NotesFeedScreen}
        options={{
          title: t("unittype:title"),
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons focused={focused} name="checkbox-multiple-blank" size={24} />,
        }}
      />
      <BottomTab.Screen
        name="NewsFeed"
        component={OverviewScreen}
        options={{
          title: t("overview:title"),
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons focused={focused} name="monitor-multiple" size={24} />,
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

function getHeaderTitle(route, t) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Unit':
      return t("scan:title");
    case 'Notes':
        return "Kenmore 795.79754.904";
    case 'Chat':
        return t("scan:title");
    case 'NewsFeed':
      return t("overview:title");
    case 'MoreOptions':
      return t("settings:title");
  }
}

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    padding: 0,
    fontSize: 20,
    color: "white"
  },
});