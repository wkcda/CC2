// 原創情侶熊公仔(白熊 + 啡熊),全身企姿。手繪 SVG、放大唔花、離線可用。
// 圓滾身體 + 橢圓腮紅 + 一字嘴,可愛日系風。

interface Props {
  size?: number;
  className?: string;
}

// 白熊:頭頂有啡色小揪揪、粉紅腮
export function BearWhite({ size = 90, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 150"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="60" cy="142" rx="30" ry="5" fill="#000" opacity="0.05" />
      {/* 身體 */}
      <path
        d="M30 96c0-14 13-22 30-22s30 8 30 22v8c0 18-13 28-30 28S30 122 30 104z"
        fill="#fff"
        stroke="#4a423b"
        strokeWidth="3"
      />
      {/* 手仔 */}
      <ellipse cx="31" cy="108" rx="8" ry="10" fill="#fff" stroke="#4a423b" strokeWidth="3" />
      <ellipse cx="89" cy="108" rx="8" ry="10" fill="#fff" stroke="#4a423b" strokeWidth="3" />
      {/* 腳 */}
      <ellipse cx="47" cy="135" rx="8" ry="5" fill="#fff" stroke="#4a423b" strokeWidth="3" />
      <ellipse cx="73" cy="135" rx="8" ry="5" fill="#fff" stroke="#4a423b" strokeWidth="3" />
      {/* 頭頂小揪揪 */}
      <circle cx="60" cy="16" r="7" fill="#7a5a44" />
      {/* 耳 */}
      <circle cx="33" cy="34" r="13" fill="#fff" stroke="#4a423b" strokeWidth="3" />
      <circle cx="87" cy="34" r="13" fill="#fff" stroke="#4a423b" strokeWidth="3" />
      <circle cx="33" cy="34" r="6.5" fill="#7a5a44" opacity="0.85" />
      <circle cx="87" cy="34" r="6.5" fill="#7a5a44" opacity="0.85" />
      {/* 頭 */}
      <ellipse cx="60" cy="52" rx="38" ry="34" fill="#fff" stroke="#4a423b" strokeWidth="3" />
      {/* 腮紅 */}
      <ellipse cx="33" cy="58" rx="9" ry="6.5" fill="#f4aebf" opacity="0.85" />
      <ellipse cx="87" cy="58" rx="9" ry="6.5" fill="#f4aebf" opacity="0.85" />
      {/* 眼 */}
      <ellipse cx="46" cy="50" rx="4.4" ry="5.2" fill="#4a423b" />
      <ellipse cx="74" cy="50" rx="4.4" ry="5.2" fill="#4a423b" />
      <circle cx="47.6" cy="48" r="1.5" fill="#fff" />
      <circle cx="75.6" cy="48" r="1.5" fill="#fff" />
      {/* 一字嘴 */}
      <path d="M54 60h12" fill="none" stroke="#4a423b" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

// 啡熊:奶茶色、橙黃腮、圓耳
export function BearBrown({ size = 90, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 150"
      className={className}
      aria-hidden="true"
    >
      <ellipse cx="60" cy="142" rx="30" ry="5" fill="#000" opacity="0.05" />
      <path
        d="M30 96c0-14 13-22 30-22s30 8 30 22v8c0 18-13 28-30 28S30 122 30 104z"
        fill="#c79a6d"
        stroke="#6b513a"
        strokeWidth="3"
      />
      <ellipse cx="31" cy="108" rx="8" ry="10" fill="#c79a6d" stroke="#6b513a" strokeWidth="3" />
      <ellipse cx="89" cy="108" rx="8" ry="10" fill="#c79a6d" stroke="#6b513a" strokeWidth="3" />
      <ellipse cx="47" cy="135" rx="8" ry="5" fill="#c79a6d" stroke="#6b513a" strokeWidth="3" />
      <ellipse cx="73" cy="135" rx="8" ry="5" fill="#c79a6d" stroke="#6b513a" strokeWidth="3" />
      {/* 耳 */}
      <circle cx="33" cy="32" r="14" fill="#c79a6d" stroke="#6b513a" strokeWidth="3" />
      <circle cx="87" cy="32" r="14" fill="#c79a6d" stroke="#6b513a" strokeWidth="3" />
      <circle cx="33" cy="32" r="7" fill="#a87c55" />
      <circle cx="87" cy="32" r="7" fill="#a87c55" />
      {/* 頭 */}
      <ellipse cx="60" cy="52" rx="38" ry="34" fill="#c79a6d" stroke="#6b513a" strokeWidth="3" />
      {/* 橙黃腮 */}
      <ellipse cx="33" cy="58" rx="9" ry="6.5" fill="#eaa95f" opacity="0.7" />
      <ellipse cx="87" cy="58" rx="9" ry="6.5" fill="#eaa95f" opacity="0.7" />
      <ellipse cx="46" cy="50" rx="4.4" ry="5.2" fill="#4a3a2c" />
      <ellipse cx="74" cy="50" rx="4.4" ry="5.2" fill="#4a3a2c" />
      <circle cx="47.6" cy="48" r="1.5" fill="#fff" />
      <circle cx="75.6" cy="48" r="1.5" fill="#fff" />
      <path d="M54 60h12" fill="none" stroke="#4a3a2c" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

// 一對攬住嘅情侶熊
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
