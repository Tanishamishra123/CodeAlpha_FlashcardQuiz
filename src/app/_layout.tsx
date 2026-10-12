import { Stack } from "expo-router";
import { AuthProvider } from "../context/authentication";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="explore" />
        <Stack.Screen name="profile" />
      </Stack>
    </AuthProvider>
  );
}