export default function CbtCycle() {
  return (
    <div className="cbt-cycle">
      <svg className="cbt-arrows" viewBox="0 0 240 276">
        <defs>
          <marker
            id="cbtArrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6.5"
            markerHeight="6.5"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" fill="var(--moss-deep)" />
          </marker>
        </defs>
        <path className="cbt-arrow" d="M120,64 L120,84" markerEnd="url(#cbtArrow)" />
        <path
          className="cbt-arrow"
          d="M141,163 Q184,154 155,189"
          markerEnd="url(#cbtArrow)"
        />
        <path
          className="cbt-arrow"
          d="M134,226 Q120,254 106,226"
          markerEnd="url(#cbtArrow)"
        />
        <path
          className="cbt-arrow"
          d="M85,189 Q56,154 99,163"
          markerEnd="url(#cbtArrow)"
        />
      </svg>
      <div className="cbt-bubble situation">
        <span className="cbt-main">Situation</span>
      </div>
      <div className="cbt-bubble thought">
        <span className="cbt-main">Thought</span>
        <span className="cbt-sub">Idea</span>
      </div>
      <div className="cbt-bubble behavior">
        <span className="cbt-main">Behavior</span>
        <span className="cbt-sub">Actions</span>
      </div>
      <div className="cbt-bubble emotion">
        <span className="cbt-main">Emotion</span>
        <span className="cbt-sub">Sensations</span>
      </div>
    </div>
  );
}
