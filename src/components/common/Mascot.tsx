// 原創情侶熊公仔(白熊 + 啡熊)。全部手繪 SVG,圓潤可愛風,
// 自家設計、放大唔花、離線可用。

interface Props {
  size?: number;
  className?: string;
}

// 白熊:圓碌碌、粉紅腮、得意笑容
export function BearWhite({ size = 80, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="60" cy="110" rx="26" ry="5" fill="#000" opacity="0.05" />
      {/* 耳 */}
      <circle cx="34" cy="36" r="13" fill="#fff" stroke="#4a423b" strokeWidth="3" />
      <circle cx="86" cy="36" r="13" fill="#fff" stroke="#4a423b" strokeWidth="3" />
      <circle cx="34" cy="36" r="6" fill="#f4c4cf" />
      <circle cx="86" cy="36" r="6" fill="#f4c4cf" />
      {/* 大圓頭身 */}
      <path
        d="M18 62a42 42 0 0 1 84 0c0 26-18 42-42 42S18 88 18 62z"
        fill="#fff"
        stroke="#4a423b"
        strokeWidth="3"
      />
      {/* 腮紅 */}
      <ellipse cx="36" cy="68" rx="8.5" ry="6.5" fill="#f7cdd8" opacity="0.9" />
      <ellipse cx="84" cy="68" rx="8.5" ry="6.5" fill="#f7cdd8" opacity="0.9" />
      {/* 眼 */}
      <circle cx="46" cy="60" r="4.6" fill="#4a423b" />
      <circle cx="74" cy="60" r="4.6" fill="#4a423b" />
      <circle cx="47.6" cy="58.2" r="1.5" fill="#fff" />
      <circle cx="75.6" cy="58.2" r="1.5" fill="#fff" />
      {/* 鼻 + 嘴 */}
      <ellipse cx="60" cy="70" rx="2.6" ry="1.8" fill="#4a423b" />
      <path
        d="M54 74q6 6 12 0"
        fill="none"
        stroke="#4a423b"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 啡熊:奶茶色、圓潤、淺色吻部
export function BearBrown({ size = 80, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="60" cy="110" rx="26" ry="5" fill="#000" opacity="0.05" />
      <circle cx="34" cy="36" r="13" fill="#c79a6d" stroke="#6b513a" strokeWidth="3" />
      <circle cx="86" cy="36" r="13" fill="#c79a6d" stroke="#6b513a" strokeWidth="3" />
      <circle cx="34" cy="36" r="6" fill="#e3b89c" />
      <circle cx="86" cy="36" r="6" fill="#e3b89c" />
      <path
        d="M18 62a42 42 0 0 1 84 0c0 26-18 42-42 42S18 88 18 62z"
        fill="#c79a6d"
        stroke="#6b513a"
        strokeWidth="3"
      />
      {/* 吻部 */}
      <ellipse cx="60" cy="72" rx="17" ry="13" fill="#ecd6bd" />
      <ellipse cx="34" cy="70" rx="7.5" ry="5.5" fill="#d89a7e" opacity="0.6" />
      <ellipse cx="86" cy="70" rx="7.5" ry="5.5" fill="#d89a7e" opacity="0.6" />
      <circle cx="47" cy="60" r="4.6" fill="#6b513a" />
      <circle cx="73" cy="60" r="4.6" fill="#6b513a" />
      <circle cx="48.6" cy="58.2" r="1.5" fill="#fff" />
      <circle cx="74.6" cy="58.2" r="1.5" fill="#fff" />
      <ellipse cx="60" cy="66" rx="3.4" ry="2.4" fill="#6b513a" />
      <path
        d="M54 73q6 5 12 0"
        fill="none"
        stroke="#6b513a"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 一對攬住嘅情侶熊
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
