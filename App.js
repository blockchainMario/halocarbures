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
import ProfessionalsScreen from './screens/ProfessionalsScreen';
import NursingHomeScreen from './screens/NursingHomeScreen';
import LeaseScreen from './screens/LeaseScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import axios from 'axios';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { withTranslation } from 'react-i18next';
import * as english from "./translations/en";
import * as french from "./translations/fr";

import { NunitoExtraText } from './components/StyledText';
import { NunitoText } from './components/StyledText';
import { NunitoBoldText } from './components/StyledText';
import { LinearGradient } from 'expo-linear-gradient';

import GLOBALS from './constants/Globals'

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

const headerShift = Platform.OS === 'ios' ? -50 : 50;

function closeAndReplace(navigation,screen) {
  navigation.closeDrawer();
  navigation.dispatch(StackActions.replace(screen))
}

function switchLanguage(navigation,screen,lang) {
  GLOBALS.LANGUAGE = lang;
  i18n.changeLanguage(lang);
  navigation.closeDrawer();
  //navigation.dispatch(StackActions.replace(screen))
}

function renderFullname(aComp) {
  //alert("renderFullname "+GLOBALS.USERNAME);
  return GLOBALS.FULLNAME;
}

/*
        <ListItem 
          title={"Aide et soutien"} 
          chevron
          onPress={()=>{ Linking.openURL('https://www.manyeta.com')}}
        />
        <ListItem 
          title={"Donnez votre avis"} 
          chevron
          onPress={()=>{ Linking.openURL('https://www.manyeta.com')}}
        />
*/
/*
        <ListItem 
          title={"Mon profil"} 
          chevron
          onPress={() => navigation.navigate('Profile')}
        />
        <ListItem 
          title={"À propos de Proximité"} 
          chevron
          onPress={()=>{ Linking.openURL('https://www.prox-app.com')}}
        />
        <ListItem 
          title={"Comment utiliser Proximité"} 
          chevron
          onPress={()=>{ Linking.openURL('https://www.prox-app.com/utilisation')}}
        />
        <ListItem 
          title={"Déconnexion"}
          chevron
          onPress={() => closeAndReplace(navigation,'Login')}
        />
*/

