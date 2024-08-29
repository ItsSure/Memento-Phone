import React from "react";
import { View, Text } from "react-native";

const CardElement = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <View className="bg-[#0A0A0A] border border-[#333] mb-3 rounded-lg shadow-md max-w-[800px] animation-card">
      <View className="flex flex-row">
        {/* <View className="flex-1">
          <Image
            source={{ uri: imageurl }}
            className="w-full h-[150px] rounded-l-lg"
            alt={title}
          />
        </View> */}
        <View className="flex-1 p-4">
          <Text className="text-lg font-bold text-white">
            Reflection {title}
          </Text>
          {/* <Text className="text-sm text-gray-400">{element.enlace}</Text> */}
          <Text className="text-base text-white mt-2">{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardElement;
