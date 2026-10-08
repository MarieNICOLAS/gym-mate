import { Link } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import { palette } from "../../constants/palette";
import { styles } from "../../styles/common";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSignup() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("Remplis tous les champs.");
      return;
    }

    if (!email.includes("@")) {
      setMessage("L’adresse e-mail doit contenir un @.");
      return;
    }

    if (password.length < 8) {
      setMessage("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setMessage(
      "Formulaire valide ! L’enregistrement du compte viendra plus tard.",
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Inscription</Text>

        <Text style={styles.label}>Prénom</Text>
        <TextInput
          accessibilityLabel="Prénom"
          style={styles.input}
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Adresse e-mail</Text>
        <TextInput
          accessibilityLabel="Adresse e-mail"
          style={styles.input}
          placeholder="exemple@email.fr"
          placeholderTextColor={palette.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          accessibilityLabel="Mot de passe"
          style={styles.input}
          placeholder="8 caractères minimum"
          placeholderTextColor={palette.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={handleSignup}
        >
          <Text style={styles.buttonText}>S’inscrire</Text>
        </Pressable>

        {message !== "" && (
          <Text accessibilityLiveRegion="polite" style={styles.text}>
            {message}
          </Text>
        )}
        <Link href="/auth/login" replace style={styles.link}>
          J’ai déjà un compte
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
