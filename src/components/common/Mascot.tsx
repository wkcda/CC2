// 情侶熊吉祥物(白熊 + 啡熊)— 按使用者自繪角色,用 SVG 重畫。
// 白熊:啡耳、粉紅圓腮、ω 嘴、頸前小蝴蝶結。
// 啡熊:奶茶色、橙黃圓腮、ω 嘴、圓肚仔。
// 向量繪製,放大唔花、離線可用。

interface Props {
  size?: number;
  className?: string;
}

const OUT = '#5b3a2e'; // 深啡描邊

// 白熊
export function BearWhite({ size = 96, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 150 180"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="75" cy="172" rx="34" ry="5" fill="#000" opacity="0.05" />
      {/* 腳 */}
      <ellipse cx="58" cy="162" rx="11" ry="8" fill="#fff" stroke={OUT} strokeWidth="4" />
      <ellipse cx="92" cy="162" rx="11" ry="8" fill="#fff" stroke={OUT} strokeWidth="4" />
      {/* 身體 */}
      <path
        d="M40 120c0-19 16-30 35-30s35 11 35 30v6c0 22-16 34-35 34s-35-12-35-34z"
        fill="#fff"
        stroke={OUT}
        strokeWidth="4"
      />
      {/* 手 */}
      <path d="M42 116c-8 2-13 9-12 19" fill="none" stroke={OUT} strokeWidth="4" strokeLinecap="round" />
      <path d="M108 116c8 2 13 9 12 19" fill="none" stroke={OUT} strokeWidth="4" strokeLinecap="round" />
      {/* 蝴蝶結 */}
      <path d="M75 116l-9 8h18z" fill={OUT} />
      <circle cx="75" cy="116" r="4" fill={OUT} />
      {/* 耳 */}
      <circle cx="38" cy="40" r="17" fill="#5b3a2e" />
      <circle cx="112" cy="40" r="17" fill="#5b3a2e" />
      {/* 頭 */}
      <path
        d="M75 16c-33 0-53 22-53 50 0 26 22 42 53 42s53-16 53-42c0-28-20-50-53-50z"
        fill="#fff"
        stroke={OUT}
        strokeWidth="4"
      />
      {/* 腮 */}
      <ellipse cx="42" cy="78" rx="13" ry="10" fill="#f3a8bb" opacity="0.85" />
      <ellipse cx="108" cy="78" rx="13" ry="10" fill="#f3a8bb" opacity="0.85" />
      {/* 眼 */}
      <ellipse cx="55" cy="66" rx="5.5" ry="7" fill={OUT} />
      <ellipse cx="95" cy="66" rx="5.5" ry="7" fill={OUT} />
      {/* ω 嘴 */}
      <path
        d="M68 72q3.5 5 7 0q3.5 5 7 0"
        fill="none"
        stroke={OUT}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 啡熊
export function BearBrown({ size = 96, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 150 180"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="75" cy="172" rx="34" ry="5" fill="#000" opacity="0.05" />
      <ellipse cx="58" cy="162" rx="11" ry="8" fill="#cf9b73" stroke={OUT} strokeWidth="4" />
      <ellipse cx="92" cy="162" rx="11" ry="8" fill="#cf9b73" stroke={OUT} strokeWidth="4" />
      <path
        d="M40 120c0-19 16-30 35-30s35 11 35 30v6c0 22-16 34-35 34s-35-12-35-34z"
        fill="#cf9b73"
        stroke={OUT}
        strokeWidth="4"
      />
      <path d="M42 116c-8 2-13 9-12 19" fill="none" stroke={OUT} strokeWidth="4" strokeLinecap="round" />
      <path d="M108 116c8 2 13 9 12 19" fill="none" stroke={OUT} strokeWidth="4" strokeLinecap="round" />
      {/* 耳 */}
      <circle cx="38" cy="40" r="18" fill="#cf9b73" stroke={OUT} strokeWidth="4" />
      <circle cx="112" cy="40" r="18" fill="#cf9b73" stroke={OUT} strokeWidth="4" />
      <circle cx="38" cy="40" r="8" fill="#5b3a2e" opacity="0.55" />
      <circle cx="112" cy="40" r="8" fill="#5b3a2e" opacity="0.55" />
      {/* 頭 */}
      <path
        d="M75 16c-33 0-53 22-53 50 0 26 22 42 53 42s53-16 53-42c0-28-20-50-53-50z"
        fill="#cf9b73"
        stroke={OUT}
        strokeWidth="4"
      />
      {/* 橙黃腮 */}
      <ellipse cx="42" cy="80" rx="13" ry="10" fill="#f1c170" opacity="0.85" />
      <ellipse cx="108" cy="80" rx="13" ry="10" fill="#f1c170" opacity="0.85" />
      <ellipse cx="55" cy="66" rx="5.5" ry="7" fill={OUT} />
      <ellipse cx="95" cy="66" rx="5.5" ry="7" fill={OUT} />
      <path
        d="M68 72q3.5 5 7 0q3.5 5 7 0"
        fill="none"
        stroke={OUT}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 一對情侶熊並排
export function BearCouple({ size = 150, className }: Props) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <BearWhite size={size * 0.7} className="bear-lean-r" />
      <BearBrown size={size * 0.7} className="bear-lean-l" />
    </div>
  );
}
