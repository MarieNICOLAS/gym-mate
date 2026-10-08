import { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Copy, Eyebrow, Heading, Screen, ui } from '@/components/ui/gym-ui';
import { MemberCard } from '@/components/member-card';
import { palette as c } from '@/constants/palette';
import { useDemoSession } from '@/contexts/demo-session';
import { demoGym, demoMembers, type Member } from '@/data/dashboard';
const filters = ['Tous', 'Musculation', 'Fitness', 'Cardio'] as const;
export default function Dashboard() {
  const { user } = useDemoSession();
  const [filter, setFilter] = useState<string>('Tous');
  const [member, setMember] = useState<Member | null>(null);
  const [details, setDetails] = useState(false);
  return <Screen>
    <View style={ui.section}>
      <Eyebrow>TON ESPACE SPORTIF</Eyebrow>
      <Heading>Salut {user?.name} 👋</Heading>
      <Copy>Une bonne séance commence avec la bonne personne.</Copy>
      <Text style={ui.tag}>⌖  {demoGym}</Text>
    </View>
    <View style={s.hero}>
      <View style={s.heroTop}>
        <Text style={s.heroEyebrow}>LE PROCHAIN RENDEZ-VOUS</Text>
        <Text style={s.confirmed}>✓ Confirmé</Text>
      </View>
      <Text style={s.heroTitle}>À deux,{'\n'}on va plus loin.</Text>
      <Text style={s.heroCopy}>Musculation avec Sami</Text>
      <Text style={s.heroCopy}>Demain · 18 h – 19 h</Text>
      <Pressable accessibilityRole="button" onPress={() => setDetails(true)} style={s.heroButton}>
        <Text style={s.heroButtonText}>Voir la séance  ↗</Text>
      </Pressable>
    </View>
    <View style={s.stats}>{[{ value: '01', label: 'Séance prévue' }, { value: '03', label: 'Partenaires' }, { value: '00', label: 'Demande reçue' }].map(stat => <View key={stat.label} style={s.stat}>
      <Text style={s.statValue}>{stat.value}</Text>
      <Text style={s.statLabel}>{stat.label}</Text>
    </View>)}</View>
    <View style={ui.section}>
      <Eyebrow>LE BON PARTENAIRE, TOUT PRÈS</Eyebrow>
      <Text style={ui.title}>Dans ta salle</Text>
      <Copy>Des objectifs en commun. Une raison de plus d’y aller.</Copy>
      <View style={s.filters}>{filters.map(value => <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: filter === value }} onPress={() => setFilter(value)} style={[s.filter, filter === value && s.selectedFilter]}>
        <Text style={[s.filterLabel, filter === value && { color: c.onPrimary }]}>{value}</Text>
      </Pressable>)}</View>
      {demoMembers.filter(item => filter === 'Tous' || item.sport === filter).map(item => <MemberCard key={item.id} member={item} onSelect={setMember} />)}
    </View>
    <Card>
      <Eyebrow>TES DEMANDES</Eyebrow>
      <Text style={ui.title}>Le début d’une belle équipe.</Text>
      <Copy>Aucune demande en attente dans cet aperçu. Découvre les sportifs de ta salle pour trouver ton prochain partenaire.</Copy>
    </Card>
    <Text style={s.demo}>APERÇU DÉMO · Séance, salle et partenaires fictifs.</Text>
    <Modal visible={!!member || details} transparent animationType="fade" onRequestClose={() => { setMember(null); setDetails(false); }}>
      <View style={s.overlay}>
        <View accessibilityViewIsModal style={s.modal}>
          <Eyebrow>{member ? 'DÉCOUVRIR UN PARTENAIRE' : 'TA PROCHAINE SÉANCE'}</Eyebrow>
          <Heading>{member ? member.name : 'Musculation'}</Heading>
          <Copy>{member ? member.sport + ' · ' + member.level : 'Avec Sami · Demain de 18 h à 19 h'}</Copy>
          <Copy>{member ? member.goal : 'Rendez-vous à l’accueil de la salle. Pense à prendre ta gourde et ta serviette.'}</Copy>
          <Text style={ui.tag}>{demoGym}</Text>
          <Copy>{member ? 'Disponibilités : ' + member.availability + '. Profil de démonstration ; les invitations seront ajoutées plus tard.' : 'Séance fictive pour présenter le dashboard.'}</Copy>
          <Button label="Fermer" onPress={() => { setMember(null); setDetails(false); }} />
        </View>
      </View>
    </Modal>
  </Screen>;
}
const s = StyleSheet.create({
  hero: { backgroundColor: c.primary, borderRadius: 24, padding: 24, gap: 14, overflow: 'hidden' },
  heroTop: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  heroEyebrow: { color: c.onPrimary, fontSize: 10, letterSpacing: 1.5, fontWeight: '800' },
  confirmed: { color: c.onPrimary, fontSize: 12, fontWeight: '600' },
  heroTitle: { color: c.onPrimary, fontSize: 38, lineHeight: 41, fontWeight: '900', letterSpacing: -1.5 },
  heroCopy: { color: c.onPrimary, fontSize: 15, fontWeight: '500' },
  heroButton: { backgroundColor: c.onPrimary, padding: 16, borderRadius: 12, marginTop: 8, minHeight: 50, alignItems: 'center' },
  heroButtonText: { color: c.primary, fontSize: 15, fontWeight: '700' },
  stats: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  stat: { flex: 1, minWidth: 85, backgroundColor: c.surface, borderRadius: 16, padding: 14, gap: 6 },
  statValue: { color: c.text, fontSize: 28, fontWeight: '700' }, statLabel: { color: c.muted, fontSize: 11 },
  filters: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' }, filter: { paddingHorizontal: 16, minHeight: 44, justifyContent: 'center', borderRadius: 22, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border },
  selectedFilter: { backgroundColor: c.primary, borderColor: c.primary }, filterLabel: { color: c.muted, fontSize: 13, fontWeight: '600' },
  demo: { color: c.muted, fontSize: 11, textAlign: 'center' },
  overlay: { flex: 1, backgroundColor: '#000000B3', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modal: { width: '100%', maxWidth: 440, backgroundColor: c.surface, borderRadius: 24, padding: 24, gap: 18 },
});
