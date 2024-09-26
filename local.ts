export type MainType = {
  className: string;
};

export const emailRegex = (email: string): string | null => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the email matches the regex
  if (regex.test(email)) {
    return email; // Return the parsed email if it matches
  }

  return null; // Return null if it doesn't match
};
