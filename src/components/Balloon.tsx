export function Balloon({ color, className }: { color: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 124" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M40 6C22 6 10 19 10 36c0 20 16 34 30 42 14-8 30-22 30-42C70 19 58 6 40 6Z"
        fill={color}
      />
      <path d="M36 77h8l-4 8-4-8Z" fill={color} />
      <path
        d="M40 85c6 7-6 11 0 18s-4 10 0 15"
        stroke="#d9a2b6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="27" cy="27" rx="6" ry="10" transform="rotate(-28 27 27)" fill="#fff" opacity=".45" />
      <circle cx="52" cy="46" r="3" fill="#fff" opacity=".22" />
    </svg>
  );
}
