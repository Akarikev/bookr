import React from "react";
import { getAllPost } from "./appwrite";
import { toast } from "@backpackapp-io/react-native-toast";

const useAppwrite = (fn = getAllPost) => {
  const [data, setData] = React.useState([]);

  const [isLoading, setLoading] = React.useState(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await fn();

      setData(res);
    } catch (error) {
      toast.error("Couldn't fetch post", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();
  return { data, isLoading, refetch };
};

export default useAppwrite;
