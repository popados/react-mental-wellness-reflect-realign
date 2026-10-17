const STEPS = [
  {
    label: "Vulnerabilities",
    desc: "Poor sleep, stress, hunger, illness — things that lower your resistance before anything even happens.",
  },
  {
    label: "Activating event",
    desc: "The specific moment or trigger that sets the chain in motion.",
  },
  {
    label: "Thoughts",
    desc: "The interpretations and beliefs that show up in response.",
  },
  {
    label: "Behavior",
    desc: "What you actually do — the action, habit, or urge you act on.",
  },
  {
    label: "Consequences",
    desc: "What happens next, for you and for others — both right away and further down the line.",
  },
];

export default function ChainDiagram() {
  return (
    <div className="chain">
      {STEPS.map((s, i) => (
        <div className="chain-step" key={s.label}>
          <div className="chain-node">{i + 1}</div>
          {i < STEPS.length - 1 && <div className="chain-line" />}
          <div className="chain-body">
            <div className="chain-label">{s.label}</div>
            <div className="chain-desc">{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
