import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./custombutton";
import { router } from "expo-router";

const EmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <View className="items-center justify-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="text-2xl text-purple-50 font-psemibold">{title}</Text>
      <Text className="text-sm text-gray-100 font-pmedium">{description}</Text>

      <TouchableOpacity
        onPress={() => router.push("/create")}
        className="w-full px-6 py-3 mt-6 rounded-md bg-secondary "
      >
        <Text className="text-base text-center text-white font-psemibold">
          Create Video
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyState;
