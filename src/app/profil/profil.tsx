import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, Copy, ErrorMessage, Eyebrow, Field, Heading, Screen, ui } from '@/components/ui/gym-ui';
import { useDemoSession } from '@/contexts/demo-session';
import { demoGym } from '@/data/dashboard';
export default function Profil() {
  const { user, logout, updateName } = useDemoSession();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [error, setError] = useState('');
  function save() {
    if (!name.trim()) {
      setError('Indique un prénom.');
      return;
    }
    updateName(name.trim());
    setError('');
    setEditing(false);
  }
  return <Screen>
    <View style={ui.section}>
      <Eyebrow>TON PROFIL</Eyebrow>
      <Heading>Faisons connaissance.</Heading>
      <Copy>Un peu de toi, pour mieux s’entraîner ensemble.</Copy>
    </View>
    <Card>
      <Text style={ui.title}>{user?.name}</Text>
      <Text style={ui.tag}>Membre · Démonstration</Text>
      {editing ? <>
        <Field label="Prénom" value={name} onChangeText={setName} autoCapitalize="words" />
        <ErrorMessage message={error} />
        <Button label="Enregistrer" onPress={save} />
        <Button secondary label="Annuler" onPress={() => { setEditing(false); setError(''); }} />
      </> : <Button secondary label="Modifier mon prénom" onPress={() => { setName(user?.name ?? ''); setEditing(true); }} />}
    </Card>
    <Card>
      <Text style={ui.title}>Informations personnelles</Text>
      <Text style={ui.muted}>Adresse e-mail</Text>
      <Copy>{user?.email}</Copy>
      <Text style={ui.muted}>Salle de démonstration</Text>
      <Copy>{demoGym}</Copy>
    </Card>
    <Copy>Les modifications restent disponibles pendant cette session de démonstration. Elles ne sont pas encore enregistrées dans Firebase.</Copy>
    <Button secondary label="Se déconnecter" onPress={logout} />
  </Screen>;
}
