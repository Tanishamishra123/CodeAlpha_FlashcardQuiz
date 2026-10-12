import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Animated,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { flashcards } from "../data/questions";

/* ============ THEME ============ */
const lightTheme = {
  bg: "#F7F8FC",
  surface: "#FFFFFF",
  surfaceAlt: "#F1F3F9",
  text: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  border: "#E2E8F0",
  primary: "#4F46E5",
  primarySoft: "#EEF2FF",
  accent: "#F59E0B",
  success: "#10B981",
  successSoft: "#D1FAE5",
  danger: "#EF4444",
  dangerSoft: "#FEE2E2",
  cardBg: "#4F46E5",
  shadow: "#0F172A",
};

const darkTheme = {
  bg: "#0B1020",
  surface: "#141A2E",
  surfaceAlt: "#1C2440",
  text: "#F1F5F9",
  textSecondary: "#CBD5E1",
  textMuted: "#64748B",
  border: "#1F2A44",
  primary: "#818CF8",
  primarySoft: "#1E2A55",
  accent: "#FBBF24",
  success: "#34D399",
  successSoft: "#064E3B",
  danger: "#F87171",
  dangerSoft: "#7F1D1D",
  cardBg: "#312E81",
  shadow: "#000000",
};

type Screen = "flashcards" | "quiz" | "results";

export default function ExploreScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 900;
  const isSmall = width < 500;

  const [darkMode, setDarkMode] = useState(false);
  const [screen, setScreen] = useState<Screen>("flashcards");
  const [cards, setCards] = useState(flashcards);

  const t = darkMode ? darkTheme : lightTheme;

  return (
    <ScrollView
      style={[styles.page, { backgroundColor: t.bg }]}
      contentContainerStyle={[styles.content, isMobile && styles.contentMobile]}
    >
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable
            onPress={() => router.replace("/home")}
            style={[
              styles.backBtn,
              { backgroundColor: t.surface, borderColor: t.border },
            ]}
          >
            <Text style={[styles.backBtnText, { color: t.text }]}>←</Text>
          </Pressable>
          <View style={styles.logoRow}>
            <View style={[styles.logoCircle, { backgroundColor: t.primary }]}>
              <Text style={styles.logoIcon}>⚡</Text>
            </View>
            <View>
              <Text style={[styles.logoText, { color: t.text }]}>FlashLearn</Text>
              {!isSmall && (
                <Text style={[styles.logoSub, { color: t.textMuted }]}>
                  SMART STUDY COMPANION
                </Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.headerRight}>
          {!isMobile && (
            <View
              style={[
                styles.modeToggle,
                { backgroundColor: t.surfaceAlt, borderColor: t.border },
              ]}
            >
              <Pressable
                onPress={() => setScreen("flashcards")}
                style={[
                  styles.modeBtn,
                  screen === "flashcards" && { backgroundColor: t.primary },
                ]}
              >
                <Text
                  style={[
                    styles.modeText,
                    {
                      color:
                        screen === "flashcards" ? "#FFFFFF" : t.textSecondary,
                    },
                  ]}
                >
                  📖 Flashcards
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setScreen("quiz")}
                style={[
                  styles.modeBtn,
                  screen === "quiz" && { backgroundColor: t.primary },
                ]}
              >
                <Text
                  style={[
                    styles.modeText,
                    { color: screen === "quiz" ? "#FFFFFF" : t.textSecondary },
                  ]}
                >
                  🎯 Quiz
                </Text>
              </Pressable>
            </View>
          )}
          <Pressable
            style={[
              styles.iconBtn,
              { backgroundColor: t.surface, borderColor: t.border },
            ]}
            onPress={() => setDarkMode(!darkMode)}
          >
            <Text style={styles.iconBtnText}>{darkMode ? "☀️" : "🌙"}</Text>
          </Pressable>
        </View>
      </View>

      {/* ===== MOBILE MODE TABS ===== */}
      {isMobile && (
        <View
          style={[
            styles.mobileTabs,
            { backgroundColor: t.surfaceAlt, borderColor: t.border },
          ]}
        >
          <Pressable
            onPress={() => setScreen("flashcards")}
            style={[
              styles.mobileTab,
              screen === "flashcards" && { backgroundColor: t.primary },
            ]}
          >
            <Text
              style={[
                styles.mobileTabText,
                { color: screen === "flashcards" ? "#FFF" : t.textSecondary },
              ]}
            >
              📖 Flashcards
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setScreen("quiz")}
            style={[
              styles.mobileTab,
              screen === "quiz" && { backgroundColor: t.primary },
            ]}
          >
            <Text
              style={[
                styles.mobileTabText,
                { color: screen === "quiz" ? "#FFF" : t.textSecondary },
              ]}
            >
              🎯 Quiz
            </Text>
          </Pressable>
        </View>
      )}

      {/* ===== PAGE TITLE ===== */}
      <View style={styles.pageTitle}>
        <Text style={[styles.pageEyebrow, { color: t.primary }]}>
          {screen === "quiz" ? "PRACTICE QUIZ" : "FLASHCARD DECK"}
        </Text>
        <Text style={[styles.pageHeading, { color: t.text }]}>
          {screen === "quiz"
            ? "Test what you know."
            : "Practice. Master. Repeat."}
        </Text>
        {!isMobile && (
          <Text style={[styles.pageSub, { color: t.textSecondary }]}>
            {screen === "quiz"
              ? "Answer questions and earn XP. Track your accuracy as you go."
              : "A clean space to revise concepts, one card at a time."}
          </Text>
        )}
      </View>

      {/* ===== MAIN ===== */}
      <View style={[styles.grid, isMobile && styles.gridColumn]}>
        {screen === "flashcards" && (
          <FlashcardsView cards={cards} setCards={setCards} t={t} isMobile={isMobile} />
        )}
        {screen === "quiz" && (
          <QuizView
            cards={cards}
            setCards={setCards}
            t={t}
            isMobile={isMobile}
            onFinish={() => setScreen("results")}
          />
        )}
        {screen === "results" && (
          <ResultsView
            cards={cards}
            t={t}
            isMobile={isMobile}
            onRestart={() => setScreen("quiz")}
            onHome={() => setScreen("flashcards")}
          />
        )}

        {screen !== "results" && (
          <StatsPanel cards={cards} t={t} isMobile={isMobile} />
        )}
      </View>
    </ScrollView>
  );
}

