import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
// Use a direct file import to avoid module-resolution issues in Expo projects.
const questions = require("../data/questions");

export default function QuizScreen() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = questions[current];
  const checked = selected !== null;
  const correct = selected === question.answer;

  function chooseOption(option: string) {
    if (checked) return;
    setSelected(option);
    if (option === question.answer) setScore((v) => v + 1);
  }

  function nextQuestion() {
    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }
    setCurrent((v) => v + 1);
    setSelected(null);
  }

  function restartQuiz() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  }

  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.content}>
      <View style={styles.top}>
        <Pressable onPress={() => router.push("/")}>
          <Text style={styles.back}>← Home</Text>
        </Pressable>
        <Text style={styles.brand}>✦ FlashLearn</Text>
      </View>

      {finished ? (
        <View style={styles.resultCard}>
          <Text style={styles.resultEmoji}>{score >= 4 ? "🎉" : "🌱"}</Text>
          <Text style={styles.eyebrow}>QUIZ COMPLETED</Text>
          <Text style={styles.title}>Nice work!</Text>
          <Text style={styles.score}>{score} / {questions.length}</Text>
          <Text style={styles.subtitle}>
            {score === questions.length
              ? "Perfect score! You got every answer right."
              : "Every attempt helps you learn. Keep practising!"}
          </Text>
          <Pressable style={styles.primaryButton} onPress={restartQuiz}>
            <Text style={styles.primaryText}>Try again ↻</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/")}>
            <Text style={styles.homeLink}>Back to home</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <Text style={styles.eyebrow}>QUICK PRACTICE</Text>
          <Text style={styles.title}>Test what you know</Text>
          <Text style={styles.subtitle}>Take your time. You’ve got this!</Text>

          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>QUESTION {current + 1} OF {questions.length}</Text>
            <Text style={styles.progressLabel}>{Math.round(((current + 1) / questions.length) * 100)}%</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${((current + 1) / questions.length) * 100}%` }]} />
          </View>

          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{question.question}</Text>
            <Text style={styles.instruction}>Choose one answer below</Text>

            {question.options.map((option: string, index: number) => {
              const isSelected = selected === option;
              const isAnswer = option === question.answer;
              let optionStyle = styles.option;
              if (checked && isAnswer) optionStyle = styles.correctOption;
              else if (checked && isSelected) optionStyle = styles.wrongOption;

              return (
                <Pressable key={option} onPress={() => chooseOption(option)} style={optionStyle}>
                  <View style={styles.optionRow}>
                    <View style={styles.letterCircle}>
                      <Text style={styles.letter}>{String.fromCharCode(65 + index)}</Text>
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                    {checked && isAnswer ? <Text style={styles.answerMark}>✓</Text> : null}
                    {checked && isSelected && !isAnswer ? <Text style={styles.wrongMark}>×</Text> : null}
                  </View>
                </Pressable>
              );
            })}

            {checked ? (
              <View style={styles.explanation}>
                <Text style={styles.explanationTitle}>
                  {correct ? "Correct answer! 🎉" : "Not quite — keep going 💜"}
                </Text>
                <Text style={styles.explanationText}>{question.explanation}</Text>
              </View>
            ) : null}

            <Pressable
              style={[styles.primaryButton, !checked && styles.disabledButton]}
              onPress={nextQuestion}
              disabled={!checked}
            >
              <Text style={styles.primaryText}>
                {current === questions.length - 1 ? "See my result →" : "Next question →"}
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#F8F7FC" },
  content: { padding: 25, paddingBottom: 45, width: "100%", maxWidth: 760, alignSelf: "center" },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 42 },
  back: { color: "#7558CA", fontSize: 13, fontWeight: "700" },
  brand: { color: "#302744", fontSize: 19, fontWeight: "800" },
  eyebrow: { color: "#8065D8", fontSize: 10, letterSpacing: 2, fontWeight: "800" },
  title: { color: "#302744", fontSize: 29, lineHeight: 38, fontWeight: "800", marginTop: 9 },
  subtitle: { color: "#918BA1", fontSize: 14, lineHeight: 22, marginTop: 8, marginBottom: 27 },
  progressHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  progressLabel: { color: "#817995", fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  progressTrack: { height: 7, borderRadius: 10, backgroundColor: "#EAE5F5", overflow: "hidden", marginBottom: 24 },
  progressFill: { height: "100%", backgroundColor: "#8065D8", borderRadius: 10 },
  questionCard: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 24, borderWidth: 1, borderColor: "#EEEAF5" },
  questionText: { color: "#302744", fontSize: 22, fontWeight: "800", lineHeight: 31, marginBottom: 8 },
  instruction: { color: "#918BA1", fontSize: 13, marginBottom: 22 },
  option: { borderWidth: 1, borderColor: "#E9E5F0", borderRadius: 14, padding: 13, marginBottom: 11, backgroundColor: "#FFFFFF" },
  correctOption: { borderWidth: 1, borderColor: "#65B78C", borderRadius: 14, padding: 13, marginBottom: 11, backgroundColor: "#ECF9F1" },
  wrongOption: { borderWidth: 1, borderColor: "#E7A1A1", borderRadius: 14, padding: 13, marginBottom: 11, backgroundColor: "#FFF0F0" },
  optionRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  letterCircle: { width: 32, height: 32, borderRadius: 10, backgroundColor: "#F1EDFA", alignItems: "center", justifyContent: "center" },
  letter: { color: "#6D50C2", fontWeight: "800", fontSize: 12 },
  optionText: { color: "#403951", fontSize: 13, flex: 1, lineHeight: 20 },
  answerMark: { color: "#25844F", fontSize: 20, fontWeight: "800" },
  wrongMark: { color: "#C34E4E", fontSize: 20, fontWeight: "800" },
  explanation: { backgroundColor: "#F4F0FF", borderRadius: 13, padding: 15, marginTop: 7, marginBottom: 17 },
  explanationTitle: { color: "#6245B4", fontWeight: "800", fontSize: 13, marginBottom: 5 },
  explanationText: { color: "#71668C", fontSize: 12, lineHeight: 19 },
  primaryButton: { backgroundColor: "#7558CA", padding: 15, alignItems: "center", justifyContent: "center", borderRadius: 13, marginTop: 12 },
  disabledButton: { backgroundColor: "#BEB3E2" },
  primaryText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  resultCard: { backgroundColor: "#FFFFFF", borderRadius: 24, padding: 30, alignItems: "center", borderWidth: 1, borderColor: "#EEEAF5", marginTop: 25 },
  resultEmoji: { fontSize: 55, marginBottom: 18 },
  score: { color: "#7558CA", fontSize: 45, fontWeight: "800", marginTop: 18 },
  homeLink: { color: "#7558CA", fontWeight: "700", marginTop: 22 },
});