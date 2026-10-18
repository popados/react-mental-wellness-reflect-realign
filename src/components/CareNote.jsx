export default function CareNote({ children }) {
  return (
    <div className="footnote">
      This is a private space for reflection — not a substitute for professional
      care. If things ever feel like too much, reaching out to someone you trust
      or a professional can help.
      <p className="crisis-line">
        <strong>In crisis or thinking about harming yourself?</strong> In the US,{" "}
        <a href="tel:988">call</a> or <a href="sms:988">text</a> 988 (Suicide &amp;
        Crisis Lifeline), any time. Elsewhere, contact your local emergency number.
      </p>
      {children}
    </div>
  );
}