/* =================================================
   FLASHCARD VIEW
   ================================================= */
function FlashcardsView({
  cards,
  setCards,
  t,
  isMobile,
}: {
  cards: any[];
  setCards: (c: any[]) => void;
  t: typeof lightTheme;
  isMobile: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const card = cards[current];
  const total = cards.length;
  const masteredCount = cards.filter((c) => c.mastered).length;

  function nextCard() {
    if (current < total - 1) {
      setCurrent(current + 1);
      setRevealed(false);
    }
  }
  function prevCard() {
    if (current > 0) {
      setCurrent(current - 1);
      setRevealed(false);
    }
  }
  function markMastered() {
    setCards(cards.map((c) => (c.id === card.id ? { ...c, mastered: true } : c)));
    setRevealed(false);
    setTimeout(nextCard, 200);
  }
  function resetProgress() {
    setCards(cards.map((c) => ({ ...c, mastered: false })));
    setCurrent(0);
    setRevealed(false);
  }
  function shuffleCards() {
    setCards([...cards].sort(() => Math.random() - 0.5));
    setCurrent(0);
    setRevealed(false);
  }

  return (
    <View style={[styles.leftCol, isMobile && styles.fullWidth]}>
      <View
        style={[
          styles.toolbar,
          { backgroundColor: t.surface, borderColor: t.border },
        ]}
      >
        <Text style={[styles.toolbarLabel, { color: t.textMuted }]}>
          CARD {current + 1} / {total}
        </Text>
        <Pressable
          style={[
            styles.shuffleBtn,
            { borderColor: t.border, backgroundColor: t.surfaceAlt },
          ]}
          onPress={shuffleCards}
        >
          <Text style={[styles.shuffleIcon, { color: t.text }]}>⇄</Text>
          {!isMobile && (
            <Text style={[styles.shuffleText, { color: t.text }]}>Shuffle</Text>
          )}
        </Pressable>
      </View>

      <Pressable
        style={[
          styles.card,
          isMobile && styles.cardMobile,
          { backgroundColor: t.cardBg, shadowColor: t.shadow },
        ]}
        onPress={() => setRevealed(!revealed)}
      >
        <View style={styles.cardTop}>
          <View
            style={[
              styles.categoryBadge,
              { backgroundColor: "rgba(255,255,255,0.2)" },
            ]}
          >
            <Text style={styles.categoryText}>{card.category}</Text>
          </View>
          {card.mastered && (
            <View style={styles.masteredBadge}>
              <Text style={styles.masteredText}>✓ MASTERED</Text>
            </View>
          )}
        </View>

        <View style={styles.cardCenter}>
          <Text style={[styles.questionText, isMobile && styles.questionTextMobile]}>
            {revealed ? card.answer : card.question}
          </Text>
          {!revealed && (
            <View style={styles.hintPill}>
              <Text style={styles.hintText}>Tap to reveal answer</Text>
            </View>
          )}
        </View>

        <View style={styles.cardBottom}>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${((current + 1) / total) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {current + 1} / {total}
          </Text>
        </View>
      </Pressable>

      <View style={styles.actionRow}>
        <Pressable
          style={[styles.primaryAction, { backgroundColor: t.accent }]}
          onPress={markMastered}
        >
          <Text style={styles.primaryActionIcon}>✓</Text>
          <Text style={styles.primaryActionText}>
            {isMobile ? "Know" : "I Know This"}
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.secondaryAction,
            { borderColor: t.border, backgroundColor: t.surface },
          ]}
          onPress={resetProgress}
        >
          <Text style={[styles.secondaryActionIcon, { color: t.text }]}>↻</Text>
          {!isMobile && (
            <Text style={[styles.secondaryActionText, { color: t.text }]}>
              Reset
            </Text>
          )}
        </Pressable>
        <Pressable
          style={[styles.nextCircle, { backgroundColor: t.text }]}
          onPress={nextCard}
        >
          <Text style={[styles.nextCircleIcon, { color: t.bg }]}>↓</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.bottomNav,
          { backgroundColor: t.surface, borderColor: t.border },
        ]}
      >
        <Pressable
          style={[
            styles.navBtn,
            { borderColor: t.border },
            current === 0 && styles.navDisabled,
          ]}
          onPress={prevCard}
          disabled={current === 0}
        >
          <Text style={[styles.navBtnText, { color: t.text }]}>
            ← {!isMobile && "Previous"}
          </Text>
        </Pressable>
        <Text style={[styles.navInfo, { color: t.textMuted }]}>
          {masteredCount} mastered
        </Text>
        <Pressable
          style={[
            styles.navBtn,
            { borderColor: t.border },
            current === total - 1 && styles.navDisabled,
          ]}
          onPress={nextCard}
          disabled={current === total - 1}
        >
          <Text style={[styles.navBtnText, { color: t.text }]}>
            {!isMobile && "Next"} →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/* =================================================
   QUIZ VIEW
   ================================================= */
