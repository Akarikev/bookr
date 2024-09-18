import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  isLoading?: boolean;
  textStyles?: string;
}) => {
  return (
    <TouchableOpacity
      className={
        `bg-secondary p-5 rounded-lg mx-4 min-h-[62px ]` + containerStyles
      }
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className="text-xl text-center text-white font-pbold">
        {isLoading ? (
          <MaterialCommunityIcons
            name="loading"
            size={24}
            color="white"
            className="animate-spin"
          />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
