import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

/* ---------------- ANIMALS DATA ---------------- */

const DATA = {
  farm: ['Cow', 'Horse', 'Sheep', 'Goat', 'Pig', 'Chicken', 'Duck', 'Turkey', 'Donkey', 'Rabbit'],
  pets: ['Dog', 'Cat', 'Goldfish', 'Hamster', 'Guinea Pig', 'Parrot', 'Budgie', 'Turtle', 'Gecko', 'Mouse'],
  savanna: ['Lion', 'Elephant', 'Giraffe', 'Zebra', 'Rhinoceros', 'Hippopotamus', 'Cheetah', 'Leopard', 'Hyena', 'Ostrich'],
  rainforest: ['Gorilla', 'Chimpanzee', 'Orangutan', 'Toucan', 'Macaw', 'Sloth', 'Tree Frog', 'Anaconda', 'Jaguar', 'Tapir'],
  ocean: ['Dolphin', 'Whale', 'Shark', 'Octopus', 'Sea Turtle', 'Starfish', 'Jellyfish', 'Seal', 'Seahorse', 'Crab'],
  arctic: ['Polar Bear', 'Arctic Fox', 'Walrus', 'Reindeer', 'Snowy Owl', 'Beluga Whale', 'Puffin', 'Arctic Hare', 'Musk Ox', 'Narwhal'],
  desert: ['Camel', 'Fennec Fox', 'Meerkat', 'Scorpion', 'Rattlesnake', 'Roadrunner', 'Gila Monster', 'Desert Tortoise', 'Kangaroo Rat', 'Jackrabbit'],
  wetland: ['Alligator', 'Crocodile', 'Flamingo', 'Pelican', 'Otter', 'Beaver', 'Heron', 'Swan', 'Frog', 'Turtle'],
  mountain: ['Mountain Goat', 'Yak', 'Snow Leopard', 'Golden Eagle', 'Alpaca', 'Llama', 'Cougar', 'Marmot', 'Bighorn Sheep', 'Red Panda'],
  woodland: ['Squirrel', 'Raccoon', 'Deer', 'Hedgehog', 'Fox', 'Owl', 'Woodpecker', 'Skunk', 'Robin', 'Butterfly']
};

/* ---------------- MAIN APP ---------------- */

export default function App() {
  const [screen, setScreen] = useState('home');
  const [animals, setAnimals] = useState([]);

  /* HOME SCREEN */
  if (screen === 'home') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>🐶 Animals App</Text>

        {Object.keys(DATA).map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.button}
            onPress={() => {
              setAnimals(DATA[key]);
              setScreen('animals');
            }}
          >
            <Text style={styles.buttonText}>
              {key.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  /* ANIMALS SWIPE SCREEN */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Swipe Animals 👉</Text>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {animals.map((animal, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.animal}>{animal}</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setScreen('home')}
      >
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    marginVertical: 6,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },

  card: {
    width,
    justifyContent: 'center',
    alignItems: 'center'
  },

  animal: {
    fontSize: 50,
    fontWeight: 'bold'
  },

  backButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10
  },

  backText: {
    color: 'white',
    fontSize: 16
  }
});