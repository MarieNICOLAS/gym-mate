import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { palette } from '../constants/palette';

export default function RootLayout() {
  return (
    <>
      {/* Stack permet de naviguer entre les pages avec un bouton Retour. */}
      <Stack screenOptions={{
        headerStyle: { backgroundColor: palette.background },
        headerTintColor: palette.text,
        contentStyle: { backgroundColor: palette.background },
      }}>
        <Stack.Screen name="index" options={{ title: 'GymMate' }} />
        <Stack.Screen name="auth/login" options={{ title: 'Connexion' }} />
        <Stack.Screen name="auth/signup" options={{ title: 'Inscription' }} />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
