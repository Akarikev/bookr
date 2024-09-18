import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custombutton";
import { router, Link } from "expo-router";
const SignIn = () => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setSubmitting] = React.useState(false);

  const submitInfo = () => {};
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View className="flex flex-row items-center gap-4 mt-2 ">
            <Ionicons name="book-outline" size={45} color="white" />
            <Text className="text-5xl tracking-tighter text-white font-pextrabold">
              bookr
            </Text>
          </View>

          <Text className="mt-10 text-2xl tracking-tighter text-white font-psemibold">
            Log into <Text className=" text-secondary-200">bookr</Text>
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7 mb-7"
          />

          <CustomButton
            title="Sign in"
            handlePress={submitInfo}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href={"/sign-up"}
              className="text-lg text-secondary-200 font-psemibold"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
