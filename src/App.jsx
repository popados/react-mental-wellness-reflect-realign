import { useCallback, useRef, useState } from "react";
import { useLocalStorage, clearAppData } from "./hooks/useLocalStorage";
import { dateKey } from "./utils/dates";
import { shortSkill } from "./utils/stats";
import Home from "./screens/Home";
import Affirmation from "./screens/Affirmation";
import Checks from "./screens/Checks";
import Habits from "./screens/Habits";
import Grounding from "./screens/Grounding";
import Emotions from "./screens/Emotions";
import EventsBehaviors from "./screens/EventsBehaviors";
import Digest from "./screens/Digest";
import Insights from "./screens/Insights";
import Profile from "./screens/Profile";
import TabBar from "./components/TabBar";
import Toast from "./components/Toast";

const KEYS = [
  "mh:emotions",
  "mh:checks",
  "mh:favorites",
  "mh:habits",
  "mh:coping-log",
  "mh:resonance",
  "mh:profile",
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [emotions, setEmotions] = useLocalStorage("mh:emotions", []);
  const [checks, setChecks] = useLocalStorage("mh:checks", []);
  const [favorites, setFavorites] = useLocalStorage("mh:favorites", []);
  const [habits, setHabits] = useLocalStorage("mh:habits", []);
  const [copingLog, setCopingLog] = useLocalStorage("mh:coping-log", []);
  const [resonance, setResonance] = useLocalStorage("mh:resonance", {});
  const [profile, setProfile] = useLocalStorage("mh:profile", {});

  const [toast, setToast] = useState({ message: "", show: false });
  const toastTimer = useRef(null);

  const showToast = useCallback((message) => {
    setToast({ message, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, show: false })),
      2000
    );
  }, []);

  function navigate(next) {
    setScreen(next);
    const main = document.getElementById("screens");
    if (main) main.scrollTop = 0;
  }

  // ---- body awareness ----
  function quickLog(mood) {
    setChecks((cs) => [
      ...cs,
      { id: Date.now(), date: new Date().toISOString(), mood, energy: 3, note: "" },
    ]);
    showToast("Logged: " + mood);
  }
  function logCheck({ mood, energy, note }) {
    setChecks((cs) => [
      ...cs,
      { id: Date.now(), date: new Date().toISOString(), mood, energy, note },
    ]);
    showToast("Body awareness logged");
  }
  function deleteCheck(id) {
    setChecks((cs) => cs.filter((c) => c.id !== id));
  }

  // ---- affirmations ----
  function toggleFavorite(text) {
    setFavorites((fs) => {
      if (fs.includes(text)) {
        showToast("Removed from saved");
        return fs.filter((f) => f !== text);
      }
      showToast("Saved");
      return [...fs, text];
    });
  }
  function removeFavorite(text) {
    setFavorites((fs) => fs.filter((f) => f !== text));
    setResonance((r) => {
      const next = { ...r };
      delete next[text];
      return next;
    });
  }
  function revisitAffirmation(text) {
    setResonance((r) => ({ ...r, [text]: (r[text] || 0) + 1 }));
  }

  // ---- coping skills ----
  function logCoping(skill, group) {
    setCopingLog((log) => [
      ...log,
      { id: Date.now(), date: new Date().toISOString(), skill, group },
    ]);
    showToast(`Logged: ${shortSkill(skill)}`);
  }

  // ---- emotions (thought records) ----
  function saveEmotionEntry(record) {
    setEmotions((es) => [
      ...es,
      { id: Date.now(), date: new Date().toISOString(), ...record },
    ]);
    showToast("Thought record saved");
  }
  function deleteEmotionEntry(id) {
    setEmotions((es) => es.filter((e) => e.id !== id));
  }

  // ---- habits ----
  function addHabit({ name, time, days, duration }) {
    setHabits((hs) => [
      ...hs,
      { id: Date.now(), name, time, days, duration, completions: [] },
    ]);
    showToast("Habit added");
  }
  function toggleHabitToday(id) {
    const key = dateKey();
    setHabits((hs) =>
      hs.map((h) => {
        if (h.id !== id) return h;
        const has = h.completions.includes(key);
        return {
          ...h,
          completions: has
            ? h.completions.filter((d) => d !== key)
            : [...h.completions, key],
        };
      })
    );
  }
  function setHabitDuration(id, duration) {
    setHabits((hs) => hs.map((h) => (h.id === id ? { ...h, duration } : h)));
    showToast(duration ? `Timer set to ${duration} min` : "Timer removed");
  }
  function deleteHabit(id) {
    setHabits((hs) => hs.filter((h) => h.id !== id));
  }

  // ---- profile ----
  function saveProfile(next) {
    setProfile(next);
    showToast("Profile saved");
  }

  function exportData() {
    const data = {
      exportedAt: new Date().toISOString(),
      profile,
      bodyAwareness: checks,
      thoughtRecords: emotions,
      habits,
      copingLog,
      savedAffirmations: favorites,
      affirmationResonance: resonance,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reflect-and-realign-${dateKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Your data was exported");
  }

  const firstActivity = [
    ...checks.map((c) => Date.parse(c.date)),
    ...emotions.map((e) => Date.parse(e.date)),
    ...copingLog.map((l) => Date.parse(l.date)),
    ...habits.map((h) => h.id),
  ];

  const profileStats = [
    { label: "Body awareness check-ins", value: checks.length },
    { label: "Thought records", value: emotions.length },
    {
      label: "Habit check-offs",
      value: habits.reduce((sum, h) => sum + h.completions.length, 0),
    },
    { label: "Coping skills used", value: copingLog.length },
  ];

  function resetAll() {
    if (
      !window.confirm(
        "This clears your profile, every affirmation you've saved, every body awareness check-in, every habit, every coping skill you've logged, and every thought record. This can't be undone. Continue?"
      )
    )
      return;
    clearAppData(KEYS);
    setEmotions([]);
    setChecks([]);
    setFavorites([]);
    setHabits([]);
    setCopingLog([]);
    setResonance({});
    setProfile({});
    showToast("Your data has been cleared");
  }

  return (
    <div className="app">
      <main id="screens">
        {screen === "home" && (
          <Home
            name={profile.name}
            checks={checks}
            onNavigate={navigate}
            onQuickLog={quickLog}
            onReset={resetAll}
          />
        )}
        {screen === "affirmation" && (
          <Affirmation
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onRemoveFavorite={removeFavorite}
            resonance={resonance}
            onRevisit={revisitAffirmation}
            copingLog={copingLog}
            onLogCoping={logCoping}
          />
        )}
        {screen === "checks" && (
          <Checks checks={checks} onLog={logCheck} onDelete={deleteCheck} />
        )}
        {screen === "habits" && (
          <Habits
            habits={habits}
            onAdd={addHabit}
            onToggleToday={toggleHabitToday}
            onSetDuration={setHabitDuration}
            onDelete={deleteHabit}
            showToast={showToast}
          />
        )}
        {screen === "grounding" && <Grounding />}
        {screen === "emotions" && (
          <Emotions
            entries={emotions}
            onSave={saveEmotionEntry}
            onDelete={deleteEmotionEntry}
            showToast={showToast}
          />
        )}
        {screen === "events" && <EventsBehaviors />}
        {screen === "digest" && (
          <Digest
            checks={checks}
            emotions={emotions}
            copingLog={copingLog}
            habits={habits}
          />
        )}
        {screen === "insights" && (
          <Insights checks={checks} emotions={emotions} habits={habits} />
        )}
        {screen === "profile" && (
          <Profile
            // Remount after a reset so the form picks up the cleared profile.
            key={JSON.stringify(profile)}
            profile={profile}
            onSave={saveProfile}
            stats={profileStats}
            firstActivity={firstActivity}
            onExport={exportData}
            onReset={resetAll}
          />
        )}
      </main>

      <TabBar current={screen} onNavigate={navigate} />
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
}
