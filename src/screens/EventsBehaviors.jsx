import Squiggle from "../components/Squiggle";
import ChainDiagram from "../components/ChainDiagram";
import CbtCycle from "../components/CbtCycle";

export default function EventsBehaviors() {
  return (
    <section className="screen">
      <div className="eyebrow">Patterns</div>
      <h1 className="title">Events &amp; Behaviors</h1>
      <Squiggle />

      <div className="section-label">DBT · Chain analysis</div>
      <div className="card">
        <p className="section-intro">
          Chain analysis traces the sequence that leads to a behavior — from
          the vulnerabilities that set the stage, through the moment that
          sets things off, to the thoughts and actions that follow, and what
          happens after.
        </p>
        <ChainDiagram />
      </div>

      <div className="cta-band" style={{ marginTop: 14 }}>
        <p style={{ margin: 0 }}>
          <strong>Why the pattern repeats.</strong> Behaviors that keep
          happening are being reinforced somehow. Often there's quick relief
          now and a cost later — and the relief is what keeps the habit
          alive.
        </p>
      </div>

      <div className="section-label">CBT · The cycle</div>
      <div className="card">
        <p className="section-intro">
          A situation sparks a thought, the thought shapes what you do, and
          what you do shapes how you feel — which feeds back into what you
          think next.
        </p>
        <CbtCycle />
      </div>
    </section>
  );
}
