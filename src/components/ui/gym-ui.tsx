import type { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { palette as c } from '@/constants/palette';
export function Screen({ children }: PropsWithChildren) {
  return <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.content}>{children}</ScrollView>
  </KeyboardAvoidingView>;
}
export function Button({ label, onPress, secondary = false }: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
}) {
  return <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [s.button, secondary && s.secondary, pressed && { opacity: 0.75 }]}>
    <Text style={[s.buttonText, secondary && { color: c.text }]}>{label}</Text>
  </Pressable>;
}
export function Field({ label, ...props }: TextInputProps & {
  label: string;
}) {
  return <View style={s.field}>
    <Text style={s.label}>{label}</Text>
    <TextInput accessibilityLabel={label} placeholderTextColor={c.muted} style={s.input} {...props} />
  </View>;
}
export function Card({ children }: PropsWithChildren) { return <View style={s.card}>{children}</View>; }
export function Eyebrow({ children }: PropsWithChildren) { return <Text style={s.eyebrow}>{children}</Text>; }
export function Heading({ children }: PropsWithChildren) { return <Text style={s.heading}>{children}</Text>; }
export function Copy({ children }: PropsWithChildren) { return <Text style={s.copy}>{children}</Text>; }
export function ErrorMessage({ message }: {
  message: string;
}) { return message ? <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={s.error}>{message}</Text> : null; }
export const ui = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  title: { fontSize: 20, fontWeight: '700', color: c.text },
  muted: { color: c.muted, fontSize: 14, lineHeight: 21 },
  section: { gap: 14 },
  tag: { color: c.accentText, fontSize: 12, fontWeight: '700', backgroundColor: c.softPrimary, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, alignSelf: 'flex-start' },
});
const s = StyleSheet.create({
  flex: { flex: 1, backgroundColor: c.background },
  content: { width: '100%', maxWidth: 920, alignSelf: 'center', padding: 24, paddingBottom: 32, gap: 24, flexGrow: 1 },
  button: { minHeight: 52, backgroundColor: c.primary, padding: 16, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  secondary: { backgroundColor: c.elevated, borderWidth: 1, borderColor: c.border },
  buttonText: { color: c.onPrimary, fontSize: 15, fontWeight: '700', textAlign: 'center' },
  field: { gap: 8 }, label: { color: c.text, fontWeight: '600', fontSize: 14 },
  input: { backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, color: c.text, minHeight: 54, borderRadius: 12, padding: 16, fontSize: 16 },
  card: { padding: 20, borderRadius: 20, backgroundColor: c.surface, borderWidth: 1, borderColor: c.border, gap: 16 },
  eyebrow: { color: c.accentText, fontSize: 11, letterSpacing: 2, fontWeight: '700' },
  heading: { color: c.text, fontSize: 34, lineHeight: 40, fontWeight: '800', letterSpacing: -1 },
  copy: { color: c.muted, fontSize: 16, lineHeight: 25 },
  error: { color: c.danger, lineHeight: 22 },
});

