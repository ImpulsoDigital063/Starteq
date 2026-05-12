// Chuva de meteoros animada · streaks dourados cruzando diagonal
// CSS pure (sem JS) · performante

const METEORS = [
  { left: "8%",  top: "-5%", delay: "0s",   duration: "4s" },
  { left: "22%", top: "-5%", delay: "1.2s", duration: "5s" },
  { left: "38%", top: "-5%", delay: "0.5s", duration: "3.5s" },
  { left: "55%", top: "-5%", delay: "2.3s", duration: "4.5s" },
  { left: "70%", top: "-5%", delay: "1.8s", duration: "3.8s" },
  { left: "85%", top: "-5%", delay: "3.1s", duration: "5.2s" },
  { left: "15%", top: "-5%", delay: "4.0s", duration: "4.2s" },
  { left: "48%", top: "-5%", delay: "3.5s", duration: "4.8s" },
  { left: "78%", top: "-5%", delay: "5.5s", duration: "3.6s" },
];

export function Meteors({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {METEORS.map((m, i) => (
        <span
          key={i}
          className="meteor"
          style={{
            left: m.left,
            top: m.top,
            animationDelay: m.delay,
            animationDuration: m.duration,
          }}
        />
      ))}
    </div>
  );
}
