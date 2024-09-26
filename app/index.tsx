import "react-native-url-polyfill/auto";

import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Link, Redirect, router } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomButton from "@/components/custombutton";
import { useGlobalContext } from "@/context/globals";

const Home = () => {
  const { isLoggedIn, loading } = useGlobalContext();

  if (!loading && isLoggedIn) {
    return Redirect({ href: "/home" });
  }

  return (
    <>
      <SafeAreaView className="flex flex-1 h-full bg-primary ">
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View className="items-center w-full min-h-[85vh] px-4 justify-center ">
            {/* <Image source={images.logo} /> */}

            <View className="flex flex-row items-center justify-center gap-4 mt-2 ">
              <Ionicons name="book-outline" size={45} color="white" />
              <Text className="text-5xl tracking-tighter text-white font-pextrabold">
                bookr
              </Text>
            </View>

            <Image
              source={images.cards}
              className="max-w-[380px] h-[300px] "
              resizeMode="contain"
            />

            <View className="relative mt-5 ">
              <Text className="text-3xl tracking-tighter text-center text-white font-pextrabold">
                Discover endless posibilities with{" "}
                <Text className="text-secondary-200">bookr</Text>
              </Text>

              <Image
                source={images.path}
                className="w-[136px] h-[15px] absolute -bottom-2 right-20"
                resizeMode="contain"
              />
            </View>

            <Text className="text-sm text-center text-gray-100 mt-7 font-pregular">
              Where creativity meets innovations : embark on a journey of
              limitless exploration with bookr
            </Text>
          </View>
        </ScrollView>
        <CustomButton
          title="Continue with Email"
          handlePress={() => {
            router.push("/sign-in");
          }}
        />

        <StatusBar backgroundColor="#161622" barStyle="light-content" />
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
});
