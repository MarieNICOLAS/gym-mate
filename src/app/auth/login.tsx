import { useState } from 'react';
import { router } from 'expo-router';
import { View } from 'react-native';
import { Button, Copy, ErrorMessage, Eyebrow, Field, Heading, Screen, ui } from '@/components/ui/gym-ui';
import { useDemoSession } from '@/contexts/demo-session';
import { validateCredentials } from '@/utils/validation';
export default function LoginPage() {
  const { login } = useDemoSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  function handleLogin() {
    const message = validateCredentials(email, password);
    setError(message);
    // Le garde du layout ouvre le premier écran privé : le dashboard.
    if (!message)
      login(email.trim().toLowerCase());
  }
  return <Screen>
    <View style={{ width: '100%', maxWidth: 440, alignSelf: 'center', gap: 24, paddingTop: 32 }}>
      <Eyebrow>HEUREUX DE TE RETROUVER</Eyebrow>
      <Heading>On s’y remet ?</Heading>
      <Copy>Retrouve tes partenaires et prépare ta prochaine séance.</Copy>
      <View style={ui.section}>
        <Field label="Adresse e-mail" placeholder="toi@exemple.fr" value={email} onChangeText={setEmail} autoCapitalize="none" autoCorrect={false} keyboardType="email-address" autoComplete="email" />
        <Field label="Mot de passe" placeholder="8 caractères minimum" value={password} onChangeText={setPassword} autoCapitalize="none" secureTextEntry autoComplete="current-password" onSubmitEditing={handleLogin} returnKeyType="go" />
        <ErrorMessage message={error} />
        <Button label="Se connecter →" onPress={handleLogin} />
        <Button secondary label="Créer un compte" onPress={() => router.push('/auth/signup')} />
      </View>
      <Copy>Mode démo : utilise un e-mail valide et 8 caractères minimum. Aucun compte réel n’est vérifié.</Copy>
    </View>
  </Screen>;
}