function DrawerContent({navigation}) {
  //alert(GLOBALS.T);
  //alert(GLOBALS.T("careplan:title"));
  const lang = GLOBALS.LANGUAGE;
  return (
    (lang == 'fr') ?
    (<View style={styles.container2}>
      <View style={{ flexDirection:"row", marginTop: 60 }}>
        <Image
          source={require('./assets/images/avatar.jpg')}
          style={{ width: 50, height: 50, borderRadius: 50/2, marginLeft : 10, borderColor: '#fff', borderWidth: 2 }} 
        />
        <NunitoBoldText style={{fontSize: 18, color:'white', marginLeft: 10, marginTop: 12}}>{renderFullname.bind(this)()}</NunitoBoldText>
      </View>
      <View style={{ marginTop: 10 }}>
        <ListItem 
          title={GLOBALS.T("menu:profile")} 
          chevron
          onPress={() => navigation.navigate('Profile')}
        />
        <ListItem 
          title={GLOBALS.T("menu:about")} 
          chevron
          onPress={()=>{ Linking.openURL('https://www.prox-app.com')}}
        />
        <ListItem 
          title={GLOBALS.T("menu:howto")} 
          chevron
          onPress={()=>{ Linking.openURL('https://www.prox-app.com/utilisation')}}
        />
        <ListItem 
          title={GLOBALS.T("menu:register")}
          chevron
          onPress={() => closeAndReplace(navigation,'Register')}
        />
        <ListItem 
          title={GLOBALS.T("menu:language")}
          chevron
          onPress={() => switchLanguage(navigation,'Login','en')}
        />
        <ListItem 
          title={GLOBALS.T("menu:logout")}
          chevron
          onPress={() => closeAndReplace(navigation,'Login')}
        />
      </View>
      <ImageBackground
          source={require('./assets/images/background.png')}
          style={styles.image}
      >
      </ImageBackground>
    </View>) : 
    (<View style={styles.container2}>
      <View style={{ flexDirection:"row", marginTop: 60 }}>
        <Image
          source={require('./assets/images/avatar.jpg')}
          style={{ width: 50, height: 50, borderRadius: 50/2, marginLeft : 10, borderColor: '#fff', borderWidth: 2 }} 
        />
        <NunitoBoldText style={{fontSize: 18, color:'white', marginLeft: 10, marginTop: 12}}>{renderFullname.bind(this)()}</NunitoBoldText>
      </View>
      <View style={{ marginTop: 10 }}>
        <ListItem 
          title={GLOBALS.T("menu:profile")} 
          chevron
          onPress={() => navigation.navigate('Profile')}
        />
        <ListItem 
          title={GLOBALS.T("menu:about")} 
          chevron
          onPress={()=>{ Linking.openURL('https://www.prox-app.com')}}
        />
        <ListItem 
          title={GLOBALS.T("menu:howto")} 
          chevron
          onPress={()=>{ Linking.openURL('https://www.prox-app.com/utilisation')}}
        />
        <ListItem 
          title={GLOBALS.T("menu:register")}
          chevron
          onPress={() => closeAndReplace(navigation,'Register')}
        />
        <ListItem 
          title={GLOBALS.T("menu:language")}
          chevron
          onPress={() => switchLanguage(navigation,'Login','fr')}
        />
        <ListItem 
          title={GLOBALS.T("menu:logout")}
          chevron
          onPress={() => closeAndReplace(navigation,'Login')}
        />
      </View>
      <ImageBackground
          source={require('./assets/images/background2en.png')}
          style={styles.image}
      >
      </ImageBackground>
    </View>)
  );
}

function goToLogin({navigation}) {
  navigation.dispatch(StackActions.replace('Login'));
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
        <Image style={{ width: 50, height: 50, borderRadius: 50/2, marginLeft : 10, borderColor: '#fff', borderWidth: 2 }} 
          source={{
            uri: GLOBALS.ENDPOINT+'/images/residents/'+GLOBALS.RESIDENCYID+"/"+GLOBALS.RESIDENTID+'/profile',
            headers: {
              Accept: 'image/jpeg',
              'Authorization': 'Bearer '+GLOBALS.BEARERTOKEN
            }
          }}
        />
      </View>
    </View>
  );
}

