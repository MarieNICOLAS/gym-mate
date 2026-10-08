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

export default function LoginPage() {
  // useState garde les valeurs saisies pendant que la page est affichée.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      setMessage("Remplis les deux champs.");
      return;
    }

    setMessage("Champs remplis ! La vraie connexion sera ajoutée plus tard.");
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
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.text}>Connecte-toi à ton compte GymMate.</Text>

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
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </Pressable>

        {message !== "" && (
          <Text accessibilityLiveRegion="polite" style={styles.text}>
            {message}
          </Text>
        )}
        <Link href="/auth/signup" replace style={styles.link}>
          Créer un compte
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
