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

import { categories } from './data/animals';

const { width } = Dimensions.get('window');

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );

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

  return (
    <>
      <StatusBar hidden />

      {selectedCategory ? (
        <CategoryScreen
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
        />
      ) : (
        <HomeScreen
          onSelectCategory={setSelectedCategory}
        />
      )}
    </>
  );
}

function HomeScreen({ onSelectCategory }) {
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>
        🐾 Animal Learning
      </Text>

      

      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.menuButton}
          onPress={() => onSelectCategory(category)}
        >
          <Text style={styles.menuText}>
            {category.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function CategoryScreen({ category, onBack }) {
  return (
    <View style={styles.container}>
      

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {category.animals.map((animal) => (
          <AnimalCard
            key={animal.name}
            animal={animal}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
      >
        <Text style={styles.backText}>
          ⬅ Back
        </Text>
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
        <Text style={styles.firstLetter}>
          {animal.name.charAt(0)}
        </Text>
        {animal.name.slice(1)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 60,
  },

  appTitle: {
    fontSize: 36,
    fontWeight: '900',
    marginBottom: 10,
    color: '#2D2A6E',
  },

  subtitle: {
    fontSize: 18,
    color: '#6B6B9A',
    marginBottom: 25,
  },

  categoryTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#2D2A6E',
    marginBottom: 20,
  },

  menuButton: {
    width: '88%',
    paddingVertical: 22,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  menuText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    color: '#3C3A7A',
  },

  card: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  image: {
    width: width * 0.78,
    height: width * 0.78,
    resizeMode: 'contain',
    borderRadius: 30,
  },

  animalName: {
    fontSize: 150,
    fontWeight: '900',
    marginTop: 15,
    color: '#2B2B2B',
    letterSpacing: 1,
  },

  firstLetter: {
    fontSize: 200,
    color: '#02639D',
    fontWeight: '900',
  },

  backButton: {
    backgroundColor: '#FFF1F1',
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: 30,
    marginBottom: 30,
  },

  backText: {
    color: 'grey',
    fontWeight: '800',
    fontSize: 18,
  },
});