function QuizView({
  cards,
  setCards,
  t,
  isMobile,
  onFinish,
}: {
  cards: any[];
  setCards: (c: any[]) => void;
  t: typeof lightTheme;
  isMobile: boolean;
  onFinish: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const shakeAnim = React.useRef(new Animated.Value(0)).current;

  const card = cards[index];
  const total = cards.length;
  const answered = selected !== null;
  const isCorrect = selected === card.correctOption;

  function choose(optionIndex: number) {
    if (answered) return;
    setSelected(optionIndex);
    setShowFeedback(true);

    if (optionIndex === card.correctOption) {
      setScore(score + 1);
      setStreak(streak + 1);
      setBestStreak(Math.max(bestStreak, streak + 1));
      setXp(xp + 10 + streak * 2);
    } else {
      setStreak(0);
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
    }
  }

  function next() {
    if (index < total - 1) {
      setIndex(index + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      onFinish();
    }
  }

  return (
    <View style={[styles.leftCol, isMobile && styles.fullWidth]}>
      <View style={styles.quizTopBar}>
        <View
          style={[
            styles.quizStatPill,
            { backgroundColor: t.surface, borderColor: t.border },
          ]}
        >
          <Text style={styles.quizStatEmoji}>🎯</Text>
          <View>
            <Text style={[styles.quizStatLabel, { color: t.textMuted }]}>SCORE</Text>
            <Text style={[styles.quizStatValue, { color: t.text }]}>
              {score}/{total}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.quizStatPill,
            { backgroundColor: t.surface, borderColor: t.border },
          ]}
        >
          <Text style={styles.quizStatEmoji}>🔥</Text>
          <View>
            <Text style={[styles.quizStatLabel, { color: t.textMuted }]}>STREAK</Text>
            <Text style={[styles.quizStatValue, { color: t.text }]}>{streak}</Text>
          </View>
        </View>
        <View
          style={[
            styles.quizStatPill,
            { backgroundColor: t.surface, borderColor: t.border },
          ]}
        >
          <Text style={styles.quizStatEmoji}>⚡</Text>
          <View>
            <Text style={[styles.quizStatLabel, { color: t.textMuted }]}>XP</Text>
            <Text style={[styles.quizStatValue, { color: t.text }]}>{xp}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.quizProgress, { backgroundColor: t.surfaceAlt }]}>
        <View
          style={[
            styles.quizProgressFill,
            {
              backgroundColor: t.primary,
              width: `${((index + 1) / total) * 100}%`,
            },
          ]}
        />
      </View>

      <Animated.View
        style={[
          styles.quizCard,
          { backgroundColor: t.surface, borderColor: t.border },
          { transform: [{ translateX: shakeAnim }] },
        ]}
      >
        <View
          style={[styles.quizCategoryBadge, { backgroundColor: t.primarySoft }]}
        >
          <Text style={[styles.quizCategoryText, { color: t.primary }]}>
            {card.category}
          </Text>
        </View>

        <Text
          style={[
            styles.quizQuestion,
            isMobile && styles.quizQuestionMobile,
            { color: t.text },
          ]}
        >
          {card.question}
        </Text>

        <Text style={[styles.quizInstruction, { color: t.textMuted }]}>
          Choose the correct answer
        </Text>

        <View style={styles.optionsList}>
          {card.options.map((option: string, i: number) => {
            const isSelected = selected === i;
            const isRight = i === card.correctOption;
            const showCorrect = answered && isRight;
            const showWrong = answered && isSelected && !isRight;

            let bg = t.surface;
            let border = t.border;
            let textColor = t.text;
            let letterBg = t.surfaceAlt;
            let letterColor = t.textSecondary;

            if (showCorrect) {
              bg = t.successSoft;
              border = t.success;
              textColor = t.success;
              letterBg = t.success;
              letterColor = "#FFFFFF";
            } else if (showWrong) {
              bg = t.dangerSoft;
              border = t.danger;
              textColor = t.danger;
              letterBg = t.danger;
              letterColor = "#FFFFFF";
            }

            return (
              <Pressable
                key={i}
                onPress={() => choose(i)}
                disabled={answered}
                style={[
                  styles.option,
                  { backgroundColor: bg, borderColor: border },
                  showCorrect && { borderWidth: 2 },
                  showWrong && { borderWidth: 2 },
                ]}
              >
                <View style={[styles.optionLetter, { backgroundColor: letterBg }]}>
                  <Text style={[styles.optionLetterText, { color: letterColor }]}>
                    {String.fromCharCode(65 + i)}
                  </Text>
                </View>
                <Text style={[styles.optionText, { color: textColor }]}>
                  {option}
                </Text>
                {showCorrect && <Text style={styles.optionMark}>✓</Text>}
                {showWrong && <Text style={styles.optionMark}>✕</Text>}
              </Pressable>
            );
          })}
        </View>

        {showFeedback && (
          <View
            style={[
              styles.feedbackBox,
              {
                backgroundColor: isCorrect ? t.successSoft : t.dangerSoft,
                borderColor: isCorrect ? t.success : t.danger,
              },
            ]}
          >
            <Text style={styles.feedbackEmoji}>{isCorrect ? "🎉" : "💡"}</Text>
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.feedbackTitle,
                  { color: isCorrect ? t.success : t.danger },
                ]}
              >
                {isCorrect ? `Correct! +${10 + (streak - 1) * 2} XP` : "Not quite"}
              </Text>
              <Text style={[styles.feedbackText, { color: t.textSecondary }]}>
                {card.answer}
              </Text>
            </View>
          </View>
        )}

        {answered && (
          <Pressable
            style={[styles.quizNextBtn, { backgroundColor: t.primary }]}
            onPress={next}
          >
            <Text style={styles.quizNextText}>
              {index === total - 1 ? "See Results →" : "Next Question →"}
            </Text>
          </Pressable>
        )}
      </Animated.View>
    </View>
  );
}

