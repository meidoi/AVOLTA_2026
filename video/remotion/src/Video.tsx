import React from 'react';
import {AbsoluteFill, Sequence, OffthreadVideo, Img, staticFile, useCurrentFrame, interpolate, Easing} from 'remotion';

const FPS = 30;
const V = '#6B46C1', B = '#3B82F6', O = '#F97316';
type R = [number, number, number, number];
type Cam = {t: number; r: R};
type Call = {t0: number; t1: number; text: string; at: [number, number]; color?: string};
type Rip = {t: number; at: [number, number]};
type HL = {t0: number; t1: number; r: R};
type Shot = {src: string; w: number; h: number; from?: number; rate?: number; dur: number; img?: boolean; cams: Cam[]; calls?: Call[]; rips?: Rip[]; hls?: HL[]; kinetic?: {t0: number; t1: number; text: string}[]; custom?: 'filters' | 'sting'; masks?: R[]};

const TEXTS = [
  "Welcome. Imagine you're preparing for a monthly review and need to answer one simple question: how are we really doing? Not just the total, but where things are going well and where they're not. That's exactly what the Executive Sales view is for. Let's go through it together, step by step.",
  "On the left-hand menu, Executive Sales sits right at the top: your natural starting point. When you open it, the view is already set to 2026, Day minus two. It's built around two complementary tables: the top one tracks performance month by month, while the lower one shows Year-to-Date results across business dimensions. Together, they give you instant context at every level.",
  "Before reading any number, check the filters at the top: Currency, Year, pre-set to 2026, and Business Type, set to All by default, so you can focus on Convenience, F&B or Travel Retail. By default, both tables apply ToDate minus two: actual sales, budget and last year are aligned to two days ago, for a true like-for-like comparison. On the top table you can switch it off. If you do, actuals still stop at the latest upload, but budget and last year cover the full month and the full year, so variances on open months will look larger simply because trading days are missing.",
  "Now the top table: Year Performance. It shows Net Sales month by month, with absolute and percentage variances against Budget and Last Year. With ToDate minus two on, figures compare performance up to two days ago; with it off, against the full-month and full-year targets. The key feature here is the drill-down arrow. Turn on the down arrow, then click any month to expand it day by day. You can pinpoint the days driving a variance, track promotional peaks or spot trading anomalies. To go back to the monthly overview, click the up arrow.",
  "Now the lower table. It focuses on Year-to-Date performance: actual sales against Budget and Prior Year, with the variances for each. In the 'vs Budget' column, colour bars show at a glance where the biggest gaps are, in red, and where you're beating target, in green. Above the table, eight buttons let you slice the business your way. Start broad with Region, Sub-Region or Country. Switch to Sales Channel, or go local with Operation for individual locations, down to Store for single shops. Finally, use Group to split by business model, or Shop Brand to focus on specific concepts.",
  "Here's where the view really comes alive: the two tables are fully interactive. Click any row below, for example the Airport channel or a specific country, and the Year Performance table above instantly recalculates, showing the month-by-month trend for that selection only. Click the row again to reset. In just a couple of clicks, you can isolate what's driving performance and diagnose local trends.",
  "What if you need several filters at once, like one brand, in one country, in the airport channel only? Use the Filters pane on the right. Type the field name in the search bar, for example Channel, select Sales Channel Description and tick Airport. Both tables update instantly: the monthly view at the top and every dimension below, from stores to brands. You can combine as many filters as you need to reach your exact perimeter.",
  "Keep in mind that Power BI remembers your filters between sessions. To start fresh, click Reset to default in the toolbar at the top of the page. It clears all your filters and restores the original view.",
];

const v52 = {src: 'v52.mp4', w: 1920, h: 1080};
const menu = {src: 'menu.mp4', w: 1694, h: 814};
const yp = {src: 'yp.mp4', w: 1480, h: 480};
const btn = {src: 'btn.mp4', w: 1416, h: 516};
const xf = {src: 'xf.mp4', w: 1316, h: 744};
const td = {src: 'td.mp4', w: 1282, h: 286};

