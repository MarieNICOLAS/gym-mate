import { StyleSheet } from "react-native";
import { palette } from "../constants/palette";

// Quelques styles communs pour garder les mêmes couleurs et espacements.
export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    padding: 24,
    gap: 16,
    width: "100%",
    maxWidth: 440,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: palette.text,
    marginTop: 24,
  },
  text: {
    color: palette.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  label: {
    color: palette.text,
    fontSize: 16,
  },
  input: {
    backgroundColor: palette.surface,
    borderColor: palette.border,
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    color: palette.text,
    minHeight: 48,
  },
  button: {
    backgroundColor: palette.primary,
    borderRadius: 6,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: palette.text,
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    color: palette.link,
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 14,
    textDecorationLine: "underline",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: palette.primary,
  },
});
