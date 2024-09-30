import { View, Text, FlatList } from "react-native";
import React from "react";

const Trending = ({ posts }: { posts: any[] }) => {
  return (
    <FlatList
      keyExtractor={({ post }) => post?.id}
      data={posts}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
      )}
      horizontal
    >
      {/* <Text>{posts?.map((post) => post.id)}</Text> */}
    </FlatList>
  );
};

export default Trending;
