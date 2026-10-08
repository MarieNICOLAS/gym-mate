import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { DemoSessionProvider, useDemoSession } from '@/contexts/demo-session';
import { palette } from '@/constants/palette';
function Navigation() {
  const { user } = useDemoSession();
  return <SafeAreaView style={{ flex: 1, backgroundColor: palette.background }}>
    <AppHeader />
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: palette.background } }}>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signup" />
      </Stack.Protected>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="profil/dashboard" />
        <Stack.Screen name="profil/profil" />
      </Stack.Protected>
    </Stack>
    <AppFooter />
    <StatusBar style="dark" />
  </SafeAreaView>;
}
export default function RootLayout() {
  return <DemoSessionProvider>
    <Navigation />
  </DemoSessionProvider>;
}
