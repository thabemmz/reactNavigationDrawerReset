import React, {useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// The HomeScreen is always visible for everybody
function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home screen, visible for everyone to see</Text>
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
function HelpScreen() {
  const {navigate} = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Help screen</Text>
      <Button
        onPress={() => navigate('Help-secondary')}
        title="To secondary help screen"
      />
    </View>
  );
}

function SecondaryHelpScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Secondary help screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function HelpNavigator() {
  return (
    <Stack.Navigator initialRouteName="Help-home">
      <Stack.Screen name="Help-home" component={HelpScreen} />
      <Stack.Screen name="Help-secondary" component={SecondaryHelpScreen} />
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
