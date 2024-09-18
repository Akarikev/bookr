import { Client, Account, ID } from "react-native-appwrite";

const client = new Client();

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "66eaf2f4001f03aa7268",
  //   key: "647a8a3c7b7c1f6f8c9a",
  databaseId: "66eaf6e4001e0836e198",
  userCollectionId: "66eaf725001ac04a7509",
  videoCollectionId: "66eaf7580036c91e6917",
  storageId: "66eafad4001a29f00199",
  platform: "com.develps.bookr",
};

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

// client
//     .setEndpoint('https://cloud.appwrite.io/v1')
//     .setProject('66eaf2f4001f03aa7268')
//     .setPlatform('com.develps.bookr');

const account = new Account(client);

export const createUser = () => {
  account.create(ID.unique(), "me@example.com", "password", "elorm").then(
    (res) => console.log(res),
    (err) => console.log(err)
  );
};
