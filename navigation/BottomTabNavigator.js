import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { useTranslation } from "react-i18next"
import { StyleSheet } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
//import AgendaScreen from '../screens/AgendaScreen';
//import LoginScreen from '../screens/LoginScreen';
import ResidentScreen from '../screens/ResidentScreen';
import NotesFeedScreen from '../screens/NotesFeedScreen';
import ChatScreen from '../screens/ChatScreen';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import MoreOptionsScreen from '../screens/MoreOptionsScreen';
import { NunitoBoldText } from '../components/StyledText';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Resident';

export default function BottomTabNavigator({ navigation, route }) {
	const [t, i18n] = useTranslation();
  //navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  navigation.setOptions({ headerTitle: props => <NunitoBoldText style={styles.textStyle}>{getHeaderTitle(route, t)}</NunitoBoldText> });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Resident"
        component={ResidentScreen}
        options={{
          title: t("resident:title"),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contact" />,
        }}
      />
      <BottomTab.Screen
        name="Notes"
        component={NotesFeedScreen}
        options={{
          title: t("notes:title"),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-today" />,
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: t("chat:title"),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-mail" />,
        }}
      />
      <BottomTab.Screen
        name="NewsFeed"
        component={NewsFeedScreen}
        options={{
          title: t("newsfeed:title"),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-clipboard" />,
        }}
      />
      <BottomTab.Screen
        name="MoreOptions"
        component={MoreOptionsScreen}
        options={{
          title: t("infos:title"),
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-apps" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route, t) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Resident':
      return t("resident:title");
    case 'Notes':
        return '      '+t("notes:title");
    case 'Chat':
        return t("chat:title");
    case 'NewsFeed':
      return t("newsfeed:title");
    case 'MoreOptions':
      return t("infos:title");
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