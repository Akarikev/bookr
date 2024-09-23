import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

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
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) {
      throw new Error("Account not created");
    }

    const avatarUrl = avatars.getInitials(username);

    await SignIn(email, password);

    const newUser = await db.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatarUrl: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    // Log only relevant error details
    // console.error("Error creating user:", error.message || "Unknown error");

    // Throw only the message to avoid cyclical structure
    throw new Error(error.message || "User creation failed");
  }
};

export async function SignIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    // Log only relevant error details
    console.error("Error signing in:", error.message || "Unknown error");

    // Throw only the message to avoid cyclical structure
    throw new Error(error.message || "Sign-in failed");
  }
}
