import {
  Client,
  Account,
  ID,
  Avatars,
  Databases,
  Query,
} from "react-native-appwrite";

const user = new Client();

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "66eaf2f4001f03aa7268",
  databaseId: "66eaf6e4001e0836e198",
  userCollectionId: "66eaf725001ac04a7509",
  videoCollectionId: "66eaf7580036c91e6917",
  storageId: "66eafad4001a29f00199",
  platform: "com.develps.bookr",
};

user
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(user);
const avatars = new Avatars(user);
const db = new Databases(user);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    // Create a new user account
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount || !newAccount.$id) {
      throw new Error("Account creation failed or account ID is missing");
    }

    // Generate avatar URL based on initials
    const avatarUrl = avatars.getInitials(username);

    // Sign in the new user after account creation
    await SignIn(email, password);

    // Create a new document in the users collection
    const newUser = await db.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(), // Unique ID for the document
      {
        account_id: newAccount.$id!, // Use the account ID from the created account
        email: email,
        username: username,
        avatar: avatarUrl, // Optional field for avatar
      }
    );

    return newUser; // Return the newly created user document
  } catch (error: any) {
    // Log the error message for debugging
    console.error("Error creating user:", error.message || "Unknown error");

    // Throw only the error message to avoid excessive details
    throw new Error(error.message || "User creation failed");
  }
};

export async function SignIn(email: string, password: string) {
  try {
    // Sign out if a session is already active
    try {
      await account.deleteSession("current");
    } catch (error) {
      console.log("No active session to sign out from.");
    }

    // Create a new session
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error: any) {
    console.error("Error signing in:", error.message || "Unknown error");
    throw new Error(error.message || "Sign-in failed");
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) {
      throw Error;
    }

    const currentUser = await db.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("account_id", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAllPost = async () => {
  try {
    const posts = await db.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};
