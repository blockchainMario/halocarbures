import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
//import AgendaScreen from '../screens/AgendaScreen';
import ResidentScreen from '../screens/ResidentScreen';
import NotesFeedScreen from '../screens/NotesFeedScreen';
import ChatScreen from '../screens/ChatScreen';
import NewsFeedScreen from '../screens/NewsFeedScreen';
import MoreOptionsScreen from '../screens/MoreOptionsScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Resident';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Resident"
        component={ResidentScreen}
        options={{
          title: 'Résident',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-contact" />,
        }}
      />
      <BottomTab.Screen
        name="Notes"
        component={NotesFeedScreen}
        options={{
          title: 'Commentaires',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-today" />,
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Messagerie',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-mail" />,
        }}
      />
      <BottomTab.Screen
        name="NewsFeed"
        component={NewsFeedScreen}
        options={{
          title: 'Babillard',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-clipboard" />,
        }}
      />
      <BottomTab.Screen
        name="MoreOptions"
        component={MoreOptionsScreen}
        options={{
          title: 'Infos',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-apps" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Resident':
      return 'Résident';
    case 'Notes':
        return 'Commentaires';
    case 'Chat':
        return 'Messagerie';
    case 'NewsFeed':
      return 'Babillard';
    case 'MoreOptions':
      return 'Infos';
  }
}
