import React, {useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// The HomeScreen is always visible for everybody
function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home screen</Text>
    </View>
  );
}

// The AuthorizedScreen is intiated from the navigator and the navigation option
// is only visible when authorized.
function AuthorizedScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Authorized screen</Text>
    </View>
  );
}

// The HelpScreen is always visible, but is located AFTER the Authorized option
// in the navigator
function HelpScreen1() {
  const {navigate} = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Help Screen 1</Text>
      <Button
        onPress={() => navigate('Help-screen2')}
        title="To Help Screen 2"
      />
    </View>
  );
}

function HelpScreen2() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Help Screen 2</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function HelpNavigator() {
  return (
    <Stack.Navigator initialRouteName="Help-screen1">
      <Stack.Screen name="Help-screen1" component={HelpScreen1} />
      <Stack.Screen name="Help-screen2" component={HelpScreen2} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function App() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsAuthorized(true), 1000);
  }, [setIsAuthorized]);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen} />
        {isAuthorized && (
          <Drawer.Screen name="Authorized" component={AuthorizedScreen} />
        )}
        <Drawer.Screen name="Help" component={HelpNavigator} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
