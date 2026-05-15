import React from 'react'
import { Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default function Nav() {
  return (
    <LinearGradient
      colors={['#351913', '#392617']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        padding: 70,
      }}
    >
      <Text style={{ color: 'white' }}>nav</Text>
    </LinearGradient>
  )
}