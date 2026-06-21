import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


/* ═══════════════════════════════════════
   53ft DRY VAN — Dollar Bill Wrap
═══════════════════════════════════════ */
function DollarTruck() {
  return (
    <svg width="480" height="140" viewBox="0 0 480 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="billGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#16a34a" />
          <stop offset="40%"  stopColor="#15803d" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
        <linearGradient id="billShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cabCol" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#1e3a2f" />
          <stop offset="100%" stopColor="#0f2218" />
        </linearGradient>
        <linearGradient id="cabTop2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#2d5a3d" />
          <stop offset="100%" stopColor="#1a3d28" />
        </linearGradient>
        <linearGradient id="glass2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#86efac" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0.6"  />
        </linearGradient>
        <linearGradient id="tire2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="rim2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#4ade80" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#15803d" stopOpacity="0.3" />
        </linearGradient>
        <filter id="sh2">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.6" />
        </filter>
        <filter id="glow2">
          <feGaussianBlur stdDeviation="5" result="b"/>
          <feComposite in="SourceGraphic" in2="b" operator="over"/>
        </filter>
      </defs>

      {/* ══ ROAD ══ */}
      <rect x="0" y="122" width="480" height="18" rx="2" fill="#0a1118" />
      {[0,60,120,180,240,300,360,420].map(x => (
        <rect key={x} x={x+6} y="129" width="40" height="3.5" rx="1.5" fill="#1e293b" />
      ))}

      {/* ══ TRAILER — Dollar Bill Design ══ */}
      <g filter="url(#sh2)">
        {/* Main trailer body — dollar green */}
        <rect x="8"  y="14" width="290" height="96" rx="4" fill="url(#billGreen)" />
        {/* Roof */}
        <rect x="8"  y="12" width="290" height="8"  rx="4" fill="#14532d" />
        {/* Bottom rail */}
        <rect x="8"  y="106" width="290" height="6" rx="2" fill="#166534" />
        {/* Shine overlay */}
        <rect x="8"  y="14" width="290" height="96" rx="4" fill="url(#billShine)" />

        {/* ── DOLLAR BILL DESIGN ON TRAILER ── */}
        {/* Outer border */}
        <rect x="12" y="18" width="282" height="88" rx="2"
          fill="none" stroke="#166534" strokeWidth="1.5" strokeDasharray="3,3" />
        {/* Inner border */}
        <rect x="16" y="22" width="274" height="80" rx="1.5"
          fill="none" stroke="#15803d" strokeWidth="0.7" />

        {/* Left ornament circle */}
        <circle cx="40"  cy="62" r="22" fill="none" stroke="#166534" strokeWidth="1.2" />
        <circle cx="40"  cy="62" r="16" fill="#14532d" stroke="#166534" strokeWidth="0.8" />
        <text x="40" y="67" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="900" fontFamily="Georgia,serif">$</text>

        {/* Right ornament circle */}
        <circle cx="268" cy="62" r="22" fill="none" stroke="#166534" strokeWidth="1.2" />
        <circle cx="268" cy="62" r="16" fill="#14532d" stroke="#166534" strokeWidth="0.8" />
        <text x="268" y="67" textAnchor="middle" fill="#4ade80" fontSize="14" fontWeight="900" fontFamily="Georgia,serif">$</text>

        {/* Center oval */}
        <ellipse cx="154" cy="62" rx="52" ry="36" fill="#14532d" stroke="#166534" strokeWidth="1" />
        <ellipse cx="154" cy="62" rx="46" ry="30" fill="none"    stroke="#166534" strokeWidth="0.5" strokeDasharray="2,2" />

        {/* LOAD TO CASH main text */}
        <text x="154" y="56" textAnchor="middle"
          fill="#bbf7d0" fontSize="15" fontWeight="900"
          fontFamily="'Outfit','Georgia',serif" letterSpacing="0.5">
          LOAD TO CASH
        </text>
        {/* ONE HUNDRED */}
        <text x="154" y="70" textAnchor="middle"
          fill="#86efac" fontSize="7.5" fontWeight="600"
          fontFamily="Georgia,serif" letterSpacing="3">
          DISPATCH SOLUTIONS
        </text>
        {/* Decorative line */}
        <line x1="110" y1="75" x2="198" y2="75" stroke="#166534" strokeWidth="0.7" />
        {/* Tagline */}
        <text x="154" y="84" textAnchor="middle"
          fill="#4ade80" fontSize="6" fontFamily="monospace" letterSpacing="1">
          loadtocash.online
        </text>

        {/* Corner "100" values */}
        <text x="20"  y="34"  fill="#4ade80" fontSize="9" fontWeight="bold" fontFamily="Georgia,serif">100</text>
        <text x="270" y="34"  fill="#4ade80" fontSize="9" fontWeight="bold" fontFamily="Georgia,serif" textAnchor="end">100</text>
        <text x="20"  y="102" fill="#4ade80" fontSize="9" fontWeight="bold" fontFamily="Georgia,serif">100</text>
        <text x="270" y="102" fill="#4ade80" fontSize="9" fontWeight="bold" fontFamily="Georgia,serif" textAnchor="end">100</text>

        {/* Vertical ribs (like bill texture) */}
        {[70,120,170,220].map(x => (
          <line key={x} x1={x} y1="14" x2={x} y2="110"
            stroke="#166534" strokeWidth="0.6" opacity="0.4" />
        ))}

        {/* Serial number bottom */}
        <text x="154" y="107" textAnchor="middle"
          fill="#166534" fontSize="5" fontFamily="monospace" letterSpacing="0.5">
          LTC2847391A • DOT#2847391 • MC#948204
        </text>

        {/* Right edge of trailer */}
        <rect x="294" y="14" width="4" height="96" rx="2" fill="#14532d" />
      </g>

      {/* ══ FIFTH WHEEL ══ */}
      <rect x="296" y="104" width="18" height="10" rx="2" fill="#1a3d28" />

      {/* ══ CAB — Dark green (matching dollar) ══ */}
      <g filter="url(#sh2)">
        {/* Sleeper */}
        <rect x="313" y="28" width="52" height="82" rx="3" fill="url(#cabCol)" />
        {/* Sleeper window */}
        <rect x="322" y="36" width="34" height="26" rx="3" fill="url(#glass2)" opacity="0.5" />
        {/* Cab */}
        <rect x="363" y="18" width="108" height="100" rx="6" fill="url(#cabCol)" />
        {/* Cab roof */}
        <rect x="363" y="12" width="108" height="14"  rx="6" fill="url(#cabTop2)" />
        {/* Aero fairing */}
        <rect x="313" y="22" width="158" height="8"   rx="4" fill="#0f2218" />
        {/* Windshield */}
        <rect x="376" y="24" width="82" height="52"   rx="5" fill="url(#glass2)" />
        {/* Windshield tint */}
        <rect x="376" y="24" width="82" height="13"   rx="5" fill="#15803d" opacity="0.3" />
        {/* A-pillars */}
        <path d="M376 24 L370 76" stroke="#0f2218" strokeWidth="3" />
        <path d="M458 24 L465 76" stroke="#0f2218" strokeWidth="3" />
        {/* Reflection */}
        <rect x="386" y="28" width="20" height="28" rx="2" fill="white" opacity="0.08" />
        {/* Wipers */}
        <line x1="393" y1="74" x2="416" y2="60" stroke="#0f2218" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="434" y1="74" x2="452" y2="60" stroke="#0f2218" strokeWidth="1.5" strokeLinecap="round" />
        {/* Grill */}
        <rect x="466" y="56" width="20" height="48" rx="2" fill="#071510" />
        {[62,69,76,83,90,97,103].map(y => (
          <rect key={y} x={467} y={y} width="18" height="3" rx="1" fill="#142e1f" />
        ))}
        <rect x="466" y="54" width="20" height="4" rx="1" fill="#1a6b35" />
        {/* Headlights — green tinted */}
        <rect x="466" y="33" width="18" height="12" rx="2" fill="#bbf7d0" opacity="0.9" />
        <rect x="467" y="34" width="16" height="10" rx="1.5" fill="#86efac" />
        <rect x="465" y="32" width="20" height="14" rx="3" fill="none" stroke="#4ade80" strokeWidth="1.2" />
        {/* Headlight glow */}
        <ellipse cx="475" cy="39" rx="13" ry="5" fill="#86efac" opacity="0.15" filter="url(#glow2)" />
        {/* Turn signal */}
        <rect x="466" y="47" width="18" height="5" rx="2" fill="#fbbf24" opacity="0.85" />
        {/* Mirror */}
        <rect x="368" y="32" width="5"  height="20" rx="2" fill="#1a3d28" />
        <rect x="362" y="30" width="9"  height="13" rx="2" fill="#0f2218" stroke="#1a6b35" strokeWidth="0.8" />
        {/* Door line */}
        <line x1="418" y1="36" x2="418" y2="116" stroke="#0f2218" strokeWidth="1.8" />
        {/* Door handle */}
        <rect x="422" y="74" width="13" height="4" rx="2" fill="#1a6b35" />
        {/* Steps */}
        <rect x="450" y="116" width="26" height="6" rx="2" fill="#1a3d28" />
        {/* Fuel tank */}
        <rect x="452" y="90"  width="16" height="28" rx="4" fill="#1a3d28" stroke="#1a6b35" strokeWidth="0.8" />
        {/* Exhaust stacks */}
        <rect x="369" y="0"  width="7" height="26" rx="3.5" fill="#1a3d28" />
        <rect x="380" y="0"  width="7" height="26" rx="3.5" fill="#14532d" />
        <rect x="368" y="0"  width="9" height="4"  rx="2"   fill="#4ade80" opacity="0.4" />
        <rect x="379" y="0"  width="9" height="4"  rx="2"   fill="#4ade80" opacity="0.3" />
        {/* Chrome bumper */}
        <rect x="465" y="108" width="24" height="14" rx="3" fill="#166534" />
        <rect x="466" y="109" width="22" height="12" rx="2" fill="#4ade80" opacity="0.3" />
        <rect x="467" y="110" width="20" height="3"  rx="1" fill="white"   opacity="0.15" />
      </g>

      {/* ══ WHEELS ══ */}
      {/* Trailer rear */}
      {[55,73].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy={124} r={17} fill="url(#tire2)" />
          <circle cx={cx} cy={124} r={12} fill="url(#rim2)"  />
          <circle cx={cx} cy={124} r={7}  fill="#0f1f14" stroke="#1a6b35" strokeWidth="0.8" />
          <circle cx={cx} cy={124} r={2.5} fill="#4ade80" opacity="0.5" />
          {[0,60,120,180,240,300].map(a => (
            <line key={a}
              x1={cx+3*Math.cos(a*Math.PI/180)} y1={124+3*Math.sin(a*Math.PI/180)}
              x2={cx+7*Math.cos(a*Math.PI/180)} y2={124+7*Math.sin(a*Math.PI/180)}
              stroke="#1a6b35" strokeWidth="1.2"
            />
          ))}
          <circle cx={cx} cy={124} r={16} fill="none" stroke="#0a1a0f" strokeWidth="2" strokeDasharray="4,3" />
        </g>
      ))}
      {/* Trailer front */}
      {[192,210].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy={124} r={17} fill="url(#tire2)" />
          <circle cx={cx} cy={124} r={12} fill="url(#rim2)"  />
          <circle cx={cx} cy={124} r={7}  fill="#0f1f14" stroke="#1a6b35" strokeWidth="0.8" />
          <circle cx={cx} cy={124} r={2.5} fill="#4ade80" opacity="0.5" />
          {[0,60,120,180,240,300].map(a => (
            <line key={a}
              x1={cx+3*Math.cos(a*Math.PI/180)} y1={124+3*Math.sin(a*Math.PI/180)}
              x2={cx+7*Math.cos(a*Math.PI/180)} y2={124+7*Math.sin(a*Math.PI/180)}
              stroke="#1a6b35" strokeWidth="1.2"
            />
          ))}
          <circle cx={cx} cy={124} r={16} fill="none" stroke="#0a1a0f" strokeWidth="2" strokeDasharray="4,3" />
        </g>
      ))}
      {/* Steer */}
      <circle cx={420} cy={124} r={19} fill="url(#tire2)" />
      <circle cx={420} cy={124} r={14} fill="url(#rim2)"  />
      <circle cx={420} cy={124} r={8}  fill="#0f1f14" stroke="#1a6b35" strokeWidth="1" />
      <circle cx={420} cy={124} r={3}  fill="#4ade80" opacity="0.5" />
      {[0,45,90,135,180,225,270,315].map(a => (
        <line key={a}
          x1={420+4*Math.cos(a*Math.PI/180)} y1={124+4*Math.sin(a*Math.PI/180)}
          x2={420+8*Math.cos(a*Math.PI/180)} y2={124+8*Math.sin(a*Math.PI/180)}
          stroke="#1a6b35" strokeWidth="1.4"
        />
      ))}
      <circle cx={420} cy={124} r={18} fill="none" stroke="#0a1a0f" strokeWidth="2.5" strokeDasharray="5,3" />
      {/* Drive axles */}
      {[450,468].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy={124} r={17} fill="url(#tire2)" />
          <circle cx={cx} cy={124} r={12} fill="url(#rim2)"  />
          <circle cx={cx} cy={124} r={7}  fill="#0f1f14" stroke="#1a6b35" strokeWidth="0.8" />
          <circle cx={cx} cy={124} r={2.5} fill="#4ade80" opacity="0.5" />
          {[0,60,120,180,240,300].map(a => (
            <line key={a}
              x1={cx+3*Math.cos(a*Math.PI/180)} y1={124+3*Math.sin(a*Math.PI/180)}
              x2={cx+7*Math.cos(a*Math.PI/180)} y2={124+7*Math.sin(a*Math.PI/180)}
              stroke="#1a6b35" strokeWidth="1.2"
            />
          ))}
          <circle cx={cx} cy={124} r={16} fill="none" stroke="#0a1a0f" strokeWidth="2" strokeDasharray="4,3" />
        </g>
      ))}
      {/* Axle bars */}
      <rect x="48"  y="121" width="32" height="4" rx="2" fill="#0f2218" />
      <rect x="185" y="121" width="32" height="4" rx="2" fill="#0f2218" />
      <rect x="413" y="121" width="62" height="4" rx="2" fill="#0f2218" />
    </svg>
  );
}