const SCENES: Shot[][] = [
  // 1 Welcome (21s)
  [
    {...v52, from: 136, dur: 13, cams: [{t: 0, r: [0, 0, 1920, 1080]}, {t: 13, r: [140, 80, 1640, 922]}],
      kinetic: [{t0: 3.5, t1: 9.5, text: 'How are we <o>really</o> doing?'}]},
    {...xf, from: 0, rate: 0.25, dur: 8, cams: [{t: 0, r: [0, 0, 1316, 744]}, {t: 8, r: [0, 0, 1100, 620]}],
      kinetic: [{t0: 0.5, t1: 7.5, text: 'Executive Sales · <o>step by step</o>'}]},
  ],
  // 2 At a glance (27s)
  [
    {...menu, from: 0, rate: 0.6, dur: 9, cams: [{t: 0, r: [0, 0, 1694, 814]}, {t: 1.5, r: [0, 30, 620, 349]}, {t: 9, r: [0, 40, 560, 315]}],
      calls: [{t0: 2, t1: 8.5, text: 'Executive Sales · start here', at: [190, 121]}], rips: [{t: 3, at: [70, 121]}],
      hls: [{t0: 2, t1: 8.5, r: [4, 102, 178, 38]}]},
    {...xf, from: 0, rate: 0.2, dur: 18, cams: [
      {t: 0, r: [0, 0, 1316, 744]}, {t: 1.5, r: [0, 0, 900, 506]}, {t: 5.5, r: [0, 0, 900, 506]},
      {t: 7, r: [0, 40, 840, 473]}, {t: 11, r: [0, 40, 840, 473]}, {t: 12.5, r: [0, 300, 760, 427]}, {t: 18, r: [0, 300, 760, 427]}],
      calls: [{t0: 1.5, t1: 5.5, text: '2026 · Day minus two', at: [380, 20], color: O},
        {t0: 7, t1: 11, text: 'Month by month', at: [420, 75]}, {t0: 12.5, t1: 17.5, text: 'Year-to-Date by dimension', at: [380, 392]}],
      hls: [{t0: 1.5, t1: 5.5, r: [0, 4, 800, 34]}, {t0: 7, t1: 11, r: [32, 85, 750, 132]}, {t0: 12.5, t1: 17.5, r: [32, 400, 660, 80]}]},
  ],
  // 3 Filters & ToDate-2 (41s)
  [
    {...v52, from: 40, rate: 1, dur: 24, cams: [
      {t: 0, r: [0, 40, 1150, 647]}, {t: 1, r: [0, 50, 700, 394]}, {t: 4, r: [0, 50, 700, 394]}, {t: 5.5, r: [380, 50, 700, 394]},
      {t: 8, r: [560, 40, 560, 315]}, {t: 13, r: [560, 40, 560, 315]}, {t: 14.5, r: [0, 90, 700, 394]}, {t: 24, r: [0, 90, 760, 428]}],
      calls: [{t0: 1.2, t1: 3.8, text: 'Currency', at: [260, 86]}, {t0: 3.8, t1: 6.5, text: 'Year · 2026', at: [690, 86]},
        {t0: 7, t1: 13, text: 'All · Convenience · F&B · Travel Retail', at: [905, 205], color: O},
        {t0: 14.5, t1: 23.5, text: 'ToDate-2 · like-for-like', at: [250, 123], color: O}],
      hls: [{t0: 7, t1: 13, r: [900, 66, 165, 118]}, {t0: 14.5, t1: 23.5, r: [168, 115, 62, 18]}], rips: [{t: 8, at: [1030, 105]}, {t: 15.5, at: [200, 123]}]},
    {...td, from: 0, rate: 0.5, dur: 17, cams: [{t: 0, r: [0, 0, 1282, 286]}, {t: 2, r: [60, 0, 640, 286]}, {t: 7, r: [60, 0, 640, 286]}, {t: 9, r: [640, 0, 642, 286]}, {t: 17, r: [500, 0, 782, 286]}],
      calls: [{t0: 2.5, t1: 7, text: 'Click: ToDate-2 OFF', at: [270, 22], color: O}, {t0: 9, t1: 16.5, text: 'Full month & year → bigger variances', at: [960, 130], color: O}],
      rips: [{t: 4, at: [220, 22]}], hls: [{t0: 9, t1: 16.5, r: [980, 40, 120, 245]}]},
  ],
  // 4 Year Performance & drill-down (39s)
  [
    {...yp, from: 0, rate: 1, dur: 10, cams: [{t: 0, r: [0, 150, 1100, 330]}, {t: 1.5, r: [0, 190, 640, 290]}, {t: 5.5, r: [400, 190, 640, 290]}, {t: 10, r: [0, 150, 1100, 330]}],
      calls: [{t0: 1, t1: 5, text: 'Net Sales · month by month', at: [150, 240]}, {t0: 5.2, t1: 9.7, text: 'Variances vs Budget & Last Year', at: [150, 390], color: O}],
      hls: [{t0: 1, t1: 5, r: [60, 232, 1000, 22]}, {t0: 5.2, t1: 9.7, r: [60, 335, 1000, 105]}]},
    {...td, from: 0, rate: 0.9, dur: 9, cams: [{t: 0, r: [0, 0, 700, 286]}, {t: 4, r: [0, 0, 700, 286]}, {t: 5.5, r: [600, 0, 682, 286]}, {t: 9, r: [600, 0, 682, 286]}],
      calls: [{t0: 0.4, t1: 3.3, text: 'ToDate-2 ON · up to 2 days ago', at: [270, 22], color: V}, {t0: 3.5, t1: 8.8, text: 'OFF · full-month & full-year targets', at: [880, 22], color: O}],
      rips: [{t: 2.7, at: [220, 22]}], hls: [{t0: 0.4, t1: 3.3, r: [178, 8, 84, 28]}, {t0: 5.5, t1: 8.8, r: [985, 40, 115, 245]}]},
    {...v52, from: 244, rate: 1, dur: 7, masks: [[900, 55, 1020, 101], [900, 150, 545, 12]], cams: [
      {t: 0, r: [0, 120, 1400, 560]}, {t: 1.5, r: [1180, 90, 680, 383]}, {t: 5.5, r: [1180, 90, 680, 383]}, {t: 7, r: [0, 120, 1400, 560]}],
      calls: [{t0: 0.3, t1: 1.6, text: 'The drill-down arrow', at: [700, 140]}, {t0: 1.8, t1: 6.5, text: '↓ Turn on drill-down', at: [1430, 240], color: O}],
      rips: [{t: 4, at: [1515, 170]}]},
    {...v52, from: 251, rate: 4.6, dur: 7, masks: [[900, 55, 1020, 101], [900, 150, 545, 12]], cams: [{t: 0, r: [0, 150, 1100, 420]}, {t: 7, r: [300, 150, 1100, 420]}],
      calls: [{t0: 0.3, t1: 6.8, text: 'Day by day · vs daily Budget & LY', at: [500, 250], color: O}], hls: [{t0: 0.3, t1: 6.8, r: [20, 192, 1345, 22]}]},
    {...v52, from: 283, rate: 1, dur: 6, masks: [[900, 55, 1020, 101], [900, 150, 545, 12]], cams: [
      {t: 0, r: [1180, 90, 680, 383]}, {t: 4, r: [1180, 90, 680, 383]}, {t: 5.5, r: [0, 120, 1400, 560]}],
      calls: [{t0: 0.3, t1: 4, text: '↑ Drill-up · back to months', at: [1100, 140], color: O}, {t0: 4.3, t1: 6, text: 'Monthly overview', at: [500, 180]}],
      rips: [{t: 3, at: [1475, 170]}]},
  ],
  // 5 YTD & dimensions (42s)
  [
    {...btn, from: 8, rate: 0.22, dur: 20, cams: [{t: 0, r: [0, 130, 700, 394]}, {t: 5, r: [250, 150, 480, 270]}, {t: 20, r: [250, 150, 480, 270]}],
      calls: [{t0: 8, t1: 13, text: 'Red = gap vs budget', at: [430, 212]}, {t0: 13, t1: 19.5, text: 'Green = above target', at: [470, 270], color: '#16a34a'}],
      hls: [{t0: 6, t1: 19.5, r: [362, 195, 80, 280]}]},
    {...btn, from: 0, rate: 1.41, dur: 22, cams: [{t: 0.00, r: [0, 40, 1100, 619]}, {t: 2.44, r: [0, 60, 620, 349]}, {t: 10.59, r: [380, 60, 620, 349]}, {t: 17.93, r: [780, 60, 636, 358]}, {t: 22.00, r: [0, 40, 1100, 619]}],
      calls: [
        {t0: 0.41, t1: 2.77, text: 'Region', at: [80, 140]}, {t0: 2.85, t1: 5.62, text: 'Sub-Region', at: [213, 140]},
        {t0: 5.70, t1: 8.47, text: 'Country', at: [345, 140]}, {t0: 8.56, t1: 11.33, text: 'Sales Channel', at: [477, 140]},
        {t0: 11.41, t1: 13.77, text: 'Operation', at: [610, 140]}, {t0: 13.85, t1: 16.62, text: 'Store', at: [742, 140]},
        {t0: 16.70, t1: 19.07, text: 'Group', at: [875, 140]}, {t0: 19.15, t1: 21.84, text: 'Shop Brand', at: [1006, 140]}],
      rips: [{t: 0.41, at: [80, 105]}, {t: 2.85, at: [213, 105]}, {t: 5.70, at: [345, 105]}, {t: 8.56, at: [477, 105]}, {t: 11.41, at: [610, 105]}, {t: 13.85, at: [742, 105]}, {t: 16.70, at: [875, 105]}, {t: 19.15, at: [1006, 105]}]},
  ],
  // 6 Interactive (29s)
  [
    {...xf, from: 0, rate: 1.6, dur: 29, cams: [
      {t: 0, r: [0, 380, 760, 364]}, {t: 2.5, r: [0, 50, 820, 300]}, {t: 7, r: [0, 50, 820, 300]}, {t: 9, r: [0, 300, 760, 427]},
      {t: 17, r: [0, 300, 760, 427]}, {t: 19, r: [0, 50, 820, 300]}, {t: 25, r: [0, 50, 820, 300]}, {t: 27, r: [0, 0, 1316, 744]}],
      calls: [{t0: 0.4, t1: 2.5, text: 'Click a row', at: [120, 448], color: O}, {t0: 3, t1: 7, text: 'Top table recalculates', at: [420, 120]},
        {t0: 10, t1: 16.5, text: 'e.g. one airport: London Heathrow', at: [140, 530], color: O}, {t0: 19, t1: 25, text: 'Only that selection, month by month', at: [420, 120]},
        {t0: 26, t1: 29, text: 'Click again = reset', at: [380, 500], color: O}],
      rips: [{t: 0.6, at: [100, 448]}, {t: 11, at: [80, 530]}, {t: 26.5, at: [80, 530]}], hls: [{t0: 3, t1: 7, r: [36, 85, 745, 130]}, {t0: 19, t1: 25, r: [36, 85, 745, 130]}]},
  ],
  // 7 Filters pane mock (31s)
  [{...xf, from: 2, rate: 0, dur: 31, custom: 'filters', cams: [{t: 0, r: [0, 0, 1316, 744]}]}],
  // 8 Reset (15s) + sting
  [
    {src: 'reset.png', w: 402, h: 86, img: true, dur: 12, cams: [{t: 0, r: [0, -50, 402, 226]}, {t: 4, r: [0, -10, 200, 112]}, {t: 12, r: [0, -10, 200, 112]}],
      calls: [{t0: 4.5, t1: 11.5, text: 'Reset to default · top-left', at: [140, 60], color: O}], rips: [{t: 5.5, at: [70, 20]}]},
    {src: '', w: 1, h: 1, dur: 4, custom: 'sting', cams: [{t: 0, r: [0, 0, 1, 1]}]},
  ],
];

