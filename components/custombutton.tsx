import { View, Text, TouchableOpacity, Animated } from "react-native";
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
  const spinValue = React.useRef(new Animated.Value(0)).current;

  // Set up the spin animation using useEffect
  React.useEffect(() => {
    if (isLoading) {
      // Start a continuous spin animation
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000, // duration of one spin (1 second)
          useNativeDriver: true, // enable native driver for better performance
        })
      ).start();
    } else {
      // Stop the spin if not loading
      spinValue.stopAnimation();
    }
  }, [isLoading]);

  // Interpolate spinValue to map it to rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // rotate from 0 to 360 degrees
  });

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
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <MaterialCommunityIcons
              name="loading"
              size={24}
              color="white"
              className="text-center"
            />
          </Animated.View>
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
