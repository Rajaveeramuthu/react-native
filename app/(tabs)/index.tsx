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
import HomeScreen from '@/components/landing/home-screen';
import ContactUS from '@/components/landing/contact-us';

export default function App() {
  // const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* <HomeScreen/> */}
      <ContactUS/>
    </>
 
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },

//   background: {
//     flex: 1,
//     justifyContent: 'flex-end',
//   },

//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.25)',
//     justifyContent: 'flex-end',
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//   },

//   content: {
//     gap: 16,
//   },

//   title: {
//     color: '#fff',
//     fontSize: 42,
//     fontWeight: '900',
//     lineHeight: 45,
//   },

//   description: {
//     color: '#d1d5db',
//     fontSize: 16,
//     lineHeight: 24,
//     width: '85%',
//   },

//   button: {
//     marginTop: 20,
//     backgroundColor: '#1DA1F2',
//     paddingVertical: 16,
//     borderRadius: 40,
//     alignItems: 'center',
//   },

//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '700',
//   },
// });