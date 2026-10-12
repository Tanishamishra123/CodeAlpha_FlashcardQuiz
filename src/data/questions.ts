export type Flashcard = {
  id: number;
  category: string;
  question: string;
  answer: string;
  options: string[];
  correctOption: number;
  mastered: boolean;
};

export const flashcards: Flashcard[] = [
  {
    id: 1,
    category: "Web Development",
    question: "What does HTML stand for?",
    answer: "HyperText Markup Language — the standard markup language for creating web pages.",
    options: [
      "HyperText Markup Language",
      "High Level Machine Language",
      "Home Tool Markup Language",
      "Hyperlink Text Making Language",
    ],
    correctOption: 0,
    mastered: false,
  },
  {
    id: 2,
    category: "Python",
    question: "What is a Python list?",
    answer: "An ordered, mutable collection written inside square brackets, e.g. [1, 2, 3].",
    options: [
      "An immutable sequence",
      "An ordered, mutable collection",
      "A key-value store",
      "A function type",
    ],
    correctOption: 1,
    mastered: true,
  },
  {
    id: 3,
    category: "Web Development",
    question: "What does CSS stand for?",
    answer: "Cascading Style Sheets — controls how HTML elements are displayed.",
    options: [
      "Computer Style System",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets",
    ],
    correctOption: 2,
    mastered: false,
  },
  {
    id: 4,
    category: "Aptitude",
    question: "What is the next number: 2, 4, 8, 16, ?",
    answer: "32 — each term is multiplied by 2.",
    options: ["20", "24", "32", "48"],
    correctOption: 2,
    mastered: false,
  },
  {
    id: 5,
    category: "Interview",
    question: "How long should 'Tell me about yourself' be?",
    answer: "60–90 seconds — a brief summary of background, key skills, and interest.",
    options: ["10–20 seconds", "60–90 seconds", "3–5 minutes", "As long as possible"],
    correctOption: 1,
    mastered: false,
  },
  {
    id: 6,
    category: "Python",
    question: "Which keyword defines a function in Python?",
    answer: "The 'def' keyword, e.g. def greet(): print('Hello').",
    options: ["function", "define", "def", "fun"],
    correctOption: 2,
    mastered: false,
  },
  {
    id: 7,
    category: "Web Development",
    question: "Which HTML tag creates a hyperlink?",
    answer: "The anchor tag <a>, e.g. <a href='url'>Click</a>.",
    options: ["<link>", "<a>", "<href>", "<url>"],
    correctOption: 1,
    mastered: false,
  },
  {
    id: 8,
    category: "Aptitude",
    question: "What is 15% of 200?",
    answer: "30 — (15/100) × 200 = 30.",
    options: ["15", "25", "30", "45"],
    correctOption: 2,
    mastered: false,
  },
  {
    id: 9,
    category: "Interview",
    question: "What is the STAR method used for?",
    answer: "Answering behavioral questions: Situation, Task, Action, Result.",
    options: [
      "Coding algorithms",
      "Designing UI",
      "Answering behavioral questions",
      "Debugging code",
    ],
    correctOption: 2,
    mastered: false,
  },
  {
    id: 10,
    category: "Python",
    question: "What is the difference between list and tuple?",
    answer: "Lists are mutable; tuples are immutable.",
    options: [
      "No difference",
      "Lists are mutable, tuples are immutable",
      "Tuples are faster to write",
      "Lists only hold numbers",
    ],
    correctOption: 1,
    mastered: false,
  },
];