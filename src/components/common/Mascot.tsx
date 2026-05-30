// 原創情侶熊公仔(白熊 + 啡熊)。手繪 SVG,冇版權問題、放大唔花。
// 靈感係常見嘅圓潤情侶公仔風格,但係自家設計。

interface Props {
  size?: number;
  className?: string;
}

// 白熊(小一二風格:白色圓潤、粉紅腮)
export function BearWhite({ size = 80, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="50" cy="92" rx="22" ry="5" fill="#000" opacity="0.06" />
      {/* 耳 */}
      <circle cx="30" cy="28" r="11" fill="#fff" stroke="#3f3a36" strokeWidth="2.4" />
      <circle cx="70" cy="28" r="11" fill="#fff" stroke="#3f3a36" strokeWidth="2.4" />
      <circle cx="30" cy="28" r="5" fill="#f3c0cd" />
      <circle cx="70" cy="28" r="5" fill="#f3c0cd" />
      {/* 頭/身 */}
      <path
        d="M22 50a28 28 0 0 1 56 0v6a28 26 0 0 1-56 0z"
        fill="#fff"
        stroke="#3f3a36"
        strokeWidth="2.4"
      />
      {/* 腮 */}
      <circle cx="33" cy="55" r="6.5" fill="#f7cdd8" opacity="0.85" />
      <circle cx="67" cy="55" r="6.5" fill="#f7cdd8" opacity="0.85" />
      {/* 眼 */}
      <circle cx="40" cy="48" r="3.4" fill="#3f3a36" />
      <circle cx="60" cy="48" r="3.4" fill="#3f3a36" />
      <circle cx="41.2" cy="46.8" r="1" fill="#fff" />
      <circle cx="61.2" cy="46.8" r="1" fill="#fff" />
      {/* 嘴 */}
      <path
        d="M46 56q4 4 8 0"
        fill="none"
        stroke="#3f3a36"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 啡熊(布布風格:啡色、圓潤、粉紅腮)
export function BearBrown({ size = 80, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="50" cy="92" rx="22" ry="5" fill="#000" opacity="0.06" />
      <circle cx="30" cy="28" r="11" fill="#c79a6d" stroke="#5a4632" strokeWidth="2.4" />
      <circle cx="70" cy="28" r="11" fill="#c79a6d" stroke="#5a4632" strokeWidth="2.4" />
      <circle cx="30" cy="28" r="5" fill="#e9b9a0" />
      <circle cx="70" cy="28" r="5" fill="#e9b9a0" />
      <path
        d="M22 50a28 28 0 0 1 56 0v6a28 26 0 0 1-56 0z"
        fill="#c79a6d"
        stroke="#5a4632"
        strokeWidth="2.4"
      />
      {/* 鼻吻部 */}
      <ellipse cx="50" cy="56" rx="12" ry="9" fill="#e7cdb0" />
      <circle cx="34" cy="55" r="6" fill="#dfa98a" opacity="0.7" />
      <circle cx="66" cy="55" r="6" fill="#dfa98a" opacity="0.7" />
      <circle cx="41" cy="48" r="3.4" fill="#5a4632" />
      <circle cx="59" cy="48" r="3.4" fill="#5a4632" />
      <circle cx="42.2" cy="46.8" r="1" fill="#fff" />
      <circle cx="60.2" cy="46.8" r="1" fill="#fff" />
      <ellipse cx="50" cy="53" rx="2.6" ry="1.8" fill="#5a4632" />
      <path
        d="M46 58q4 3.5 8 0"
        fill="none"
        stroke="#5a4632"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 一對攬住嘅情侶熊(放鎖屏/封面)
export function BearCouple({ size = 140, className }: Props) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <BearWhite size={size * 0.72} className="bear-lean-r" />
      <BearBrown size={size * 0.72} className="bear-lean-l" />
    </div>
  );
}
