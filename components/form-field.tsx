import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { password } from "bun";
import Ionicons from "@expo/vector-icons/Ionicons";
const FormField = ({
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
    <View className={`space-y-2  ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium ">{title}</Text>

      <View className="flex-row items-center w-full h-16 px-2 border-2 border-black-200 rounded-2xl bg-black-100 focus:border-secondary">
        <TextInput
          className="flex-1 text-base text-white font-psemibold"
          placeholder={placeholder}
          value={value}
          placeholderTextColor={"#7b7b8b"}
          onChange={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#7b7b8b"
              onPress={() => setPassword(!showPassword)}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
