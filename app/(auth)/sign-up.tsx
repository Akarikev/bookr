import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FormField from "@/components/form-field";
import CustomButton from "@/components/custombutton";
import { router, Link } from "expo-router";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const emailRegex = (email: string): string | null => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email matches the regex
    if (regex.test(email)) {
      return email; // Return the parsed email if it matches
    }

    return null; // Return null if it doesn't match
  };

  const [isSubmitting, setSubmitting] = React.useState(false);

  const submitInfo = async () => {
    if (!form.username || !form.email || !form.password) {
      return Alert.alert("All fields are required");
    }

    const validEmail = emailRegex(form.email);
    if (!validEmail) {
      return Alert.alert("Please enter a valid email address");
    }

    setSubmitting(true);

    try {
      const res = await createUser(validEmail, form.password, form.username);

      if (res) {
        console.log(res);
        router.push("/home");
      }
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <View className="flex flex-row items-center gap-4 mt-2">
            <Ionicons name="book-outline" size={45} color="white" />
            <Text className="text-5xl tracking-tighter text-white font-pextrabold">
              bookr
            </Text>
          </View>

          <Text className="mt-10 text-2xl tracking-tighter text-white font-psemibold">
            Sign up into <Text className="text-secondary-200">bookr</Text>
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7 mb-7"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mb-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submitInfo}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-gray-100 font-pregular">
              Already got an account?
            </Text>
            <Link
              href={"/sign-in"}
              className="text-lg text-secondary-200 font-psemibold"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