const sceneDur = SCENES.map((s) => s.reduce((a, b) => a + b.dur, 0));
export const TOTAL = Math.round(sceneDur.reduce((a, b) => a + b, 0) * FPS);

const ease = Easing.inOut(Easing.cubic);
function camAt(cams: Cam[], t: number, sw: number, sh: number): R {
  let r = cams[0].r;
  for (let i = 0; i < cams.length - 1; i++) {
    const a = cams[i], b = cams[i + 1];
    if (t >= a.t && t <= b.t) {
      const p = ease(Math.min(1, (t - a.t) / Math.max(0.001, Math.min(1.2, b.t - a.t))));
      r = a.r.map((v, k) => v + (b.r[k] - v) * p) as R; break;
    }
    if (t > b.t) r = b.r;
  }
  let [x, y, w, h] = r; const ar = 16 / 9;
  if (w / h > ar) { const nh = w / ar; y -= (nh - h) / 2; h = nh; } else { const nw = h * ar; x -= (nw - w) / 2; w = nw; }
  return [x, y, w, h];
}

const Pill: React.FC<{text: string; x: number; y: number; color: string; p: number}> = ({text, x, y, color, p}) => {
  const cx = Math.min(Math.max(x, 40), 1880), cy = Math.min(Math.max(y, 60), 1040);
  const avoid = cx > 1380 && cy > 700 ? -260 : 0;
  return (
    <div style={{position: 'absolute', left: Math.min(cx, 1400), top: cy + avoid - 70, transform: `translateY(${(1 - p) * 20}px)`, opacity: p,
      background: color, color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 34, padding: '10px 22px', borderRadius: 12,
      boxShadow: '0 8px 24px rgba(0,0,0,.25)', whiteSpace: 'nowrap'}}>{text}</div>
  );
};

