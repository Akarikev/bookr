import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  ViewToken,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { ResizeMode, Video } from "expo-av";

// Define animation types
interface ZoomProps {
  zoomIn: {
    0: { scale: number };
    1: { scale: number };
  };
  zoomOut: {
    0: { scale: number };
    1: { scale: number };
  };
}

// Define the zoom animations
const zoomIn: ZoomProps["zoomIn"] = {
  0: { scale: 0.9 },
  1: { scale: 1.1 },
};
const zoomOut: ZoomProps["zoomOut"] = {
  0: { scale: 1 },
  1: { scale: 0.9 },
};

// TrendingView component to show each item
const TrendingView = ({
  activeItem,
  item,
}: {
  activeItem: string;
  item: { $id: string; thumbnail: string; video: any };
}) => {
  const [play, setPlay] = React.useState(false);
  const videoRef = useRef<Video>(null); // Use ref to control the video component

  const togglePlayback = async () => {
    if (videoRef.current) {
      if (play) {
        await videoRef.current.pauseAsync();
        setPlay(false);
      } else {
        await videoRef.current.playAsync();
        setPlay(true);
      }
    }
  };

  return (
    <Animatable.View
      className="relative items-center justify-center mr-5"
      animation={activeItem === item?.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {/* Conditionally render the video if playing */}
      {play ? (
        <Video
          ref={videoRef} // Attach the ref to the video component
          source={{
            uri: item.video,
          }}
          className="w-52 h-72 rounded-[20px] bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
          useNativeControls
          onError={(error) => console.log("Video error: ", error)} // Handle video errors
        />
      ) : (
        <TouchableOpacity
          className="relative items-center justify-center"
          activeOpacity={0.7}
          onPress={togglePlayback} // Toggle playback on press
        >
          {/* Image background for the thumbnail */}
          <ImageBackground
            source={{ uri: item?.thumbnail || "" }}
            className="w-52 h-72 rounded-[20px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}
      {/* Conditionally render the play icon only when not playing */}
      {!play && (
        <View className="absolute">
          <Ionicons name="play" size={40} color="white" />
        </View>
      )}
    </Animatable.View>
  );
};

// Trending component with FlatList
const Trending = ({ posts }: { posts: any[] }) => {
  const [activeItem, setActiveItem] = React.useState(
    posts.length > 0 ? posts[0].$id : ""
  );

  // Handle viewable items change
  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0]?.item) {
        setActiveItem(viewableItems[0].item.$id);
      }
    },
    []
  );

  // Viewability config for FlatList
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 70,
  };

  if (!posts || posts.length === 0) {
    return <Text>No posts available</Text>; // Handle empty posts case
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item?.$id}
      renderItem={({ item }) => (
        <TrendingView activeItem={activeItem} item={item} />
      )}
      horizontal
      contentOffset={{ x: 170, y: 0 }}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
    />
  );
};

export default Trending;
