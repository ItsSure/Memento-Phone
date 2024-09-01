import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";

const CardElement = ({
  title,
  description: { EN, ES },
}: {
  title: string;
  description: { EN: string; ES: string };
}) => {
  const [isTranslated, setIsTranslated] = useState(false);

  const handleTranslate = () => {
    setIsTranslated(!isTranslated);
  };

  return (
    <View className="bg-[#0A0A0A] border border-[#333] mb-3 rounded-lg shadow-md max-w-[800px] animation-card">
      <View className="flex flex-row">
        <View className="flex-1 p-4">
          <Text className="text-lg font-bold text-white">
            Reflection {title}
          </Text>
          <Text className="text-base text-white mt-2">
            {isTranslated ? ES : EN}
          </Text>
        </View>
      </View>
      <View className="p-2 border-t border-[#333]">
        <Pressable
          onPress={handleTranslate}
          className="flex items-center justify-center p-2"
        >
          <Ionicons
            name={isTranslated ? "language" : "language-outline"}
            size={24}
            color="white"
          />
        </Pressable>
      </View>
    </View>
  );
};

export default CardElement;
