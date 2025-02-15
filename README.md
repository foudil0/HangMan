# Hangman Game - React Native

A classic Hangman game built with React Native, featuring multiple difficulty levels, dynamic word categories, and background music controls.

## Features

- **Three Difficulty Levels**: Easy, Medium, and Hard with varying word lengths.
- **Category Selection**: Fetches word categories from an API and allows users to choose.
- **Interactive Keyboard**: Tap letters to guess and track correct/incorrect attempts.
- **Win/Lose Conditions**: Alerts with options to replay or exit.
- **Music Controls**: Toggle background music on/off via settings.
- **Social Links**: Connect with the creator via GitHub and Instagram.

## Screenshots

- **Home Screen**: Choose difficulty and access settings.
- **Game Screen**: Play the game with dynamic word display and keyboard.
- **Settings Modal**: Enable/disable background music.

## Prerequisites

- Node.js (v14+)
- Expo CLI
- Android/iOS emulator or physical device

## Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hangman-game.git
cd hangman-game

# Install dependencies
npm install

# Start the app
expo start
```

Scan the QR code with the Expo Go app or run on an emulator.

## Usage

- **Home Screen**: Select a difficulty level (Easy, Medium, Hard).
- **Category Selection**: Choose a category after starting the game.
- **Gameplay**:
  - Tap letters to guess the word.
  - Incorrect guesses reduce remaining tries (6 total).
  - Win by guessing all letters or lose after 6 incorrect attempts.
- **Settings**: Tap the gear icon to toggle background music.

## Technologies

- **React Native & Expo** for cross-platform development.
- **React Navigation** for screen routing.
- **Axios** for API requests to fetch categories/words.
- **Expo AV** for background music handling.
- **React Native Paper** for UI components.

## API Integration

The app uses the following endpoints (replace with your own API if needed):

```bash
GET https://www.wordgamedb.com/api/v1/categories
GET https://www.wordgamedb.com/api/v1/words?category={category}
```

## License

MIT License. See [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Open an issue or submit a PR for improvements.

## Acknowledgments

- **API**: WordGameDB
- **Icons**: Material Icons

