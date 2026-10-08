import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Card, Copy, Eyebrow, Heading, Screen } from '@/components/ui/gym-ui';
import { palette as c } from '@/constants/palette';
export default function HomePage() {
  return <Screen>
    <View style={s.hero}>
      <Eyebrow>TA PROCHAINE SÉANCE COMMENCE ICI</Eyebrow>
      <Heading>La motivation,{'\n'}ça se partage.</Heading>
      <Copy>Trouve ton partenaire dans ta salle et transforme tes bonnes résolutions en rendez-vous.</Copy>
      <View style={s.art}>
        <View style={s.disc}>
          <Text style={s.letter}>TOI</Text>
        </View>
        <Text style={s.plus}>+</Text>
        <View style={[s.disc, s.lime]}>
          <Text style={[s.letter, { color: c.onPrimary }]}>TON{'\n'}MATE</Text>
        </View>
      </View>
      <Button label="Rejoindre GymMate →" onPress={() => router.push('/auth/signup')} />
      <Button secondary label="J’ai déjà un compte" onPress={() => router.push('/auth/login')} />
    </View>
    <Card>
      <Eyebrow>UNE SALLE. DES RENCONTRES.</Eyebrow>
      <Copy>Découvre les membres, trouve un créneau commun et avance avec quelqu’un qui partage tes objectifs.</Copy>
    </Card>
  </Screen>;
}
const s = StyleSheet.create({
  hero: { gap: 22, paddingTop: 24, maxWidth: 540, width: '100%', alignSelf: 'center' },
  art: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  disc: { width: 108, height: 108, backgroundColor: c.elevated, borderRadius: 54, borderWidth: 1, borderColor: c.border, justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '-10deg' }] },
  lime: { backgroundColor: c.primary, transform: [{ rotate: '10deg' }] },
  letter: { color: c.text, fontSize: 24, fontWeight: '900', textAlign: 'center' }, plus: { color: c.muted, fontSize: 28, marginHorizontal: 12 },
});
