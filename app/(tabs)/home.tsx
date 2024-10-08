import {
  View,
  Text,
  FlatList,
  Image,
  StatusBar,
  RefreshControl,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import SearchInput from "@/components/searchinput";
import Trending from "@/components/trending";
import EmptyState from "@/components/emptystate";
import { toast } from "@backpackapp-io/react-native-toast";
import { getAllPost, getLatestPosts } from "@/lib/appwrite";

import useAppwrite from "@/lib/useappwrite";
import VideoCard from "@/components/videocard";
import Ionicons from "@expo/vector-icons/Ionicons";

const Home = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data: posts, refetch, isLoading } = useAppwrite(getAllPost);
  const { data: latestPosts } = useAppwrite(getLatestPosts);

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(async () => {
      await refetch();
      setRefreshing(false);
    }, 6000);

    //recall post > if any videos appear
  };

  // console.log(posts);
  return (
    <SafeAreaView className="h-full text-white bg-primary">
      <View className="font-pregular">
        <FlatList
          keyExtractor={(post) => post.id}
          data={posts}
          renderItem={({ item: post }) => <VideoCard video={post} />}
          ListHeaderComponent={() => {
            return (
              <View className="px-4 my-6 space-y-6">
                <View className="flex-row items-start justify-between mb-6">
                  <View>
                    <Text className="text-sm text-gray-100 font-pmedium">
                      Welcome back
                    </Text>
                    <Text className="text-2xl text-purple-50 font-psemibold">
                      elorm
                    </Text>
                  </View>

                  <View className="mt-1.5">
                    {/* <Image
                      className="h-10 w-9"
                      source={images.logoSmall}
                      resizeMode="contain"
                    /> */}

                    <Ionicons name="book-outline" size={25} color="white" />
                    {/* <Text className="text-5xl tracking-tighter text-white font-pextrabold">
                      bookr
                    </Text> */}
                  </View>
                </View>

                {/* search input */}
                <SearchInput placeholder="search here" />

                <View className="flex-1 w-full pt-5 pb-8">
                  <Text className="mb-3 text-lg text-gray-100 font-pmedium">
                    latest videos
                  </Text>

                  <Trending posts={latestPosts ?? []} />
                </View>
              </View>
            );
          }}
          ListEmptyComponent={() => {
            return (
              <EmptyState
                title="Empty!"
                description="No videos found, be the first to add one!"
              />
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>

      <StatusBar networkActivityIndicatorVisible barStyle="light-content" />
    </SafeAreaView>
  );
};

export default Home;
