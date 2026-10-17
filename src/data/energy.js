// Stored as 1–5 so check-ins logged before the labels existed still map.
export const ENERGY_LEVELS = [
  { value: 1, label: "Fatigued", color: "#8FA3B5" },
  { value: 2, label: "Low", color: "#8FB8DD" },
  { value: 3, label: "Fair", color: "#7FC2EC" },
  { value: 4, label: "Good", color: "#5A9BD4" },
  { value: 5, label: "Energized", color: "#3F7CB5" },
];

const byValue = (v) => ENERGY_LEVELS.find((e) => e.value === Math.round(v));

export const energyLabel = (v) => (byValue(v) || ENERGY_LEVELS[2]).label;
export const energyColor = (v) => (byValue(v) || ENERGY_LEVELS[2]).color;
