import * as React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Platform, StatusBar, ImageBackground, StyleSheet, View, Image, Text, Linking } from 'react-native';
import { Card, Divider, ListItem } from 'react-native-elements';

import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CarePlanScreen from './screens/CarePlanScreen';
import CircleOfCareScreen from './screens/CircleOfCareScreen';
import ResidentScreen from './screens/ResidentScreen';
import NursingHomeScreen from './screens/NursingHomeScreen';
import LeaseScreen from './screens/LeaseScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import { NunitoExtraText } from './components/StyledText';
import { NunitoText } from './components/StyledText';
import { NunitoBoldText } from './components/StyledText';
import { LinearGradient } from 'expo-linear-gradient';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const loggedIn = false;

function closeAndReplace(navigation,screen) {
  navigation.closeDrawer();
  navigation.dispatch(StackActions.replace(screen))
}

function DrawerContent({navigation}) {
  return (
    <View style={styles.container2}>
      <View style={{ flexDirection:"row", marginTop: 60 }}>
        <Image
          source={require('./assets/images/MarioPerron.jpg')}
          style={{ width: 50, height: 50, borderRadius: 50/2, marginLeft : 10, borderColor: '#fff', borderWidth: 2 }} 
        />
        <NunitoBoldText style={{fontSize: 18, color:'white', marginLeft: 10, marginTop: 12}}>Mario Perron</NunitoBoldText>
      </View>
      <View style={{ marginTop: 10 }}>
        <ListItem 
          title={"Mon profil"} 
          chevron
          onPress={() => navigation.navigate('Profile')}
        />
        <ListItem 
          title={"Aide et soutien"} 
          chevron
          onPress={()=>{ Linking.openURL('https://hopem.didacte.com/')}}
        />
        <ListItem 
          title={"Donnez votre avis"} 
          chevron
          onPress={()=>{ Linking.openURL('https://hopem.com/contact/')}}
        />
        <ListItem 
          title={"Inscription"}
          chevron
          onPress={() => closeAndReplace(navigation,'Register')}
        />
        <ListItem 
          title={"Déconnexion"}
          chevron
          onPress={() => closeAndReplace(navigation,'Login')}
        />
      </View>
      <ImageBackground
          source={require('./assets/images/background.png')}
          style={styles.image}
      >
      </ImageBackground>
    </View>
  );
}

function ActionBarIcon({navigation}) {
  //alert(navigation);
  return (
    <View style={{flexDirection:"row"}}>
      <View style={{flex:1}}>
        <SimpleLineIcons
          name='menu'
          size={30}
          style={{ marginTop: 3, marginLeft: 10, padding: 10 }}
          color={'white'}
          onPress={() => navigation.openDrawer()}
          //onPress={() => this.props.navigation.navigate('MyDrawer')}
        />
      </View>
      <View style={{flex:1}}>
        <Image
          source={require('./assets/images/gerard.jpg')}
          style={{ width: 50, height: 50, borderRadius: 50/2, marginLeft : 10, borderColor: '#fff', borderWidth: 2 }} />
      </View>
    </View>
  );
}

export default function App(props) {
  const [isLoggedIn, setLoggedIn] = React.useState(true);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'nunito-extra': require('./assets/fonts/Brown-Light.ttf'),
          'nunito-light': require('./assets/fonts/Brown-Light.ttf'),
          'nunito-extra-bold': require('./assets/fonts/Brown-Bold.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    //alert(isLoggedIn);
    return (
      isLoggedIn ? (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
        <SafeAreaProvider>
          <NavigationContainer ref={containerRef} initialState={initialNavigationState}>   
          <Drawer.Navigator initialRouteName="Home"  drawerContent={(props) => <DrawerContent {...props}/>}>
            <Drawer.Screen name="Home" component={MyStack} />
          </Drawer.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </View>
      ) : (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
          <SafeAreaProvider>
            <NavigationContainer ref={containerRef} initialState={initialNavigationState}>   
              <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaProvider>
        </View>
      )
    );
  }
}

const MyStack = ({navigation}) => {
  return (
  <Stack.Navigator>
    <Stack.Screen 
      name="Root" 
      component={BottomTabNavigator} 
      options={{
        title: 'Infos',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 30,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -10,
          textAlign: 'left',
          marginLeft: -50
        },
        headerLeft : () => <ActionBarIcon navigation={navigation}/>
      }}
    />
    <Stack.Screen name='CarePlan' component={CarePlanScreen} 
      options={{
        title: 'Plan de soins',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 30,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -10,
          textAlign: 'left',
          marginLeft: -50
        }
      }}
    />
    <Stack.Screen name='CircleOfCare' component={CircleOfCareScreen}
      options={{
        title: 'Contacts',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 30,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -10,
          textAlign: 'left',
          marginLeft: -50
        }
      }}
    />
    <Stack.Screen name='Resident' component={ResidentScreen}
      options={{
        title: 'Gérard Lavallée',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 30,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -10,
          textAlign: 'left',
          marginLeft: -50
        }
      }}
    />
    <Stack.Screen name='NursingHome' component={NursingHomeScreen}
      options={{
        title: 'Hébergement',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 30,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -10,
          textAlign: 'left',
          marginLeft: -50
        }
      }}
    />
    <Stack.Screen name='Lease' component={LeaseScreen}
      options={{
        title: 'Bail',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 30,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -10,
          textAlign: 'left',
          marginLeft: -50
        }
      }}
    />
    <Stack.Screen name='Profile' component={ProfileScreen}
      options={{
        title: 'Mon profil',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 30,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -10,
          textAlign: 'left',
          marginLeft: -50
        }
      }}
    />
    <Stack.Screen name='Login' component={LoginScreen}
      options={{
        title: 'Login',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 30,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -10,
          textAlign: 'left',
          marginLeft: -50
        }
      }}
    />
    <Stack.Screen name='Register' component={RegisterScreen}
      options={{
        title: 'Inscription',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 30,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -10,
          textAlign: 'left',
          marginLeft: -50
        }
      }}
    />
  </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A071B1',
  },
  container2: {
    flex: 1,
    backgroundColor: '#8B4B9D',
  },
	topName: {
		fontSize: 24,
		color:'white',
    marginTop:15,
    marginLeft:10
	},
  image: {
    flex: 1,
    left: -50,
    height: 275,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
