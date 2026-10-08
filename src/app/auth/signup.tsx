import { Link } from "expo-router";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
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

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  async function handleSignup() {
    if (loading || accountCreated) return;

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

    setLoading(true);
    setMessage("");

    try {
      // Firebase crée le compte et connecte automatiquement cet utilisateur.
      const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
      setAccountCreated(true);
      setPassword("");

      try {
        // Le prénom est enregistré dans Authentication, pas encore dans Firestore.
        await updateProfile(result.user, { displayName: name.trim() });
        setMessage("Compte créé ! Tu es maintenant connecté à Firebase.");
      } catch {
        // Le compte existe même si l'enregistrement du prénom échoue.
        setMessage("Ton compte est créé et connecté, mais le prénom n’a pas pu être enregistré. Ne recrée pas le compte.");
      }
    } catch (error) {
      const code = error instanceof FirebaseError ? error.code : "";

      if (code === "auth/email-already-in-use") {
        setMessage("Cette adresse e-mail est déjà utilisée. Utilise la page Connexion.");
      } else if (code === "auth/invalid-email") {
        setMessage("Saisis une adresse e-mail valide.");
      } else if (code === "auth/weak-password" || code === "auth/password-does-not-meet-requirements") {
        setMessage("Ce mot de passe est trop faible. Choisis-en un plus long avec des majuscules, minuscules, chiffres et caractères spéciaux.");
      } else if (code === "auth/network-request-failed") {
        setMessage("Inscription impossible. Vérifie ta connexion Internet.");
      } else if (code === "auth/too-many-requests") {
        setMessage("Trop de tentatives. Patiente avant de réessayer.");
      } else {
        setMessage("Inscription impossible. Code : " + (code || "erreur inconnue"));
      }
    } finally {
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
        <Text style={styles.title}>Inscription</Text>

        <Text style={styles.label}>Prénom</Text>
        <TextInput
          accessibilityLabel="Prénom"
          style={styles.input}
          value={name}
          editable={!loading && !accountCreated}
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
          editable={!loading && !accountCreated}
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
          editable={!loading && !accountCreated}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable
          accessibilityRole="button"
          style={styles.button}
          onPress={handleSignup}
          disabled={loading || accountCreated}
          accessibilityState={{ disabled: loading || accountCreated, busy: loading }}
        >
          <Text style={styles.buttonText}>
            {loading ? "Inscription en cours…" : accountCreated ? "Compte créé" : "S’inscrire"}
          </Text>
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
