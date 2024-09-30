import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}: {
  video: {
    title: string;
    thumbnail: string;
    video: string;
    creator: {
      username: string;
      avatar: string;
    };
  };
}) => {
  const [play, setPlay] = React.useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row items-start gap-3">
        <View className="flex-row items-center justify-center flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border-secondary justify-center border items-center p-0.5 ">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg "
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1 ">
            <Text
              className="text-sm text-white font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {/* videos */}
      {play ? (
        <Text>playing</Text>
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          className="relative items-center justify-center w-full h-60 rounded-xl"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full mt-3 rounded-xl "
            resizeMode="cover"
          />

          <View className="absolute ">
            <Ionicons name="play" size={40} color="white" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
