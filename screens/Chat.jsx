import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: "APIKEY",
});
const openai = new OpenAIApi(config);

const basePrompt = `Stevie is a chatbot that answers questions with occasional barks.\n\
You: What did you have for dinner?\n\
Stevie: I had delicious dog food. Woof!\n`;

function Chat() {
  const [prompt, setPrompt] = useState(basePrompt);

  const handleSubmit = async ({ nativeEvent }) => {
    const { text } = nativeEvent;

    let newPrompt = prompt + `You: ${text}\n`
    try {
      const gptResponse = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: newPrompt,
        max_tokens: 60,
        temperature: 0.3,
        top_p: 0.3,
        presence_penalty: 0,
        frequency_penalty: 0.5,
      });
  
      newPrompt += `${gptResponse.data.choices[0].text}\n`
      setPrompt(newPrompt);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 24, lineHeight: 32 }}>{prompt}</Text>
      <TextInput placeholder="Write something" onSubmitEditing={handleSubmit} />
    </View>
  );
}

export default Chat;
