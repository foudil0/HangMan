import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Modal } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Audio } from 'expo-av';

const Settings = () => {
  const { colors } = useTheme();
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Create a new Audio.Sound instance and configure audio mode
    const soundObj = new Audio.Sound();

    async function loadAndSetupSound() {
      try {
        // Enable playback in silent mode (iOS)
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
        });

        // Load the sound file with looping enabled
        await soundObj.loadAsync(
          require('../assets/music/riseagain_mix.mp3'),
          {
            shouldPlay: false,
            isLooping: true,
          }
        );
        setSound(soundObj);
      } catch (error) {
        console.log('Error loading sound', error);
      }
    }

    loadAndSetupSound();

    // Cleanup: unload the sound when the component unmounts
    return () => {
      if (soundObj) {
        soundObj.unloadAsync();
      }
    };
  }, []);

  // Toggle music playback on or off
  const toggleMusic = async () => {
    // Determine the new state before updating
    const newMusicEnabled = !isMusicEnabled;
    setIsMusicEnabled(newMusicEnabled);

    if (sound) {
      try {
        if (newMusicEnabled) {
          await sound.playAsync();
        } else {
          await sound.stopAsync();
        }
      } catch (error) {
        console.log('Error toggling sound playback', error);
      }
    }

    Alert.alert(
      'Music Settings',
      `Music has been ${newMusicEnabled ? 'enabled' : 'disabled'}.`,
      [{ text: 'OK' }]
    );
  };

  const openSettings = () => {
    setModalVisible(true);
  };

  const closeSettings = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.Button}
        icon={() => <Icon name="settings" size={20} color="white" />}
        mode="contained"
        onPress={openSettings}
      >
        Settings
      </Button>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeSettings}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Settings</Text>
            <Button
              style={styles.musicButton}
              icon={() => (
                <Icon
                  name={isMusicEnabled ? 'music-note' : 'music-off'}
                  size={20}
                  color="white"
                />
              )}
              mode="contained"
              onPress={toggleMusic}
            >
              {isMusicEnabled ? 'Disable Music' : 'Enable Music'}
            </Button>
            <Button style={styles.closeButton} mode="contained" onPress={closeSettings}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: "100%",
    right:"75%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  Button: {
    position: 'absolute',
    top: 0,
    right: '30%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  musicButton: {
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
  },
});
