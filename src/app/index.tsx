import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { useAuth } from "../context/authentication";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    const userName = mode === "signup" ? name.trim() : email.split("@")[0];
    login(email.trim(), userName);
    router.replace("/home");
  }

  return (
    <KeyboardAvoidingView
      style={styles.page}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.container, isMobile && styles.containerMobile]}>
          {/* LEFT SIDE — BRAND PANEL */}
          {!isMobile && (
            <View style={styles.brandPanel}>
              <View style={styles.logoRow}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoIcon}>⚡</Text>
                </View>
                <Text style={styles.brandText}>FlashLearn</Text>
              </View>

              <View style={styles.brandBody}>
                <Text style={styles.brandHeading}>
                  Learn smarter,{"\n"}not harder.
                </Text>
                <Text style={styles.brandSub}>
                  Interactive flashcards, quizzes and progress tracking — all in
                  one clean space.
                </Text>

                <View style={styles.featureList}>
                  <FeatureRow emoji="📖" text="Interactive flashcards" />
                  <FeatureRow emoji="🎯" text="Quiz with instant feedback" />
                  <FeatureRow emoji="🔥" text="Streak & XP tracking" />
                  <FeatureRow emoji="🏆" text="Mastery progress dashboard" />
                </View>
              </View>

              <Text style={styles.brandFooter}>
                © 2025 FlashLearn — Built with React Native + Expo
              </Text>
            </View>
          )}

          {/* RIGHT SIDE — FORM */}
          <View style={styles.formPanel}>
            {isMobile && (
              <View style={styles.logoRowMobile}>
                <View style={styles.logoCircle}>
                  <Text style={styles.logoIcon}>⚡</Text>
                </View>
                <Text style={styles.brandText}>FlashLearn</Text>
              </View>
            )}

            <Text style={styles.formEyebrow}>
              {mode === "login" ? "WELCOME BACK" : "CREATE ACCOUNT"}
            </Text>
            <Text style={styles.formTitle}>
              {mode === "login" ? "Sign in to continue" : "Start your journey"}
            </Text>
            <Text style={styles.formSub}>
              {mode === "login"
                ? "Enter your details to access your study deck."
                : "Sign up to save progress and track your learning."}
            </Text>

            {/* Mode toggle */}
            <View style={styles.toggle}>
              <Pressable
                onPress={() => setMode("login")}
                style={[styles.toggleBtn, mode === "login" && styles.toggleActive]}
              >
                <Text
                  style={[
                    styles.toggleText,
                    mode === "login" && styles.toggleTextActive,
                  ]}
                >
                  Login
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setMode("signup")}
                style={[styles.toggleBtn, mode === "signup" && styles.toggleActive]}
              >
                <Text
                  style={[
                    styles.toggleText,
                    mode === "signup" && styles.toggleTextActive,
                  ]}
                >
                  Sign Up
                </Text>
              </Pressable>
            </View>

            {/* Name */}
            {mode === "signup" && (
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>FULL NAME</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Aisha Sharma"
                  placeholderTextColor="#94A3B8"
                  style={styles.input}
                />
              </View>
            )}

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                placeholderTextColor="#94A3B8"
                secureTextEntry
                style={styles.input}
              />
            </View>

            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>⚠ {error}</Text>
              </View>
            ) : null}

            <Pressable style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitText}>
                {mode === "login" ? "Sign In →" : "Create Account →"}
              </Text>
            </Pressable>

            <Text style={styles.helperText}>
              {mode === "login"
                ? "New here? Tap Sign Up above."
                : "Already have an account? Tap Login above."}
            </Text>

            <Text style={styles.demoNote}>
              💡 Demo: any email + password (4+ chars) will work.
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FeatureRow({ emoji, text }: { emoji: string; text: string }) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.featureIconBox}>
        <Text style={styles.featureEmoji}>{emoji}</Text>
      </View>
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F7F8FC" },
  scroll: { flexGrow: 1 },
  container: {
    flex: 1,
    flexDirection: "row",
    minHeight: "100vh" as any,
  },
  containerMobile: { flexDirection: "column" },

  /* Brand Panel */
  brandPanel: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 48,
    justifyContent: "space-between",
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  logoRowMobile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 28,
  },
  logoCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: { fontSize: 20 },
  brandText: { color: "#FFFFFF", fontSize: 20, fontWeight: "800", letterSpacing: -0.4 },

  brandBody: { marginVertical: 40 },
  brandHeading: {
    color: "#FFFFFF",
    fontSize: 44,
    fontWeight: "800",
    lineHeight: 52,
    letterSpacing: -1,
  },
  brandSub: {
    color: "#94A3B8",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 16,
    maxWidth: 400,
  },
  featureList: { marginTop: 36, gap: 14 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  featureIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#1E293B",
    alignItems: "center",
    justifyContent: "center",
  },
  featureEmoji: { fontSize: 16 },
  featureText: { color: "#CBD5E1", fontSize: 14, fontWeight: "600" },

  brandFooter: { color: "#475569", fontSize: 12 },

  /* Form Panel */
  formPanel: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 48,
    justifyContent: "center",
    maxWidth: 560,
    alignSelf: "center",
    width: "100%",
  },

  formEyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
    color: "#4F46E5",
    marginBottom: 10,
  },
  formTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.6,
  },
  formSub: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 8,
    lineHeight: 22,
    marginBottom: 24,
  },

  toggle: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 4,
    marginBottom: 22,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: "center",
  },
  toggleActive: { backgroundColor: "#4F46E5" },
  toggleText: { fontSize: 13, fontWeight: "700", color: "#64748B" },
  toggleTextActive: { color: "#FFFFFF" },

  inputGroup: { marginBottom: 16 },
  inputLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 1.2,
    marginBottom: 7,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: "#0F172A",
    outlineStyle: "none" as any,
  },

  errorBox: {
    backgroundColor: "#FEE2E2",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  errorText: { color: "#B91C1C", fontSize: 13, fontWeight: "600" },

  submitBtn: {
    backgroundColor: "#4F46E5",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 8,
  },
  submitText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },

  helperText: {
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 14,
  },
  demoNote: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 14,
    fontStyle: "italic",
  },
});