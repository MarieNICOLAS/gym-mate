import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette as c } from '@/constants/palette';
import { useDemoSession } from '@/contexts/demo-session';
export function AppHeader() {
  const { user } = useDemoSession();
  const pathname = usePathname();
  return <View style={s.border}>
    <View style={s.header}>
      <Pressable accessibilityRole="button" accessibilityLabel={user ? 'Aller au dashboard' : 'Aller à l’accueil'} onPress={() => router.navigate(user ? '/profil/dashboard' : '/')} style={s.brand}>
        <View style={s.mark}>
          <Text style={s.markText}>g.</Text>
        </View>
        <Text style={s.logo}>gym<Text style={{ color: c.accentText }}>mate</Text>
        </Text>
      </Pressable>
      {user ? <Pressable accessibilityRole="button" accessibilityLabel="Mon profil" onPress={() => router.navigate('/profil/profil')} style={s.avatar}>
        <Text style={s.initial}>{user.name.slice(0, 1).toUpperCase()}</Text>
      </Pressable> : pathname !== '/' ? <Pressable accessibilityRole="button" onPress={() => router.canGoBack() ? router.back() : router.replace('/')} style={s.back}>
        <Text style={s.backText}>← Retour</Text>
      </Pressable> : <Text style={s.backText}>ENSEMBLE, PLUS LOIN.</Text>}
    </View>
  </View>;
}
const s = StyleSheet.create({
  border: { borderBottomWidth: 1, borderBottomColor: c.border, backgroundColor: c.background },
  header: { width: '100%', maxWidth: 920, alignSelf: 'center', minHeight: 76, paddingHorizontal: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 44 },
  mark: { backgroundColor: c.primary, width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' }, markText: { fontSize: 26, fontWeight: '900', color: c.onPrimary },
  logo: { color: c.text, fontWeight: '800', fontSize: 25, letterSpacing: -1 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: c.elevated, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: c.border }, initial: { color: c.accentText, fontWeight: '700' },
  back: { minHeight: 44, justifyContent: 'center' }, backText: { color: c.muted, fontSize: 10, letterSpacing: 0.5 },
});

