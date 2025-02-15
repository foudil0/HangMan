import React, { useState } from "react";
import { StyleSheet, View, Linking } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import Settings from "./Settings";

const Home = ({ navigation }) => {
  const theme = useTheme();
  const [sound, setSound] = useState(null);

  // Moved openURL function inside Home component
  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URL: ${url}`);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Settings />
      <Text
        variant="displayMedium"
        style={[styles.title, { color: theme.colors.primary }]}
      >
        HangMan
      </Text>

     {/* Difficulty Buttons */}
     <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: '#4CAF50' }]} // Green for easy
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate('Game', { difficulty: 'easy' })}
        >
          Easy
        </Button>
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: '#FFA000' }]} // Orange for medium
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate('Game', { difficulty: 'medium' })}
        >
          Medium
        </Button>
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: '#F44336' }]} // Red for hard
          labelStyle={styles.buttonLabel}
          onPress={() => navigation.navigate('Game', { difficulty: 'hard' })}
        >
          Hard
        </Button>
      </View>
      <View style={styles.footer}>
        <Text style={styles.sociaText}>Support the creator</Text>
        <View style={styles.socialContainer}>
          <Button
            mode="contained"
            style={[styles.socialButton, styles.github]}
            onPress={() => openURL("https://github.com/foudil0")}
          >
            GitHub
          </Button>
          <Button
            mode="contained"
            style={[styles.socialButton, styles.insta]}
            onPress={() => openURL("https://www.instagram.com/foudil.hocini/")}
          >
            Instagram
          </Button>
        </View>
      </View>
    </View>
  );
};

// ... (styles remain the same) ...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: { marginBottom: 40, fontWeight: "bold", textAlign: "center" },
  buttonContainer: { width: "80%", marginTop: 20 },
  button: {
    marginVertical: 10,
    borderRadius: 8,
    paddingVertical: 8,
    elevation: 4,
  },

  buttonLabel: { fontSize: 16, fontWeight: "bold", color: "#FFFFFF" },
  footer: {
    position: "absolute",
    bottom: "8%",
    width: "100%",
    alignItems: "center",
    padding: 16,
  },
  sociaText: {
    fontSize: 27,
    marginBottom: "10%",
    fontWeight: "bold",
    color: "purple",
    fontFamily: "arial",
  },
  socialContainer: { flexDirection: "row" },
  socialButton: { marginHorizontal: 10, paddingVertical: 8, elevation: 4 },
  github: { backgroundColor: "#333" },
  insta: { backgroundColor: "#DD2A7B" },
});
export default Home;
