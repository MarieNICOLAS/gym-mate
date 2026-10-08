import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    color: "#171717",
    fontSize: 32,
    fontWeight: "700",
    alignContent: "center",
    textAlign: "center",
    paddingTop: 24,
    paddingBottom: 24,
    marginTop: 24,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 16,
    marginTop: 8,
    alignContent: "center",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#aac5e3",
    paddingVertical: 16,
    paddingHorizontal: 20,
    margin: 12,
    borderRadius: 8,
    alignContent: "center",
    textAlign: "center",
  },
  buttonsContainer: {
    flex: 1,
    width: "100%",
    // alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
    gap: 20,
    marginTop: 32,
  },

  inputGroup: {
    gap: 8,
  },

  label: {
    color: "#171717",
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    width: "100%",
    minHeight: 52,
    paddingHorizontal: 16,

    color: "#171717",
    fontSize: 16,

    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
  },
});
