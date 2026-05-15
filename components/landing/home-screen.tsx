import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  StatusBar, Button,
  Pressable,Modal
} from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }}
        resizeMode="cover"
        style={styles.background}
      >

        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>Nature</Text>

            <Text style={styles.description}>
              Discover the beauty of nature with our curated collection of landscapes and wildlife photography.
            </Text>
            <Pressable onPressOut={() => console.log("pressed")}>
              <Text style={styles.buttonText}>press</Text>
            </Pressable>

            <TouchableOpacity style={styles.button} onPressIn={()=>console.log("jsjs")} onPress={()=>setModalVisible(true)}>
              <Text style={styles.buttonText}>Let's get Started</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} onRequestClose={()=>setModalVisible(false)} 
            animationType='fade'
            presentationStyle='formSheet'>
              <View>
                <Text>Modal Content</Text>
                <Button title="Close Modal" onPress={() => setModalVisible(false)} />
              </View>
            </Modal>
            
            {/* <TouchableOpacity style={styles.button}
              onPress={() => console.log("Button Clicked")}
              onPressIn={() => console.log("Finger Touch")}
              onPressOut={() => console.log("Finger Removed")}
            >
              <Text>Click Me</Text>
            </TouchableOpacity> */}
            {/* <Button title="Click Me" onPress={() => console.log("button pressed")} /> */}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  background: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  content: {
    gap: 16,
  },

  title: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
    lineHeight: 45,
  },

  description: {
    color: '#d1d5db',
    fontSize: 16,
    lineHeight: 24,
    width: '85%',
  },

  button: {
    marginTop: 20,
    backgroundColor: '#1DA1F2',
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});