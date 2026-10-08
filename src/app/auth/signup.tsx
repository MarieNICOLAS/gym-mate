import { router } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';
import { Button, Copy, ErrorMessage, Eyebrow, Field, Heading, Screen, ui } from '@/components/ui/gym-ui';
import { validateCredentials } from '@/utils/validation';
export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  function handleSignup() {
    const message = !name.trim() ? 'Indique ton prénom.' : validateCredentials(email, password);
    setError(message);
    if (!message)
      router.replace('/auth/login');
  }
  return <Screen>
    <View style={{ width: '100%', maxWidth: 440, alignSelf: 'center', gap: 24 }}>
      <Eyebrow>BIENVENUE DANS L’ÉQUIPE</Eyebrow>
      <Heading>Tout commence{'\n'}à deux.</Heading>
      <Copy>Fais le premier pas vers ta prochaine rencontre sportive.</Copy>
      <View style={ui.section}>
        <Field label="Prénom" value={name} onChangeText={setName} placeholder="Ton prénom" autoCapitalize="words" autoComplete="given-name" />
        <Field label="Adresse e-mail" value={email} onChangeText={setEmail} placeholder="toi@exemple.fr" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} autoComplete="email" />
        <Field label="Mot de passe" value={password} onChangeText={setPassword} placeholder="8 caractères minimum" secureTextEntry autoCapitalize="none" autoComplete="new-password" onSubmitEditing={handleSignup} />
        <ErrorMessage message={error} />
        <Button label="Valider mon inscription →" onPress={handleSignup} />
      </View>
      <Copy>Mode démo : ce formulaire valide la saisie puis ouvre la connexion. Aucun compte n’est encore enregistré.</Copy>
    </View>
  </Screen>;
}
