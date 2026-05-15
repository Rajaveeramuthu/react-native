import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { View, Text, ActivityIndicator,Button,Alert } from 'react-native'

export default function ContactUS() {
    return (
        <View style={{ paddingTop: 40, flex: 1 }}>
            <StatusBar/>
            {/* <ActivityIndicator color="red" size="large"/> */}
            <Text>ContactUS</Text>
            <Button title='alert' onPress={() => Alert.alert('Alert Title', 'This is the alert message!' ,[
                {
                    text:"cancel",
                    onPress:()=>console.log("cancelled"),
                },{
                    text:"ok",
                    onPress:()=>console.log("ok")
                },{
                    text:"ask me later",
                    onPress:()=>console.log("ask me later")
                },{
                    text:'dummy',
                onPress:()=>console.log("dummy")
                }
            ])} />
        </View>
    )
}
