import { Text, View, StyleSheet } from 'react-native';
import { Button, Card, ui } from '@/components/ui/gym-ui';
import { palette as c } from '@/constants/palette';
import type { Member } from '@/data/dashboard';
export function MemberCard({ member, onSelect }: {
  member: Member;
  onSelect: (member: Member) => void;
}) {
  return <Card>
    <View style={ui.row}>
      <View style={s.avatar}>
        <Text style={s.initials}>{member.initials}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={ui.title}>{member.name}</Text>
        <Text style={ui.muted}>{member.level} · {member.availability}</Text>
      </View>
    </View>
    <Text style={ui.tag}>{member.sport}</Text>
    <Button secondary label={'Découvrir ' + member.name} onPress={() => onSelect(member)} />
  </Card>;
}
const s = StyleSheet.create({ avatar: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: c.elevated }, initials: { color: c.secondary, fontWeight: '800', fontSize: 16 } });
