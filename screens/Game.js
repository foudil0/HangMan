import React, { useState, useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Alert } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import axios from "axios";

const Game = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { difficulty } = route.params;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [targetWord, setTargetWord] = useState([]);
  const [loading, setLoading] = useState({ categories: true, words: false });
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const [availableLetters, setAvailableLetters] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
  const [gameActive, setGameActive] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [tries, setTries] = useState(6);

  const difficultyConfig = {
    easy: { minLength: 3, maxLength: 5 },
    medium: { minLength: 5, maxLength: 7 },
    hard: { minLength: 7, maxLength: 10 },
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://www.wordgamedb.com/api/v1/categories");
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(prev => ({ ...prev, categories: false }));
      }
    };
    fetchCategories();
  }, []);

  // Fetch words when category or retry count changes
  useEffect(() => {
    const fetchWords = async () => {
      if (!selectedCategory) return;
      
      setLoading(prev => ({ ...prev, words: true }));
      setError("");
      
      try {
        const response = await axios.get("https://www.wordgamedb.com/api/v1/words", {
          params: { category: selectedCategory }
        });

        const filteredWords = response.data
          .map(item => item.word)
          .filter(word => {
            const len = word.length;
            return len >= difficultyConfig[difficulty].minLength && 
                   len <= difficultyConfig[difficulty].maxLength;
          });

        if (filteredWords.length === 0) {
          setError("No words found for this difficulty");
          return;
        }

        const randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
        setTargetWord(randomWord.toUpperCase().split(""));
      } catch (err) {
        setError("Failed to load words");
      } finally {
        setLoading(prev => ({ ...prev, words: false }));
      }
    };

    fetchWords();
  }, [selectedCategory, retryCount]);

  const handleLetterPress = (letter) => {
    if (!gameActive) return;

    // Remove letter from available letters
    setAvailableLetters(prev => prev.filter(l => l !== letter));

    if (targetWord.includes(letter)) {
      const newCorrect = [...correctLetters, letter];
      setCorrectLetters(newCorrect);

      // Check win condition
      if (targetWord.every(l => newCorrect.includes(l))) {
        Alert.alert(
          "You Win!",
          "Congratulations!",
          [
            { text: "Play Again", onPress: restartGame },
            { text: "Exit", onPress: () => navigation.goBack() }
          ]
        );
        setGameActive(false);
      }
    } else {
      const newTries = tries - 1;
      setTries(newTries);

      // Check lose condition
      if (newTries === 0) {
        Alert.alert(
          "Game Over",
          `The word was: ${targetWord.join('')}`,
          [
            { text: "Try Again", onPress: restartGame },
            { text: "Exit", onPress: () => navigation.goBack() }
          ]
        );
        setGameActive(false);
      }
    }
  };

  const restartGame = () => {
    setTries(6);
    setCorrectLetters([]);
    setAvailableLetters("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
    setGameActive(true);
    setRetryCount(prev => prev + 1);
  };

  const renderLetters = () => {
    return availableLetters.map(letter => (
      <Button
        key={letter}
        mode="contained-tonal"
        style={styles.key}
        labelStyle={styles.keyText}
        onPress={() => handleLetterPress(letter)}
        disabled={!gameActive}
      >
        {letter}
      </Button>
    ));
  };

  const renderContent = () => {
    if (loading.categories) {
      return <ActivityIndicator size="large" color={colors.primary} />;
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text style={[styles.error, { color: colors.error }]}>{error}</Text>
          <Button mode="contained" onPress={() => setSelectedCategory("")}>
            Choose Different Category
          </Button>
        </View>
      );
    }

    if (!selectedCategory) {
      return (
        <>
          <Text style={styles.title}>Select Category</Text>
          {categories.map(category => (
            <Button
              key={category}
              mode="contained"
              style={styles.button}
              onPress={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </>
      );
    }

    return (
      <>
        <View style={styles.gameHeader}>
          <Text style={styles.categoryText}>Category: {selectedCategory}</Text>
          <Text style={styles.difficultyText}>Difficulty: {difficulty}</Text>
          <Text style={styles.triesText}>Tries left: {tries}</Text>
        </View>

        <View style={styles.wordContainer}>
          {targetWord.map((letter, index) => (
            <View key={index} style={styles.letterBox}>
              <Text style={correctLetters.includes(letter) ? styles.correctLetterText : styles.letterText}>
                {correctLetters.includes(letter) ? letter : "_"}
              </Text>
            </View>
          ))}
        </View>

        {loading.words ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <View style={styles.keyboard}>{renderLetters()}</View>
        )}
      </>
    );
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

// Keep the styles object from the original code
const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    button: {
      marginVertical: 5,
    },
    error: {
      textAlign: "center",
      fontSize: 16,
      marginVertical: 20,
    },
    center: {
      alignItems: "center",
    },
    retryButton: {
      marginTop: 10,
    },
    gameHeader: {
      marginBottom: 30,
      alignItems: "center",
    },
    categoryText: {
      fontSize: 18,
      marginBottom: 5,
    },
    difficultyText: {
      fontSize: 16,
      color: "#666",
    },
    triesText: {
      fontSize: 16,
      color: "#666",
    },
    wordContainer: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      marginBottom: 30,
    },
    letterBox: {
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
      margin: 5,
      borderRadius: 5,
    },
    letterText: {
      color: "black",
      fontSize: 20,
      fontWeight: "bold",
    },
    correctLetterText: {
      color: "green",
      fontSize: 20,
      fontWeight: "bold",
    },
    keyboard: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    key: {
      margin: 3,
      minWidth: 40,
      height: 40,
      borderRadius: 5,
    },
    keyText: {
      fontSize: 16,
    },

});

export default Game;