import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Game from './screens/Game'; // Import your Game screen

// Create a stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* Home Screen */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'HangMan', // Set the title for the screen
              headerStyle: {
                backgroundColor: '#2F27CE', // Primary Blue for the header
              },
              headerTintColor: '#FFFFFF', // White text for the header
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
          {/* Game Screen */}
          <Stack.Screen
            name="Game"
            component={Game}
            options={{
              title: 'Play HangMan', // Set the title for the screen
              headerStyle: {
                backgroundColor: '#2F27CE', // Primary Blue for the header
              },
              headerTintColor: '#FFFFFF', // White text for the header
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});