export const SENSATIONS = [
  { name: "Heavy", score: 1, color: "#8FA3B5" },
  { name: "Exhausted", score: 1, color: "#8FA3B5" },
  { name: "Tense", score: 2, color: "#4A7BA5" },
  { name: "Foggy", score: 2, color: "#4A7BA5" },
  { name: "Tight", score: 3, color: "#8FB8DD" },
  { name: "Restless", score: 3, color: "#8FB8DD" },
  { name: "Light", score: 4, color: "#5A9BD4" },
  { name: "Warm", score: 4, color: "#5A9BD4" },
  { name: "Relaxed", score: 5, color: "#7FC2EC" },
  { name: "Grounded", score: 5, color: "#7FC2EC" },
];

export const sensationScore = (name) =>
  (SENSATIONS.find((s) => s.name === name) || { score: 3 }).score;

export const sensationColor = (name) =>
  (SENSATIONS.find((s) => s.name === name) || { color: "#8FB8DD" }).color;
