/**
 * LoadToCashLogo — inline SVG brand logo
 * Works on ANY background (transparent — no white box ever)
 */

interface LogoProps {
  /** Height in pixels (width auto-scales) */
  height?: number;
  /** Show only the truck icon (for collapsed sidebar) */
  iconOnly?: boolean;
  className?: string;
}

export function LoadToCashLogo({ height = 40, iconOnly = false, className = '' }: LogoProps) {
  if (iconOnly) {
    // Square icon mark only — for collapsed sidebar / favicon fallback
    const size = height;
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="LoadToCash"
      >
        {/* Rounded square bg */}
        <rect width="40" height="40" rx="10" fill="url(#iconGrad)" />
        {/* Truck silhouette */}
        <g transform="translate(4, 13)">
          {/* Cab */}
          <rect x="0" y="4" width="18" height="10" rx="2" fill="white" opacity="0.95"/>
          {/* Windshield */}
          <rect x="13" y="5.5" width="4" height="5" rx="1" fill="#1d55b0" opacity="0.7"/>
          {/* Trailer */}
          <rect x="18" y="2" width="14" height="12" rx="1.5" fill="white" opacity="0.85"/>
          {/* Wheels */}
          <circle cx="6"  cy="16" r="2.5" fill="#0d1f3c"/>
          <circle cx="6"  cy="16" r="1.2" fill="#94a3b8"/>
          <circle cx="14" cy="16" r="2.5" fill="#0d1f3c"/>
          <circle cx="14" cy="16" r="1.2" fill="#94a3b8"/>
          <circle cx="24" cy="16" r="2.5" fill="#0d1f3c"/>
          <circle cx="24" cy="16" r="1.2" fill="#94a3b8"/>
          {/* Dollar on trailer */}
          <text x="23" y="11" fontSize="7" fontWeight="bold" fill="#f59e0b" textAnchor="middle">$</text>
        </g>
        {/* Speed lines */}
        <line x1="3" y1="20" x2="9"  y2="20" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
        <line x1="2" y1="23" x2="7"  y2="23" stroke="#f59e0b" strokeWidth="1"   strokeLinecap="round" opacity="0.5"/>
        <defs>
          <linearGradient id="iconGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#1d55b0"/>
            <stop offset="100%" stopColor="#0d1f3c"/>
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // Full horizontal logo
  const w = Math.round(height * 3.8);
  return (
    <svg
      width={w}
      height={height}
      viewBox="0 0 190 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LoadToCash"
    >
      {/* ── Truck icon mark ── */}
      <g transform="translate(0, 5)">
        {/* Icon bg pill */}
        <rect x="0" y="0" width="38" height="38" rx="9" fill="url(#fullGrad)"/>

        {/* Truck cab */}
        <rect x="4"  y="15" width="16" height="11" rx="2" fill="white" opacity="0.95"/>
        {/* Windshield */}
        <rect x="16" y="16.5" width="3.5" height="5.5" rx="1" fill="#1d55b0" opacity="0.6"/>
        {/* Trailer */}
        <rect x="20" y="11" width="14" height="15" rx="1.5" fill="white" opacity="0.85"/>
        {/* Wheels */}
        <circle cx="9"  cy="28" r="3" fill="#0a1628"/>
        <circle cx="9"  cy="28" r="1.4" fill="#94a3b8"/>
        <circle cx="16" cy="28" r="3" fill="#0a1628"/>
        <circle cx="16" cy="28" r="1.4" fill="#94a3b8"/>
        <circle cx="26" cy="28" r="3" fill="#0a1628"/>
        <circle cx="26" cy="28" r="1.4" fill="#94a3b8"/>
        {/* Dollar sign on trailer */}
        <text x="27" y="22" fontSize="9" fontWeight="bold" fill="#f59e0b" textAnchor="middle">$</text>
        {/* Speed lines */}
        <line x1="2" y1="22" x2="5"  y2="22" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
        <line x1="1" y1="25" x2="4"  y2="25" stroke="#f59e0b" strokeWidth="1"   strokeLinecap="round" opacity="0.5"/>

        <defs>
          <linearGradient id="fullGrad" x1="0" y1="0" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#2563eb"/>
            <stop offset="100%" stopColor="#1d3a7a"/>
          </linearGradient>
        </defs>
      </g>

      {/* ── Wordmark ── */}
      <g transform="translate(44, 0)">
        {/* LOAD */}
        <text
          x="0" y="30"
          fontSize="22"
          fontWeight="800"
          fontFamily="'Plus Jakarta Sans', 'Outfit', system-ui, sans-serif"
          fill="white"
          letterSpacing="-0.5"
        >LOAD</text>
        {/* TO */}
        <text
          x="69" y="30"
          fontSize="18"
          fontWeight="400"
          fontFamily="'Plus Jakarta Sans', 'Outfit', system-ui, sans-serif"
          fill="rgba(255,255,255,0.55)"
        >to</text>
        {/* CASH */}
        <text
          x="91" y="30"
          fontSize="22"
          fontWeight="800"
          fontFamily="'Plus Jakarta Sans', 'Outfit', system-ui, sans-serif"
          fill="url(#cashGrad)"
          letterSpacing="-0.5"
        >CASH</text>
        {/* Tagline */}
        <text
          x="1" y="43"
          fontSize="7.5"
          fontWeight="600"
          fontFamily="'Plus Jakarta Sans', 'Outfit', system-ui, sans-serif"
          fill="rgba(255,255,255,0.35)"
          letterSpacing="2"
        >DISPATCH SYSTEM</text>

        <defs>
          <linearGradient id="cashGrad" x1="0" y1="0" x2="60" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#f59e0b"/>
            <stop offset="100%" stopColor="#fbbf24"/>
          </linearGradient>
        </defs>
      </g>
    </svg>
  );
}
