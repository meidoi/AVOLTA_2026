import React from 'react';
import {AbsoluteFill, Sequence, OffthreadVideo, staticFile, useCurrentFrame, interpolate, Easing} from 'remotion';

const FPS = 30;
type R = [number, number, number, number]; // x0,y0,x1,y1 in source px (1920x1080)
type Box = {t0: number; t1: number; r: R};
type Zoom = {t: number; z: number; c: [number, number]};
const ease = Easing.inOut(Easing.cubic);

const zoomAt = (zs: Zoom[], t: number) => {
  let cur = zs[0];
  let res = {z: cur.z, cx: cur.c[0], cy: cur.c[1]};
  for (let i = 0; i < zs.length - 1; i++) {
    const a = zs[i], b = zs[i + 1];
    if (t >= a.t && t < b.t) {
      const p = ease(Math.min(1, (t - a.t) / Math.min(1, b.t - a.t)));
      res = {z: a.z + (b.z - a.z) * p, cx: a.c[0] + (b.c[0] - a.c[0]) * p, cy: a.c[1] + (b.c[1] - a.c[1]) * p};
    } else if (t >= b.t) res = {z: b.z, cx: b.c[0], cy: b.c[1]};
  }
  return res;
};

const Clip: React.FC<{from: number; rate: number; zooms: Zoom[]; boxes: Box[]}> = ({from, rate, zooms, boxes}) => {
  const f = useCurrentFrame(); const t = f / FPS;
  const {z, cx, cy} = zoomAt(zooms, t);
  // keep the zoom centre so the frame never shows outside the source
  const half = [960 / z, 540 / z];
  const X = Math.min(Math.max(cx, half[0]), 1920 - half[0]);
  const Y = Math.min(Math.max(cy, half[1]), 1080 - half[1]);
  const tx = 960 - X * z, ty = 540 - Y * z;
  const fade = interpolate(f, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: 'white', overflow: 'hidden', opacity: fade}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `translate(${tx}px,${ty}px) scale(${z})`}}>
        <OffthreadVideo src={staticFile('v52.mp4')} startFrom={Math.round(from * FPS)} playbackRate={rate} muted style={{width: 1920, height: 1080}} />
        {boxes.map((b, i) => {
          const p = interpolate(t, [b.t0, b.t0 + 0.25, b.t1 - 0.2, b.t1], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          if (p <= 0) return null;
          const pad = 4;
          return <div key={i} style={{position: 'absolute', left: b.r[0] - pad, top: b.r[1] - pad, width: b.r[2] - b.r[0] + 2 * pad, height: b.r[3] - b.r[1] + 2 * pad,
            border: `${3 / z}px solid #e53935`, borderRadius: 3, opacity: p}} />;
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 1 = 17.5 s, Scene 2 = 22.5 s (Olivia ~17 chars/s)
export const S1_DUR = 17.5, S2_DUR = 22.5;
export const S12_TOTAL = Math.round((S1_DUR + S2_DUR) * FPS);

export const S12: React.FC = () => (
  <AbsoluteFill style={{background: 'white'}}>
    {/* Scene 1: animated title, then the page appears on "Executive Sales view" */}
    <Sequence from={0} durationInFrames={Math.round(12 * FPS)}>
      <Clip from={136} rate={1} zooms={[{t: 0, z: 1, c: [960, 540]}, {t: 12, z: 1.05, c: [960, 500]}]} boxes={[]} />
    </Sequence>
    <Sequence from={Math.round(12 * FPS)} durationInFrames={Math.round(5.5 * FPS)}>
      <Clip from={16} rate={0.5} zooms={[{t: 0, z: 1, c: [960, 540]}]} boxes={[]} />
    </Sequence>
    {/* Scene 2 */}
    <Sequence from={Math.round(S1_DUR * FPS)} durationInFrames={Math.round(S2_DUR * FPS)}>
      <Clip from={18} rate={0.4}
        zooms={[
          {t: 0, z: 1, c: [960, 540]},
          {t: 0.6, z: 1.35, c: [420, 330]},   // menu: Executive Sales
          {t: 5.2, z: 1.35, c: [420, 330]},
          {t: 5.6, z: 1.35, c: [860, 260]},   // filters + ToDate-2
          {t: 9.0, z: 1.35, c: [860, 260]},
          {t: 9.4, z: 1.2, c: [910, 360]},    // top table
          {t: 14.4, z: 1.2, c: [910, 360]},
          {t: 14.8, z: 1.2, c: [880, 700]},   // lower table
          {t: 18.8, z: 1.2, c: [880, 700]},
          {t: 19.4, z: 1, c: [960, 540]},     // together: full view
        ]}
        boxes={[
          {t0: 1.0, t1: 5.2, r: [22, 186, 345, 268]},      // Executive Sales
          {t0: 5.8, t1: 7.6, r: [862, 120, 1078, 150]},    // Year 2026
          {t0: 7.6, t1: 9.1, r: [600, 190, 684, 215]},     // ToDate-2
          {t0: 10.6, t1: 14.4, r: [428, 220, 1385, 396]},  // top table
          {t0: 14.8, t1: 18.8, r: [428, 620, 1318, 925]},  // lower table
        ]} />
    </Sequence>
  </AbsoluteFill>
);
