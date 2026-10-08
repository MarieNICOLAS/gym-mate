import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { styles } from "../styles/common";

export default function HomePage() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Bienvenue sur GymMate</Text>
      <Text style={styles.text}>
        Trouve un partenaire de sport dans ta salle et organise tes séances avec
        lui.
      </Text>

      {/* Chaque lien ouvre la page qui correspond à son chemin. */}
      <Link href="/auth/signup" asChild>
        <Pressable accessibilityRole="button" style={styles.button}>
          <Text style={styles.buttonText}>S’inscrire</Text>
        </Pressable>
      </Link>

      <Link href="/auth/login" asChild>
        <Pressable
          accessibilityRole="button"
          style={StyleSheet.flatten([styles.button, styles.buttonOutline])}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}
