// Background com estrelas distribuídas aleatoriamente · CSS twinkle animation
// Determinístico (não usa Math.random direto no render) pra evitar hydration mismatch

const STARS = [
  { left: "5%", top: "12%", size: 2, delay: "0s" },
  { left: "12%", top: "78%", size: 1, delay: "0.5s" },
  { left: "18%", top: "32%", size: 1, delay: "1.2s" },
  { left: "23%", top: "8%", size: 2, delay: "0.8s" },
  { left: "28%", top: "55%", size: 1, delay: "1.8s" },
  { left: "34%", top: "20%", size: 3, delay: "0.3s" },
  { left: "41%", top: "68%", size: 1, delay: "2.1s" },
  { left: "47%", top: "15%", size: 2, delay: "1.5s" },
  { left: "53%", top: "40%", size: 1, delay: "0.9s" },
  { left: "58%", top: "85%", size: 2, delay: "2.3s" },
  { left: "64%", top: "25%", size: 1, delay: "1.1s" },
  { left: "70%", top: "52%", size: 3, delay: "0.6s" },
  { left: "76%", top: "10%", size: 1, delay: "1.9s" },
  { left: "82%", top: "73%", size: 2, delay: "0.4s" },
  { left: "88%", top: "35%", size: 1, delay: "1.4s" },
  { left: "94%", top: "62%", size: 2, delay: "2.0s" },
  { left: "8%", top: "45%", size: 1, delay: "1.7s" },
  { left: "15%", top: "92%", size: 2, delay: "0.2s" },
  { left: "37%", top: "5%", size: 1, delay: "1.0s" },
  { left: "55%", top: "70%", size: 1, delay: "2.4s" },
  { left: "72%", top: "88%", size: 2, delay: "0.7s" },
  { left: "90%", top: "18%", size: 1, delay: "1.6s" },
];

export function StarField({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {STARS.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