function App(props) {
  const [isLoggedIn, setLoggedIn] = React.useState(true);
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  //const { t } = props;

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
        i18n
          .use(initReactI18next)
          .init({
            resources: {
              en: english,
              fr: french,
            },
            //lng: Localization.locale,
		        lng: GLOBALS.LANGUAGE,
            fallbackLng: 'fr',
            interpolation: {
              escapeValue: false,
            },
            cleanCode: true,
          });
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);


  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    //alert(Object.keys(props));
    const { t } = props;
    GLOBALS.T = t;
    //alert(t("careplan:title"));
    return (
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
        title: GLOBALS.T("infos:title"),
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 20,
          marginTop: -2,
          marginLeft: Platform.OS === 'ios' ? -50 : 50
        },
        headerLeft : () => <ActionBarIcon navigation={navigation}/>
      }}
    />
    <Stack.Screen name='CarePlan' component={CarePlanScreen} 
      options={{
        title: <NunitoBoldText>{GLOBALS.T("careplan:title")}</NunitoBoldText>,
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 20,
          marginTop: -2,
          marginLeft: Platform.OS === 'ios' ? -50 : 50
        }
      }}
    />
    <Stack.Screen name='CircleOfCare' component={CircleOfCareScreen}
      options={{
        title: <NunitoBoldText>{GLOBALS.T("circleofcare:title")}</NunitoBoldText>,
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 20,
          marginTop: -2,
          marginLeft: Platform.OS === 'ios' ? 20 : 50
        }
      }}
    />
    <Stack.Screen name='Professionals' component={ProfessionalsScreen}
      options={{
        title: <NunitoBoldText>{GLOBALS.T("professionals:title")}</NunitoBoldText>,
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 20,
          marginTop: -2,
          marginLeft: Platform.OS === 'ios' ? -50 : 50
        }
      }}
    />
    <Stack.Screen name='Resident' component={ResidentScreen}
      options={{
        title: GLOBALS.T("resident:title"),
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -2,
          marginLeft: headerShift
        }
      }}
    />
    <Stack.Screen name='NursingHome' component={NursingHomeScreen}
      options={{
        title: <NunitoBoldText>{GLOBALS.T("residency:title")}</NunitoBoldText>,
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 20,
          marginTop: -2,
          marginLeft: Platform.OS === 'ios' ? -50 : 50
        }
      }}
    />
    <Stack.Screen name='Lease' component={LeaseScreen}
      options={{
        title: GLOBALS.T("lease:title"),
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -2,
          marginLeft: headerShift
        }
      }}
    />
    <Stack.Screen name='Profile' component={ProfileScreen}
      options={{
        title: GLOBALS.T("profile:title"),
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -2,
          marginLeft: headerShift
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
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -2,
          marginLeft: headerShift
        }
      }}
    />
    <Stack.Screen name='Register' component={RegisterScreen}
      options={{
        title: 'Register',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -2,
          marginLeft: headerShift
        }
      }}
    />
  </Stack.Navigator>
  )
}

/*
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
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 20,
          marginTop: -2,
          marginLeft: Platform.OS === 'ios' ? -50 : 50
        },
        headerLeft : () => <ActionBarIcon navigation={navigation}/>
      }}
    />
    <Stack.Screen name='CarePlan' component={CarePlanScreen} 
      options={{
        title: <NunitoBoldText>{"careplan:title"}</NunitoBoldText>,
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 20,
          marginTop: -2,
          marginLeft: Platform.OS === 'ios' ? -50 : 50
        }
      }}
    />
    <Stack.Screen name='CircleOfCare' component={CircleOfCareScreen}
      options={{
        title: <NunitoBoldText>Famille et proches aidants</NunitoBoldText>,
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 20,
          marginTop: -2,
          marginLeft: Platform.OS === 'ios' ? 20 : 50
        }
      }}
    />
    <Stack.Screen name='Professionals' component={ProfessionalsScreen}
      options={{
        title: <NunitoBoldText>Professionnels</NunitoBoldText>,
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 20,
          marginTop: -2,
          marginLeft: Platform.OS === 'ios' ? -50 : 50
        }
      }}
    />
    <Stack.Screen name='Resident' component={ResidentScreen}
      options={{
        title: 'Résident',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -2,
          marginLeft: headerShift
        }
      }}
    />
    <Stack.Screen name='NursingHome' component={NursingHomeScreen}
      options={{
        title: <NunitoBoldText>Résidence</NunitoBoldText>,
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 20,
          marginTop: -2,
          marginLeft: Platform.OS === 'ios' ? -50 : 50
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
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -2,
          marginLeft: headerShift
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
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -2,
          marginLeft: headerShift
        }
      }}
    />
    <Stack.Screen name='Login' component={LoginScreen}
      options={{
        title: 'Connexion',
        headerStyle: {
          backgroundColor: '#A071B1',
          height: 90,
        },
        headerTintColor: '#fff',
        headerTitleContainerStyle: {
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -2,
          marginLeft: headerShift
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
          left: 0,
          right: 0
        },
        headerTitleStyle: {
          fontSize: 18,
          marginTop: -2,
          marginLeft: headerShift
        }
      }}
    />
  </Stack.Navigator>
*/

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

export default withTranslation()(App);