/* ═══════════════════════════════════════
   SMOKE PUFF
═══════════════════════════════════════ */
function Smoke({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}
      initial={{ opacity: 0, scale: 0.3, y: 0 }}
      animate={{ opacity: [0, 0.45, 0], scale: [0.3, 1.6, 2.2], y: -24 }}
      transition={{ delay, duration: 1.0, repeat: Infinity, repeatDelay: 0.4 }}
    >
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(134,239,172,0.25)' }} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════
   MAIN
═══════════════════════════════════════ */
export function TruckLoadingScreen({ onDone }: { onDone: () => void }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setGone(true), 3600);
    const t2 = setTimeout(onDone, 4100);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  // Responsive: scale SVG down on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;
  const truckScale = isMobile ? 0.58 : 1;
  const svgW = 480 * truckScale;
  const svgH = 140 * truckScale;

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'radial-gradient(ellipse at 50% 55%, #071510 0%, #040c08 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            fontFamily: "'Outfit','Inter',system-ui,sans-serif",
          }}
        >
          {/* Grid */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage:
              'linear-gradient(rgba(74,222,128,1) 1px,transparent 1px),' +
              'linear-gradient(90deg,rgba(74,222,128,1) 1px,transparent 1px)',
            backgroundSize: isMobile ? '30px 30px' : '50px 50px',
          }} />

          {/* Radial glow */}
          <div style={{
            position: 'absolute', width: '100%', height: '60%', borderRadius: '50%',
            background: 'radial-gradient(ellipse,rgba(21,128,61,0.1) 0%,transparent 70%)',
            top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          }} />

          {/* ── TRUCK passes through ── */}
          <div style={{
            position: 'relative',
            width: '100vw',
            height: svgH + 20,
            overflow: 'hidden',
          }}>
            <motion.div
              initial={{ x: -(svgW + 80) }}
              animate={{ x: window.innerWidth + 80 }}
              transition={{ duration: 3.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: 'absolute',
                top: 0,
                willChange: 'transform',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              {/* Smoke */}
              <Smoke x={249 * truckScale} y={-14} delay={0} />
              <Smoke x={259 * truckScale} y={-16} delay={0.2} />
              <Smoke x={254 * truckScale} y={-10} delay={0.4} />

              {/* Truck scaled */}
              <div style={{ transform: `scale(${truckScale})`, transformOrigin: 'top left' }}>
                <DollarTruck />
              </div>
            </motion.div>
          </div>

          {/* ── BRAND ── */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            style={{ marginTop: isMobile ? 16 : 28, textAlign: 'center', padding: '0 16px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 6 }}>
              <div style={{
                width: isMobile ? 34 : 40,
                height: isMobile ? 34 : 40,
                background: 'linear-gradient(135deg,#15803d,#166534)',
                borderRadius: 11,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(74,222,128,0.3)',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: isMobile ? 17 : 20 }}>💵</span>
              </div>
              <div style={{ fontSize: isMobile ? 20 : 25, fontWeight: 900, color: 'white', letterSpacing: '-0.5px' }}>
                Load <span style={{ color: '#4ade80' }}>to Cash</span>
              </div>
            </div>
            <motion.p
              style={{ color: '#4ade80', fontSize: isMobile ? 11 : 13, margin: 0, opacity: 0.7 }}
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              🚛 Loading your dashboard...
            </motion.p>
          </motion.div>

          {/* Progress bar */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(74,222,128,0.08)' }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg,#15803d,#4ade80)',
                borderRadius: '0 2px 2px 0',
                boxShadow: '0 0 10px rgba(74,222,128,0.5)',
              }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 3.6, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