const ShotView: React.FC<{s: Shot}> = ({s}) => {
  const f = useCurrentFrame(); const t = f / FPS;
  if (s.custom === 'sting') return <Sting />;
  const [cx, cy, cw, ch] = camAt(s.cams, t, s.w, s.h);
  const sc = 1920 / cw;
  const X = (x: number) => (x - cx) * sc, Y = (y: number) => (y - cy) * sc;
  const inP = interpolate(f, [0, 10], [0, 1], {extrapolateRight: 'clamp'});
  const media = s.img ? <Img src={staticFile(s.src)} style={{width: s.w * sc, height: s.h * sc}} />
    : s.rate === 0 ? <Img src={staticFile('xf_still.png')} style={{width: s.w * sc, height: s.h * sc}} />
    : <OffthreadVideo src={staticFile(s.src)} startFrom={Math.round((s.from || 0) * FPS)} playbackRate={s.rate || 1} muted style={{width: s.w * sc, height: s.h * sc}} />;
  return (
    <AbsoluteFill style={{background: 'white', overflow: 'hidden', opacity: inP, transform: `scale(${1.04 - 0.04 * inP})`}}>
      <div style={{position: 'absolute', left: -cx * sc, top: -cy * sc, filter: s.custom ? 'blur(6px) brightness(.85)' : undefined}}>{media}</div>
      {(s.masks || []).map((m, i) => <div key={'m'+i} style={{position: 'absolute', left: X(m[0]), top: Y(m[1]), width: m[2] * sc, height: m[3] * sc, background: '#fafafa'}} />)}
      {(s.hls || []).map((h, i) => {
        const p = interpolate(t, [h.t0, h.t0 + 0.4, h.t1 - 0.3, h.t1], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        if (p <= 0) return null;
        return <div key={i} style={{position: 'absolute', left: X(h.r[0]) - 8, top: Y(h.r[1]) - 8, width: h.r[2] * sc + 16, height: h.r[3] * sc + 16,
          border: `5px solid ${B}`, borderRadius: 10, boxShadow: `0 0 0 4000px rgba(20,10,40,${0.45 * p})`, opacity: p}} />;
      })}
      {(s.rips || []).map((r, i) => {
        const d = t - r.t; if (d < 0 || d > 0.9) return null;
        const k = d / 0.9;
        return <div key={i} style={{position: 'absolute', left: X(r.at[0]) - 60 * k, top: Y(r.at[1]) - 60 * k, width: 120 * k, height: 120 * k,
          borderRadius: '50%', border: `6px solid ${O}`, opacity: 1 - k}} />;
      })}
      {(s.calls || []).map((c, i) => {
        const p = interpolate(t, [c.t0, c.t0 + 0.27, c.t1 - 0.25, c.t1], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        if (p <= 0) return null;
        return <Pill key={i} text={c.text} x={X(c.at[0])} y={Y(c.at[1])} color={c.color || V} p={p} />;
      })}
      {(s.kinetic || []).map((k, i) => {
        const p = interpolate(t, [k.t0, k.t0 + 0.5, k.t1 - 0.4, k.t1], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        if (p <= 0) return null;
        const html = k.text.replace(/<o>/g, `<span style="color:${O}">`).replace(/<\/o>/g, '</span>');
        return <div key={i} style={{position: 'absolute', left: 120, top: 420, opacity: p, transform: `translateX(${(1 - p) * -60}px)`,
          fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: 96, color: 'white', textShadow: '0 6px 30px rgba(0,0,0,.55)'}}
          dangerouslySetInnerHTML={{__html: html}} />;
      })}
      {s.custom === 'filters' && <FiltersMock t={t} />}
    </AbsoluteFill>
  );
};

const FiltersMock: React.FC<{t: number}> = ({t}) => {
  const slide = interpolate(t, [0.5, 1.6], [560, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease});
  const typed = 'Channel'.slice(0, Math.max(0, Math.min(7, Math.floor((t - 6) * 4))));
  const showField = t > 8.5, tick = t > 11.5, pulse = t > 13 && t < 22 ? 0.5 + 0.5 * Math.sin((t - 13) * 6) : 0;
  const row = (txt: string, on: boolean, hi = false) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', borderRadius: 8, background: hi ? '#f3eefc' : 'transparent', fontSize: 28}}>
      <div style={{width: 28, height: 28, border: `3px solid ${V}`, borderRadius: 6, background: on ? V : 'white', color: 'white', textAlign: 'center', lineHeight: '24px', fontSize: 22}}>{on ? '✓' : ''}</div>{txt}</div>);
  return (
    <AbsoluteFill style={{fontFamily: 'Inter, sans-serif'}}>
      <div style={{position: 'absolute', left: 60, top: 70, width: 1180, height: 330, border: `6px solid ${O}`, borderRadius: 14, opacity: pulse}} />
      <div style={{position: 'absolute', left: 60, top: 470, width: 1180, height: 400, border: `6px solid ${O}`, borderRadius: 14, opacity: pulse}} />
      <div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: 520, background: 'white', transform: `translateX(${slide}px)`, boxShadow: '-12px 0 40px rgba(0,0,0,.25)', padding: 36}}>
        <div style={{fontSize: 40, fontWeight: 800, color: V}}>Filters</div>
        <div style={{marginTop: 24, border: `3px solid ${t > 5.5 ? B : '#ccc'}`, borderRadius: 10, padding: '14px 18px', fontSize: 30, color: '#333'}}>🔍 {typed}<span style={{opacity: t > 5.5 && t < 8.5 && Math.floor(t * 2) % 2 ? 1 : 0}}>|</span></div>
        {showField && <div style={{marginTop: 26, fontSize: 30, fontWeight: 700, color: '#1f1f3a'}}>Sales Channel Description</div>}
        {showField && <div style={{marginTop: 10}}>{row('Airport', tick, true)}{row('Toll Motorway', false)}{row('Train Station', false)}{row('Shopping Mall', false)}</div>}
      </div>
      {[[1400, 140, 3.5, 'Filters pane · on the right'], [1400, 230, 6, 'Search: Channel'], [1400, 470, 11.5, 'Tick Airport'], [300, 420, 13.5, 'Both tables update']].map(([x, y, t0, txt], i) => {
        const p = interpolate(t, [t0 as number, (t0 as number) + 0.3, (t0 as number) + 4, (t0 as number) + 4.3], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return p > 0 ? <Pill key={i} text={txt as string} x={(x as number) - (i < 3 ? 520 : 0)} y={y as number} color={i === 2 ? O : V} p={p} /> : null;
      })}
      {tick && t < 13 && <div style={{position: 'absolute', right: 520 - 52, top: 360, width: 110 * Math.min(1, (t - 11.5) / 0.9), height: 110 * Math.min(1, (t - 11.5) / 0.9), borderRadius: '50%', border: `6px solid ${O}`, transform: 'translate(50%,-50%)', opacity: 1 - Math.min(1, (t - 11.5) / 0.9)}} />}
    </AbsoluteFill>
  );
};

const Sting: React.FC = () => {
  const f = useCurrentFrame(); const p = interpolate(f, [0, 20], [0, 1], {extrapolateRight: 'clamp', easing: ease});
  return (
    <AbsoluteFill style={{background: `linear-gradient(135deg, ${V}, ${B})`, alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter, sans-serif'}}>
      <div style={{background: 'white', padding: '20px 40px', borderRadius: 18, transform: `scale(${0.8 + 0.2 * p})`, opacity: p}}><Img src={staticFile('logo.png')} style={{height: 90}} /></div>
      <div style={{color: 'white', fontSize: 64, fontWeight: 800, marginTop: 36, opacity: p}}>Executive Sales</div>
      <div style={{color: 'white', fontSize: 34, marginTop: 10, opacity: p}}>Same reliable numbers for everyone</div>
    </AbsoluteFill>
  );
};

function subs() {
  const out: {s: number; e: number; t: string}[] = []; let t0 = 0;
  TEXTS.forEach((txt, i) => {
    const parts: string[] = [];
    txt.split(/(?<=[.?!:;])\s+/).forEach((sent) => {
      if (sent.length <= 80) { parts.push(sent); return; }
      let cur = ''; sent.split(/(?<=,)\s+/).forEach((c) => { if ((cur + ' ' + c).trim().length > 80 && cur) { parts.push(cur); cur = c; } else cur = (cur + ' ' + c).trim(); }); if (cur) parts.push(cur);
    });
    const tot = parts.reduce((a, b) => a + b.length, 0); const d = sceneDur[i] - (i === 7 ? 4.5 : 0.8); let t = t0 + 0.4;
    parts.forEach((p) => { const dd = (d * p.length) / tot; out.push({s: t, e: t + dd, t: p}); t += dd; });
    t0 += sceneDur[i];
  });
  return out;
}
const SUBS = subs();

const Subs: React.FC = () => {
  const t = useCurrentFrame() / FPS; const s = SUBS.find((x) => t >= x.s && t < x.e);
  if (!s) return null;
  return <div style={{position: 'absolute', left: 80, right: 520, bottom: 54, textAlign: 'center'}}>
    <span style={{fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 38, color: 'white', background: 'rgba(20,12,45,.72)', padding: '8px 18px', borderRadius: 10, lineHeight: 1.5,
      boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'}}>{s.t}</span></div>;
};

export const Main: React.FC = () => {
  let acc = 0; const seqs: React.ReactNode[] = [];
  SCENES.forEach((shots, si) => shots.forEach((s, k) => {
    const from = Math.round(acc * FPS); const d = Math.round(s.dur * FPS); acc += s.dur;
    seqs.push(<Sequence key={`${si}-${k}`} from={from} durationInFrames={d}><ShotView s={s} /></Sequence>);
  }));
  return <AbsoluteFill style={{background: 'white'}}>{seqs}<Subs /></AbsoluteFill>;
};
