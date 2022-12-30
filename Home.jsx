import React from "react";
import { View, Text, Button } from "react-native";

function Home({ navigation }) {
  return (
    <View>
      <Text>Home</Text>
      <Button title="Gå till Chat" onPress={() => {
        navigation.navigate("chat")
      }} />
    </View>
  );
}

export default Home;
