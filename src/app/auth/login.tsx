import { Link } from "expo-router";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
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
import { auth } from "../../services/firebase";

export default function LoginPage() {
  // useState garde les valeurs saisies pendant que la page est affichée.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (loading) return;

    if (!email.trim() || !password) {
      setMessage("Remplis les deux champs.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // await attend la réponse de Firebase avant d'afficher le succès.
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setMessage("Connexion réussie ! Firebase a reconnu ton compte.");
      setPassword("");
    } catch (error) {
      // Si Firebase refuse la connexion, on affiche une explication.
      const code = error instanceof FirebaseError ? error.code : "";

      if (["auth/invalid-credential", "auth/user-not-found", "auth/wrong-password", "auth/invalid-email"].includes(code)) {
        setMessage("Adresse e-mail ou mot de passe incorrect.");
      } else if (code === "auth/network-request-failed") {
        setMessage("Connexion impossible. Vérifie ta connexion Internet.");
      } else if (code === "auth/too-many-requests") {
        setMessage("Trop de tentatives. Patiente avant de réessayer.");
      } else if (code === "auth/user-disabled") {
        setMessage("Ce compte a été désactivé.");
      } else {
        setMessage("Connexion impossible. Code : " + (code || "erreur inconnue"));
      }
    } finally {
      // Le bouton redevient disponible, que la connexion ait réussi ou non.
      setLoading(false);
    }
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
          editable={!loading}
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
          editable={!loading}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
          accessibilityState={{ disabled: loading, busy: loading }}
        >
          <Text style={styles.buttonText}>{loading ? "Connexion en cours…" : "Se connecter"}</Text>
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
