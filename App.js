import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';

import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';

import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';

const { width } = Dimensions.get('window');

const DATA = {
  farm: {
    title: 'Farm Animals',
    animals: [
      {
        name: 'Cow',
        image: require('./assets/images/farm/cow.png'),
        sound: require('./assets/sounds/cow.mp3'),
      },
      {
        name: 'Horse',
        image: require('./assets/images/farm/horse.png'),
        sound: require('./assets/sounds/horse.mp3'),
      },
      {
        name: 'Sheep',
        image: require('./assets/images/farm/sheep.png'),
        sound: require('./assets/sounds/sheep.mp3'),
      },
    ],
  },

  pets: {
    title: 'Pets',
    animals: [],
  },

  savanna: {
    title: 'Savanna Animals',
    animals: [],
  },

  rainforest: {
    title: 'Rainforest Animals',
    animals: [],
  },

  ocean: {
    title: 'Ocean Animals',
    animals: [],
  },

  arctic: {
    title: 'Arctic Animals',
    animals: [],
  },

  desert: {
    title: 'Desert Animals',
    animals: [],
  },

  wetland: {
    title: 'Wetland Animals',
    animals: [],
  },

  mountain: {
    title: 'Mountain Animals',
    animals: [],
  },

  woodland: {
    title: 'Backyard & Woodland Animals',
    animals: [],
  },
};

export default function App() {
  const [screen, setScreen] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Disable Android back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );

    // Hide Android navigation bar
    async function setupFullscreen() {
      try {
        await NavigationBar.setBehaviorAsync('overlay-swipe');
        await NavigationBar.setVisibilityAsync('hidden');
      } catch (e) {
        console.log(e);
      }
    }

    setupFullscreen();

    return () => backHandler.remove();
  }, []);

  if (screen === 'home') {
    return (
      <>
        <StatusBar hidden />

        <View style={styles.container}>
          <Text style={styles.title}>🐾 Animal Learning App</Text>

          {Object.keys(DATA).map((key) => (
            <TouchableOpacity
              key={key}
              style={styles.menuButton}
              onPress={() => {
                setSelectedCategory(DATA[key]);
                setScreen('category');
              }}
            >
              <Text style={styles.menuText}>
                {DATA[key].title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar hidden />

      <CategoryScreen
        category={selectedCategory}
        onBack={() => setScreen('home')}
      />
    </>
  );
}

function CategoryScreen({ category, onBack }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.title}</Text>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {category.animals.map((animal, index) => (
          <AnimalCard
            key={index}
            animal={animal}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

function AnimalCard({ animal }) {
  const [playNameNext, setPlayNameNext] = useState(true);

  const handlePress = async () => {
    if (playNameNext) {
      Speech.speak(animal.name, {
        language: 'en-US',
        rate: 0.8,
      });
    } else {
      const soundObject = new Audio.Sound();

      try {
        await soundObject.loadAsync(animal.sound);
        await soundObject.playAsync();
      } catch (err) {
        console.log(err);
      }
    }

    setPlayNameNext(!playNameNext);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
      >
        <Image
          source={animal.image}
          style={styles.image}
        />
      </TouchableOpacity>

      <Text style={styles.animalName}>
        {animal.name}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  menuButton: {
    width: '85%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#4A90E2',
    marginBottom: 10,
  },

  menuText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },

  card: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  image: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    resizeMode: 'contain',
  },

  animalName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },

  instructions: {
    fontSize: 16,
    marginTop: 4,
  },

  backButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    marginBottom: 30,
  },

  backText: {
    color: 'white',
    fontSize: 18,
  },
});