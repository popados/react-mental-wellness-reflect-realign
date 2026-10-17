export const INTENSITY_BANDS = [
  { min: 0, max: 0, label: "Not there", anchor: "The feeling isn’t present", color: "#8FA3B5" },
  { min: 1, max: 2, label: "Barely there", anchor: "Only if I go looking for it", color: "#8FB8DD" },
  { min: 3, max: 4, label: "Mild", anchor: "Present, easy to set aside", color: "#7FC2EC" },
  { min: 5, max: 6, label: "Moderate", anchor: "Clearly there, I can work around it", color: "#5A9BD4" },
  { min: 7, max: 8, label: "Strong", anchor: "Hard to think past", color: "#4A7BA5" },
  { min: 9, max: 10, label: "Overwhelming", anchor: "Most of what’s here right now", color: "#3F7CB5" },
];

export const bandOf = (n) => INTENSITY_BANDS.find((b) => n >= b.min && n <= b.max);