/* =================================================
   RESULTS VIEW
   ================================================= */
function ResultsView({
  cards,
  t,
  isMobile,
  onRestart,
  onHome,
}: {
  cards: any[];
  t: typeof lightTheme;
  isMobile: boolean;
  onRestart: () => void;
  onHome: () => void;
}) {
  const total = cards.length;
  const mastered = cards.filter((c) => c.mastered).length;
  const accuracy = Math.round((mastered / total) * 100);

  return (
    <View style={[styles.fullWidth, { alignItems: "center" }]}>
      <View
        style={[
          styles.resultsCard,
          { backgroundColor: t.surface, borderColor: t.border },
        ]}
      >
        <View style={[styles.trophyCircle, { backgroundColor: t.primarySoft }]}>
          <Text style={styles.trophyEmoji}>🏆</Text>
        </View>

        <Text style={[styles.resultsEyebrow, { color: t.primary }]}>
          SESSION COMPLETE
        </Text>
        <Text style={[styles.resultsTitle, { color: t.text }]}>Great work!</Text>
        <Text style={[styles.resultsSub, { color: t.textSecondary }]}>
          You've reviewed all {total} cards in this session.
        </Text>

        <View style={styles.resultsStats}>
          <View
            style={[
              styles.resultStatBox,
              { backgroundColor: t.primarySoft, borderColor: t.border },
            ]}
          >
            <Text style={styles.resultEmoji}>🎯</Text>
            <Text style={[styles.resultValue, { color: t.text }]}>{accuracy}%</Text>
            <Text style={[styles.resultLabel, { color: t.textMuted }]}>MASTERY</Text>
          </View>
          <View
            style={[
              styles.resultStatBox,
              { backgroundColor: t.primarySoft, borderColor: t.border },
            ]}
          >
            <Text style={styles.resultEmoji}>✅</Text>
            <Text style={[styles.resultValue, { color: t.text }]}>{mastered}</Text>
            <Text style={[styles.resultLabel, { color: t.textMuted }]}>MASTERED</Text>
          </View>
          <View
            style={[
              styles.resultStatBox,
              { backgroundColor: t.primarySoft, borderColor: t.border },
            ]}
          >
            <Text style={styles.resultEmoji}>📚</Text>
            <Text style={[styles.resultValue, { color: t.text }]}>{total}</Text>
            <Text style={[styles.resultLabel, { color: t.textMuted }]}>TOTAL</Text>
          </View>
        </View>

        <View style={styles.resultsActions}>
          <Pressable
            style={[styles.resultsPrimaryBtn, { backgroundColor: t.primary }]}
            onPress={onRestart}
          >
            <Text style={styles.resultsPrimaryText}>Practice Again ↻</Text>
          </Pressable>
          <Pressable
            style={[
              styles.resultsSecondaryBtn,
              { borderColor: t.border, backgroundColor: t.surfaceAlt },
            ]}
            onPress={onHome}
          >
            <Text style={[styles.resultsSecondaryText, { color: t.text }]}>
              Back to Flashcards
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/* =================================================
   STATS PANEL
   ================================================= */
function StatsPanel({
  cards,
  t,
  isMobile,
}: {
  cards: any[];
  t: typeof lightTheme;
  isMobile: boolean;
}) {
  const total = cards.length;
  const mastered = cards.filter((c) => c.mastered).length;
  const notStarted = total - mastered;
  const accuracy = total ? Math.round((mastered / total) * 100) : 0;

  return (
    <View style={[styles.rightCol, isMobile && styles.fullWidth]}>
      <View
        style={[
          styles.statPanel,
          { backgroundColor: t.surface, borderColor: t.border },
        ]}
      >
        <Text style={[styles.panelTitle, { color: t.text }]}>Study Statistics</Text>

        <View
          style={[
            styles.masteryBox,
            { backgroundColor: t.primarySoft, borderColor: t.border },
          ]}
        >
          <View style={styles.masteryRow}>
            <View>
              <Text style={[styles.masteryLabel, { color: t.primary }]}>MASTERY</Text>
              <Text style={[styles.masteryValue, { color: t.text }]}>{accuracy}%</Text>
            </View>
            <Text style={styles.masteryEmoji}>🎯</Text>
          </View>
          <View style={[styles.masteryTrack, { backgroundColor: t.surface }]}>
            <View
              style={[
                styles.masteryFill,
                { width: `${accuracy}%`, backgroundColor: t.primary },
              ]}
            />
          </View>
        </View>

        <StatRow label="Total Cards" value={total} color="#6366F1" icon="🗂" theme={t} />
        <StatRow label="Mastered" value={mastered} color="#10B981" icon="✓" theme={t} />
        <StatRow label="Not Started" value={notStarted} color="#94A3B8" icon="○" theme={t} />
      </View>

      {!isMobile && (
        <View
          style={[
            styles.tipCard,
            { backgroundColor: t.surface, borderColor: t.border },
          ]}
        >
          <Text style={styles.tipEmoji}>💡</Text>
          <Text style={[styles.tipTitle, { color: t.text }]}>Pro Tip</Text>
          <Text style={[styles.tipText, { color: t.textSecondary }]}>
            Switch to Quiz mode to test yourself. Each correct answer earns XP and
            builds your streak!
          </Text>
        </View>
      )}
    </View>
  );
}

function StatRow({
  label,
  value,
  color,
  icon,
  theme,
}: {
  label: string;
  value: number;
  color: string;
  icon: string;
  theme: typeof lightTheme;
}) {
  return (
    <View
      style={[
        styles.statRow,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={[styles.statBar, { backgroundColor: color }]} />
      <View style={styles.statInfo}>
        <Text style={[styles.statLabel, { color: theme.textMuted }]}>{label}</Text>
        <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
      </View>
      <View style={[styles.statIconBox, { backgroundColor: color + "22" }]}>
        <Text style={[styles.statIcon, { color }]}>{icon}</Text>
      </View>
    </View>
  );
}

/* =================================================
   STYLES
   ================================================= */
const styles = StyleSheet.create({
  page: { flex: 1 },
  content: {
    padding: 28,
    paddingBottom: 48,
    maxWidth: 1240,
    alignSelf: "center",
    width: "100%",
  },
  contentMobile: { padding: 14, paddingBottom: 32 },

  /* Header */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
    flexWrap: "wrap",
    gap: 10,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtnText: { fontSize: 16, fontWeight: "800" },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  logoCircle: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: { fontSize: 20 },
  logoText: { fontSize: 19, fontWeight: "800", letterSpacing: -0.4 },
  logoSub: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 1.4,
    marginTop: 2,
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 10 },
  modeToggle: {
    flexDirection: "row",
    borderRadius: 10,
    padding: 3,
    borderWidth: 1,
  },
  modeBtn: { borderRadius: 8, paddingHorizontal: 14, paddingVertical: 6 },
  modeText: { fontSize: 12, fontWeight: "700" },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnText: { fontSize: 16 },

  /* Mobile tabs */
  mobileTabs: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 4,
    marginBottom: 18,
    borderWidth: 1,
    gap: 4,
  },
  mobileTab: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  mobileTabText: { fontSize: 13, fontWeight: "700" },

  /* Page title */
  pageTitle: { marginBottom: 22 },
  pageEyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginBottom: 8,
  },
  pageHeading: { fontSize: 28, fontWeight: "800", letterSpacing: -0.6 },
  pageSub: { fontSize: 14, marginTop: 8, lineHeight: 22 },

  /* Grid */
  grid: { flexDirection: "row", gap: 22 },
  gridColumn: { flexDirection: "column" },
  leftCol: { flex: 2 },
  rightCol: { flex: 1, gap: 16 },
  fullWidth: { width: "100%" },

  /* Toolbar */
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    marginBottom: 14,
  },
  toolbarLabel: { fontSize: 11, fontWeight: "800", letterSpacing: 1 },
  shuffleBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  shuffleIcon: { fontSize: 14, fontWeight: "800" },
  shuffleText: { fontSize: 12, fontWeight: "700" },

  /* Flashcard */
  card: {
    borderRadius: 22,
    padding: 26,
    minHeight: 340,
    justifyContent: "space-between",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
  },
  cardMobile: { minHeight: 280, padding: 20 },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  categoryBadge: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  categoryText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  masteredBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  masteredText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  cardCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  questionText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 34,
    letterSpacing: -0.4,
    paddingHorizontal: 10,
  },
  questionTextMobile: { fontSize: 20, lineHeight: 28 },
  hintPill: {
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  hintText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.4,
  },
  cardBottom: { flexDirection: "row", alignItems: "center", gap: 12 },
  progressTrack: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#FFFFFF", borderRadius: 4 },
  progressText: { fontSize: 11, fontWeight: "800", color: "#FFFFFF" },

  /* Action row */
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
    flexWrap: "wrap",
  },
  primaryAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  primaryActionIcon: { fontSize: 13, fontWeight: "900", color: "#1F1B14" },
  primaryActionText: { fontSize: 13, fontWeight: "800", color: "#1F1B14" },
  secondaryAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  secondaryActionIcon: { fontSize: 14, fontWeight: "800" },
  secondaryActionText: { fontSize: 13, fontWeight: "700" },
  nextCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  nextCircleIcon: { fontSize: 18, fontWeight: "900" },

  /* Bottom nav */
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  navBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
    minWidth: 44,
    alignItems: "center",
  },
  navDisabled: { opacity: 0.35 },
  navBtnText: { fontSize: 12, fontWeight: "700" },
  navInfo: { fontSize: 12, fontWeight: "700" },

  /* QUIZ */
  quizTopBar: { flexDirection: "row", gap: 10, marginBottom: 14 },
  quizStatPill: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  quizStatEmoji: { fontSize: 20 },
  quizStatLabel: { fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  quizStatValue: { fontSize: 16, fontWeight: "800", marginTop: 2 },
  quizProgress: {
    height: 6,
    borderRadius: 6,
    marginBottom: 16,
    overflow: "hidden",
  },
  quizProgressFill: { height: "100%", borderRadius: 6 },

  quizCard: {
    borderRadius: 22,
    padding: 26,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  quizCategoryBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
  },
  quizCategoryText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  quizQuestion: {
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  quizQuestionMobile: { fontSize: 18, lineHeight: 26 },
  quizInstruction: { fontSize: 12, fontWeight: "600", marginTop: 10, marginBottom: 20 },
  optionsList: { gap: 10 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  optionLetterText: { fontSize: 13, fontWeight: "800" },
  optionText: { flex: 1, fontSize: 14, fontWeight: "600", lineHeight: 20 },
  optionMark: { fontSize: 18, fontWeight: "900" },

  feedbackBox: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 18,
  },
  feedbackEmoji: { fontSize: 22 },
  feedbackTitle: { fontSize: 14, fontWeight: "800", marginBottom: 4 },
  feedbackText: { fontSize: 12, lineHeight: 18 },

  quizNextBtn: {
    marginTop: 18,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  quizNextText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },

  /* RESULTS */
  resultsCard: {
    borderRadius: 22,
    padding: 32,
    borderWidth: 1,
    alignItems: "center",
    maxWidth: 600,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 6,
  },
  trophyCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  trophyEmoji: { fontSize: 48 },
  resultsEyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.8,
    marginBottom: 6,
  },
  resultsTitle: { fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  resultsSub: { fontSize: 14, marginTop: 8, textAlign: "center", lineHeight: 22 },
  resultsStats: { flexDirection: "row", gap: 12, marginTop: 26, width: "100%" },
  resultStatBox: {
    flex: 1,
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
  },
  resultEmoji: { fontSize: 22, marginBottom: 6 },
  resultValue: { fontSize: 22, fontWeight: "800" },
  resultLabel: { fontSize: 9, fontWeight: "800", letterSpacing: 1, marginTop: 4 },
  resultsActions: { marginTop: 26, width: "100%", gap: 10 },
  resultsPrimaryBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  resultsPrimaryText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  resultsSecondaryBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  resultsSecondaryText: { fontSize: 14, fontWeight: "700" },

  /* Stats panel */
  statPanel: { borderRadius: 16, padding: 16, borderWidth: 1 },
  panelTitle: {
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 14,
    letterSpacing: -0.2,
  },
  masteryBox: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  masteryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  masteryLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 1.5 },
  masteryValue: { fontSize: 24, fontWeight: "800", marginTop: 2 },
  masteryEmoji: { fontSize: 26 },
  masteryTrack: { height: 6, borderRadius: 6, overflow: "hidden" },
  masteryFill: { height: "100%", borderRadius: 6 },

  statRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
    borderWidth: 1,
  },
  statBar: { width: 4, alignSelf: "stretch" },
  statInfo: { flex: 1, paddingHorizontal: 12, paddingVertical: 11 },
  statLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 3,
    textTransform: "uppercase",
  },
  statValue: { fontSize: 20, fontWeight: "800" },
  statIconBox: {
    width: 46,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  statIcon: { fontSize: 18, fontWeight: "800" },

  /* Tip */
  tipCard: { borderRadius: 16, padding: 16, borderWidth: 1 },
  tipEmoji: { fontSize: 22, marginBottom: 6 },
  tipTitle: { fontSize: 13, fontWeight: "800", marginBottom: 4 },
  tipText: { fontSize: 12, lineHeight: 19 },
});