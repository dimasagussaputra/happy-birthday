const FLOATIES = ['✨', '✦', '✿', '✧', '🎈', '❀', '✦', '🌟', '✿'];

export function Ambient() {
  return (
    <>
      <div className="page-bg" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
        <span className="blob blob-c" />
      </div>
      <div className="ambient" aria-hidden="true">
        {FLOATIES.map((floaty, i) => (
          <span
            key={`${floaty}-${i}`}
            style={{
              left: `${7 + i * 10.5}%`,
              animationDelay: `${i * -1.7}s`,
              animationDuration: `${10 + (i % 3) * 2.5}s`,
              fontSize: `${16 + (i % 3) * 5}px`,
            }}
          >
            {floaty}
          </span>
        ))}
      </div>
    </>
  );
}
