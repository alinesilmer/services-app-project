import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      initialRouteName="tabs/splashscreen"  
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
