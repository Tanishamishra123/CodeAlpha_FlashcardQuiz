import { useRouter } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { useAuth } from "../context/authentication";
import { flashcards } from "../data/questions";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const totalCards = flashcards.length;
  const mastered = flashcards.filter((c) => c.mastered).length;
  const categories = Array.from(new Set(flashcards.map((c) => c.category)));

  const categoryData = categories.map((cat) => ({
    name: cat,
    count: flashcards.filter((c) => c.category === cat).length,
    mastered: flashcards.filter((c) => c.category === cat && c.mastered).length,
  }));

  const emojiMap: Record<string, string> = {
    "Web Development": "🌐",
    Python: "🐍",
    Aptitude: "🧠",
    Interview: "💼",
  };

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>⚡</Text>
          </View>
          <Text style={styles.logoText}>FlashLearn</Text>
        </View>
        <Pressable
          style={styles.profileBtn}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.profileInitial}>
            {user?.name?.[0]?.toUpperCase() || "U"}
          </Text>
        </Pressable>
      </View>

      {/* Welcome */}
      <View style={styles.welcome}>
        <Text style={styles.greeting}>Hey, {user?.name || "Learner"} 👋</Text>
        <Text style={styles.heading}>Ready to learn something new today?</Text>
        <Text style={styles.subheading}>
          A little practice every day compounds into mastery.
        </Text>
      </View>

      {/* Stats Row */}
      <View style={[styles.statsRow, isMobile && styles.statsRowMobile]}>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>📚</Text>
          <Text style={styles.statNumber}>{totalCards}</Text>
          <Text style={styles.statLabel}>TOTAL CARDS</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>✅</Text>
          <Text style={styles.statNumber}>{mastered}</Text>
          <Text style={styles.statLabel}>MASTERED</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statEmoji}>🎯</Text>
          <Text style={styles.statNumber}>
            {totalCards ? Math.round((mastered / totalCards) * 100) : 0}%
          </Text>
          <Text style={styles.statLabel}>ACCURACY</Text>
        </View>
      </View>

      {/* Hero CTA */}
      <View style={styles.hero}>
        <View style={styles.heroLeft}>
          <Text style={styles.heroEyebrow}>START TODAY</Text>
          <Text style={styles.heroTitle}>Jump into your deck</Text>
          <Text style={styles.heroSub}>
            Flashcards, quizzes, streak tracking — everything you need.
          </Text>
          <View style={styles.heroButtons}>
            <Pressable
              style={styles.heroPrimary}
              onPress={() => router.push("/explore")}
            >
              <Text style={styles.heroPrimaryText}>Start Studying →</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.heroEmoji}>📖</Text>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Your Subjects</Text>
      <Text style={styles.sectionSub}>Pick a topic and continue learning</Text>

      <View style={styles.grid}>
        {categoryData.map((cat) => (
          <Pressable
            key={cat.name}
            style={[styles.categoryCard, isMobile && styles.categoryCardMobile]}
            onPress={() => router.push("/explore")}
          >
            <View style={styles.categoryIconBox}>
              <Text style={styles.categoryEmoji}>
                {emojiMap[cat.name] || "📘"}
              </Text>
            </View>
            <Text style={styles.categoryName}>{cat.name}</Text>
            <Text style={styles.categoryCount}>
              {cat.count} cards • {cat.mastered} mastered
            </Text>
            <View style={styles.categoryProgressTrack}>
              <View
                style={[
                  styles.categoryProgressFill,
                  {
                    width: `${cat.count ? (cat.mastered / cat.count) * 100 : 0}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.categoryArrow}>Continue →</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.footer}>
        © 2025 FlashLearn — Made with 💜 by {user?.name || "you"}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F7F8FC" },
  content: {
    padding: 28,
    paddingBottom: 48,
    maxWidth: 1240,
    alignSelf: "center",
    width: "100%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  logoCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: { fontSize: 20 },
  logoText: { fontSize: 19, fontWeight: "800", color: "#0F172A", letterSpacing: -0.4 },
  profileBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#4F46E5",
  },
  profileInitial: { color: "#4F46E5", fontSize: 16, fontWeight: "800" },

  welcome: { marginBottom: 26 },
  greeting: { fontSize: 14, color: "#4F46E5", fontWeight: "700", marginBottom: 8 },
  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.6,
    lineHeight: 38,
  },
  subheading: { fontSize: 14, color: "#64748B", marginTop: 10, lineHeight: 22 },

  statsRow: { flexDirection: "row", gap: 14, marginBottom: 26 },
  statsRowMobile: { flexWrap: "wrap" },
  statCard: {
    flex: 1,
    minWidth: 120,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statEmoji: { fontSize: 22, marginBottom: 10 },
  statNumber: { fontSize: 26, fontWeight: "800", color: "#0F172A" },
  statLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1.2,
    marginTop: 4,
  },

  hero: {
    backgroundColor: "#4F46E5",
    borderRadius: 22,
    padding: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 34,
    overflow: "hidden",
  },
  heroLeft: { flex: 1 },
  heroEyebrow: {
    color: "#C7D2FE",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
    marginTop: 10,
    letterSpacing: -0.5,
  },
  heroSub: { color: "#E0E7FF", fontSize: 13, marginTop: 8, lineHeight: 20 },
  heroButtons: { marginTop: 20 },
  heroPrimary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 22,
    paddingVertical: 12,
    alignSelf: "flex-start",
  },
  heroPrimaryText: { color: "#4F46E5", fontSize: 13, fontWeight: "800" },
  heroEmoji: { fontSize: 70, marginLeft: 20 },

  sectionTitle: { fontSize: 20, fontWeight: "800", color: "#0F172A" },
  sectionSub: { fontSize: 13, color: "#64748B", marginTop: 5, marginBottom: 18 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  categoryCard: {
    width: "48%",
    flexGrow: 1,
    flexBasis: 240,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  categoryCardMobile: { width: "100%" },
  categoryIconBox: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  categoryEmoji: { fontSize: 22 },
  categoryName: { fontSize: 16, fontWeight: "800", color: "#0F172A" },
  categoryCount: { fontSize: 12, color: "#64748B", marginTop: 5 },
  categoryProgressTrack: {
    height: 5,
    backgroundColor: "#F1F5F9",
    borderRadius: 4,
    marginTop: 14,
    overflow: "hidden",
  },
  categoryProgressFill: { height: "100%", backgroundColor: "#4F46E5", borderRadius: 4 },
  categoryArrow: {
    color: "#4F46E5",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 12,
  },

  footer: {
    textAlign: "center",
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 40,
  },
});