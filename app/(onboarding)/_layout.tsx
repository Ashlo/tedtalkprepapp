import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="experience" />
      <Stack.Screen name="topic" />
      <Stack.Screen name="goals" />
    </Stack>
  );
}