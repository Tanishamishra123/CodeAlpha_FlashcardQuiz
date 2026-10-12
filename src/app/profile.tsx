import { useRouter } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useAuth } from "../context/authentication";
import { flashcards } from "../data/questions";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const total = flashcards.length;
  const mastered = flashcards.filter((c) => c.mastered).length;
  const accuracy = total ? Math.round((mastered / total) * 100) : 0;

  function handleLogout() {
    logout();
    router.replace("/");
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <Pressable style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name || "Learner"}</Text>
        <Text style={styles.email}>{user?.email || "user@example.com"}</Text>

        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>🎯 Active Learner</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <StatCard label="Total Cards" value={total} icon="📚" />
        <StatCard label="Mastered" value={mastered} icon="✅" />
        <StatCard label="Accuracy" value={`${accuracy}%`} icon="🎯" />
        <StatCard label="Streak" value="3 days" icon="🔥" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Pressable style={styles.row}>
          <Text style={styles.rowLabel}>Edit Profile</Text>
          <Text style={styles.rowArrow}>→</Text>
        </Pressable>
        <Pressable style={styles.row}>
          <Text style={styles.rowLabel}>Notification Settings</Text>
          <Text style={styles.rowArrow}>→</Text>
        </Pressable>
        <Pressable style={styles.row}>
          <Text style={styles.rowLabel}>Help & Support</Text>
          <Text style={styles.rowArrow}>→</Text>
        </Pressable>
      </View>

      <Pressable style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <Text style={styles.version}>FlashLearn v1.0.0</Text>
    </ScrollView>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F7F8FC" },
  content: {
    padding: 28,
    paddingBottom: 48,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },

  backBtn: { alignSelf: "flex-start", marginBottom: 20 },
  backText: { color: "#4F46E5", fontSize: 13, fontWeight: "700" },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 20,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarText: { color: "#FFFFFF", fontSize: 32, fontWeight: "800" },
  name: { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  email: { fontSize: 13, color: "#64748B", marginTop: 5 },
  badgeRow: { marginTop: 14 },
  badge: {
    backgroundColor: "#EEF2FF",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badgeText: { color: "#4F46E5", fontSize: 11, fontWeight: "800" },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: 130,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statIcon: { fontSize: 20, marginBottom: 10 },
  statValue: { fontSize: 22, fontWeight: "800", color: "#0F172A" },
  statLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1,
    marginTop: 4,
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1.2,
    padding: 16,
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  rowLabel: { fontSize: 14, fontWeight: "600", color: "#0F172A" },
  rowArrow: { color: "#94A3B8", fontSize: 16 },

  logoutBtn: {
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  logoutText: { color: "#B91C1C", fontSize: 14, fontWeight: "800" },

  version: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 24,
  },
});