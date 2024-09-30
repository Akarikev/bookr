import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { password } from "bun";
import Ionicons from "@expo/vector-icons/Ionicons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
const SearchInput = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  keyboardType,
  placeholder,
  ...props
}: {
  title: string;
  value: string;
  placeholder?: string;
  handleChangeText: any;
  otherStyles?: string;
  keyboardType?: string;
}) => {
  const [showPassword, setPassword] = React.useState(false);
  return (
    <View className="flex-row items-center w-full h-16 px-2 space-x-4 border-2 border-black-200 rounded-2xl bg-black-100 focus:border-secondary">
      <TextInput
        className="flex-1 text-base text-white font-pregular mt-0.5"
        placeholder={placeholder}
        value={value}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={handleChangeText}
      />

      <TouchableOpacity>
        <EvilIcons name="search" size={30} color="white" className="w-5 h-5 " />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
