import { router, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { palette as c } from '@/constants/palette';
import { useDemoSession } from '@/contexts/demo-session';
const items = [{ href: '/profil/dashboard', label: 'Dashboard', icon: '▦' }, { href: '/profil/profil', label: 'Mon profil', icon: '○' }] as const;
export function AppFooter() {
  const { user } = useDemoSession();
  const pathname = usePathname();
  return <View style={s.footer}>{user ? <View accessibilityRole="tablist" style={s.nav}>{items.map(item => {
    const active = pathname === item.href;
    return <Pressable key={item.href} accessibilityRole="tab" accessibilityState={{ selected: active }} onPress={() => router.navigate(item.href)} style={[s.tab, active && s.active]}>
      <Text style={[s.icon, active && s.selected]}>{item.icon}</Text>
      <Text style={[s.label, active && s.selected]}>{item.label}</Text>
    </Pressable>;
  })}</View> : <Text style={s.note}>Ta salle. Ton équipe. Ta motivation.</Text>}</View>;
}
const s = StyleSheet.create({
  footer: { backgroundColor: c.background, borderTopWidth: 1, borderTopColor: c.border },
  nav: { flexDirection: 'row', width: '100%', maxWidth: 920, alignSelf: 'center', padding: 10, gap: 12 },
  tab: { flex: 1, minHeight: 55, alignItems: 'center', justifyContent: 'center', borderRadius: 12, gap: 3 }, active: { backgroundColor: c.softPrimary },
  icon: { color: c.muted, fontSize: 22 }, label: { color: c.muted, fontWeight: '600', fontSize: 12 }, selected: { color: c.accentText },
  note: { textAlign: 'center', color: c.muted, fontSize: 12, padding: 18 },
});

