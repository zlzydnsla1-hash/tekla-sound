import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const ASSET_ROOT = '/brand-reports/tekla-sound-landing-materials/assets';
const LISTENING_IMAGE = '/brand-reports/tekla-sound-extended-anatomy/assets/tekla-sound-listening-lookbook-51f83128bf8a7bc1a24a178e24df8c9858616c46964d32225f98881f1ad1e520.png?v=flush-inwall';
const BRAND_STORY_IMAGE = '/tekla-sound/editorial/brand-story-immersive-listening-v2.png?v=nordic-listening-v3';
const FEEL_COBALT_IMAGE = '/tekla-sound/editorial/feel-tekla-cobalt.png?v=flush-inwall';
const FEEL_GREEN_IMAGE = '/tekla-sound/editorial/feel-tekla-deep-green.png?v=original-restored-final';
const INTERIOR_OBJECT_IMAGE = '/tekla-sound/interactive/interior-object-gallery-woman.png?v=woven-textile-v2';
const SPATIAL_COMPONENTS_IMAGE = '/tekla-sound/interactive/spatial-system-components-overlay.png';
const TERRACOTTA_MATERIAL_IMAGE = '/tekla-sound/materials/terracotta-woven-macro.png';
const OAK_MATERIAL_IMAGE = '/tekla-sound/materials/natural-oak-frame-macro.png';
const VERTICAL_WALL_CUTOUT = '/tekla-sound/product-cutouts/wall-terracotta-vertical-alpha.png';

const feelImages = [
  { src: BRAND_STORY_IMAGE, label: 'Terracotta atmosphere' },
  { src: FEEL_COBALT_IMAGE, label: 'Cobalt Blue atmosphere' },
  { src: FEEL_GREEN_IMAGE, label: 'Deep Green atmosphere' },
];
const audioSamples = [
  { label: 'BACH CELLO', src: '/tekla-sound/audio/01.bach_cello.mp3', volume: 0.35 },
  { label: 'BACH JAZZ', src: '/tekla-sound/audio/02.bach_jazz.mp3', volume: 0.6 },
  { label: 'DEBUSSY PIANO', src: '/tekla-sound/audio/03.debussy_piano.mp3', volume: 0.35 },
];
const conceptSpecs = [
  { label: 'SPATIAL ENGINE', value: '4–8 CH DSP', detail: 'Beam width · delay tuning' },
  { label: 'SYSTEM OUTPUT', value: '1,200 W RMS', detail: 'Up to 116 dB SPL target' },
  { label: 'FREQUENCY RANGE', value: '20 Hz–24 kHz', detail: 'Tactile low range · 20–80 Hz' },
  { label: 'WIRELESS', value: 'Bluetooth 5.4', detail: 'Wi-Fi 6 · AirPlay 2 · aptX Adaptive' },
  { label: 'ARCHITECTURAL I/O', value: 'Hidden backbone', detail: 'HDMI eARC · Ethernet · Optical · AES/EBU' },
  { label: 'ROOM CALIBRATION', value: 'Listening-aware', detail: 'Microphone-based room correction' },
];

const assets = {
  hero: '/tekla-sound/hero/wall-wide-gallery-showroom-v3.png?v=textless-flush-restored',
  terracotta: '/tekla-sound/colorways/wall-wide-terracotta-alpha.png',
  ivory: '/tekla-sound/colorways/wall-wide-ivory-alpha.png?v=warm-ivory-2',
  beige: '/tekla-sound/colorways/wall-wide-beige-alpha.png?v=bottom-cleanup',
  cobalt: '/tekla-sound/colorways/wall-wide-cobalt-blue-alpha.png?v=bottom-cleanup',
  green: '/tekla-sound/colorways/wall-wide-deep-green-alpha.png?v=bottom-cleanup',
  wall: `${ASSET_ROOT}/still-wall-01-woven-textile-v2.png`,
  niche: `${ASSET_ROOT}/still-niche-02-dbe601cc5a0eba0caeae48c959c15b8e87e2db79c6f7992e3cc4dae582c561e2.jpg?v=wall-brightness`,
  beam: `${ASSET_ROOT}/still-beam-03-7f5f9799323ece967fc776d071c315a42825809c41bfa2e01eb9835ec64ce3f3.jpg?v=wall-brightness`,
  material: `${ASSET_ROOT}/still-wall-material-detail-f6725a63587fb0ba94c61833940f878ff3fdbbc6b6e2382503b13dbcaf0cc7d5.jpg`,
};

const colorways = [
  { id: 'terracotta', label: 'Terracotta', color: '#C2513A', image: assets.terracotta },
  { id: 'ivory', label: 'Ivory', color: '#E7E0D2', image: assets.ivory },
  { id: 'beige', label: 'Beige', color: '#B9A58F', image: assets.beige },
  { id: 'cobalt', label: 'Cobalt Blue', color: '#2457C5', image: assets.cobalt },
  { id: 'green', label: 'Deep Green', color: '#173F35', image: assets.green },
];

const values = [
  { id: '01', title: 'Natural material', body: '직물, 오크나무 등 자연 요소로 만들어져 공간에 녹아듭니다.' },
  { id: '02', title: 'Spatial system', body: '복잡한 라인을 없앤 공간 내장으로 3D 사운드 시스템을 설계합니다.' },
  { id: '03', title: 'Interior object', body: '작품처럼 감상하는 인테리어 오브제 사운드입니다.' },
];

const products = [
  {
    eyebrow: 'STILL SERIES / WALL',
    headline: ['The wall', 'becomes sound.'],
    body: <>스피커의 부피 대신 직물 작품의 존재감만 남깁니다.<br />건축 면에 사운드를 내장해 공간의 중심을<br />하나의 음악적 장면으로 바꿉니다.</>,
    image: assets.wall,
    alt: '벽면에 설치된 테라코타 직물 마감의 TEKLA SOUND Wall',
  },
  {
    eyebrow: 'STILL SERIES / NICHE',
    headline: ['Sound in', 'every surface.'],
    body: '가느다란 비례와 페어 구성이 좁은 벽면까지 사운드의 깊이를 확장합니다. 눈에 띄는 부피 없이 공간의 여러 면을 하나의 경험으로 잇습니다.',
    image: assets.niche,
    alt: '선반 양옆의 좁은 벽면에 페어로 설치된 TEKLA SOUND Niche',
  },
  {
    eyebrow: 'STILL SERIES / BEAM',
    headline: ['A horizon', 'you can feel.'],
    body: <>낮고 긴 직물 면이 건축의 수평선에 스며듭니다.<br />시각적 부피를 더하지 않으면서 공간을<br />가로지르는 음악의 깊이를 감각하게 합니다.</>,
    image: assets.beam,
    alt: '창가 벤치의 수평선에 내장된 TEKLA SOUND Beam',
  },
];

const typeSx = { fontFamily: 'Pretendard, "Pretendard Variable", sans-serif' };
const displayHeadingSx = {
  ...typeSx,
  fontWeight: 300,
  lineHeight: 1.34,
  letterSpacing: '-0.045em',
  whiteSpace: 'nowrap',
};
const splitSectionSx = {
  display: 'grid',
  gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' },
  height: { md: 'clamp(680px, 78vh, 840px)' },
  overflow: 'hidden',
};
const splitImageSx = {
  width: '100%',
  height: { xs: 420, md: '100%' },
  minWidth: 0,
  minHeight: 0,
  display: 'block',
  objectFit: 'cover',
};

function ValueVisual({ activeValue }) {
  if (activeValue === '01') {
    return (
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" gap={{ xs: 5, md: 10 }}>
        {[
          ['Woven textile', TERRACOTTA_MATERIAL_IMAGE],
          ['Natural oak', OAK_MATERIAL_IMAGE],
        ].map(([label, image], index) => (
          <Box key={label} sx={{ textAlign: 'center', animation: `materialReveal 650ms ${index * 120}ms both cubic-bezier(.2,.8,.2,1)` }}>
            <Box component="img" src={image} alt={label} sx={{ width: { xs: 190, md: 280 }, aspectRatio: '1', borderRadius: '50%', objectFit: 'cover', display: 'block', boxShadow: '0 20px 50px rgba(27,26,24,.12)' }} />
            <Typography sx={{ ...typeSx, mt: 2.5, fontSize: 14, fontWeight: 500 }}>{label}</Typography>
          </Box>
        ))}
      </Stack>
    );
  }

  if (activeValue === '02') {
    return (
      <Box sx={{ position: 'relative', minHeight: { xs: 360, md: 500 }, display: 'grid', placeItems: 'center', overflow: 'hidden', bgcolor: '#DED8CE' }}>
        <Box sx={{ position: 'relative', zIndex: 2, width: { xs: '92%', md: '76%' }, aspectRatio: '1.5 / 1', overflow: 'hidden' }}>
          <Box component="img" src={assets.terracotta} alt="공간 내장형 TEKLA SOUND Wall Wide" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
          <Box component="img" src={SPATIAL_COMPONENTS_IMAGE} alt="제품 내부에 탑재된 우퍼, 미드레인지, 덕트와 연결선" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', transformOrigin: 'center', animation: 'componentsEmbed 2.6s both cubic-bezier(.4,0,.2,1)' }} />
        </Box>
        <Typography sx={{ ...typeSx, position: 'absolute', left: 0, right: 0, bottom: 24, textAlign: 'center', fontSize: 12, fontWeight: 500, letterSpacing: '.1em', animation: 'captionReveal 400ms 1.7s both' }}>ARCHITECTURE BECOMES THE SYSTEM</Typography>
      </Box>
    );
  }

  return <Box component="img" src={INTERIOR_OBJECT_IMAGE} alt="미술관에서 TEKLA SOUND를 작품처럼 감상하는 여성의 뒷모습" sx={{ width: '100%', height: { xs: 420, md: 620 }, objectFit: 'cover', display: 'block', animation: 'galleryReveal 800ms both cubic-bezier(.2,.8,.2,1)' }} />;
}

function TeklaSoundLanding() {
  const [activeColor, setActiveColor] = useState(colorways[0]);
  const [activeValue, setActiveValue] = useState('01');
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [activeSample, setActiveSample] = useState(0);
  const [activeFeelSlide, setActiveFeelSlide] = useState(0);
  const audioRef = useRef(null);
  const fadeTimerRef = useRef(null);
  const restorePrimary = () => setActiveColor(colorways[0]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveFeelSlide((current) => (current + 1) % feelImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => () => {
    if (fadeTimerRef.current) window.clearInterval(fadeTimerRef.current);
  }, []);

  const clearAudioFade = () => {
    if (fadeTimerRef.current) {
      window.clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };

  const playSample = async (sampleIndex) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearAudioFade();
    const nextSource = audioSamples[sampleIndex].src;
    const resolvedSource = new URL(nextSource, window.location.href).href;
    if (audio.currentSrc !== resolvedSource) {
      audio.pause();
      audio.src = nextSource;
      audio.load();
    }
    audio.volume = audioSamples[sampleIndex].volume;
    try {
      await audio.play();
    } catch (error) {
      if (error?.name !== 'AbortError') setIsSpeakerOn(false);
    }
  };

  const setSpeakerPower = (nextState) => {
    const audio = audioRef.current;
    setIsSpeakerOn(nextState);
    if (nextState) {
      playSample(activeSample);
      return;
    }
    if (!audio || audio.paused) return;
    clearAudioFade();
    const startVolume = audio.volume;
    let step = 0;
    fadeTimerRef.current = window.setInterval(() => {
      step += 1;
      audio.volume = Math.max(0, startVolume * (1 - step / 10));
      if (step >= 10) {
        clearAudioFade();
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 0.35;
      }
    }, 50);
  };

  const selectSample = async (sampleIndex) => {
    setActiveSample(sampleIndex);
    if (isSpeakerOn) await playSample(sampleIndex);
  };

  return (
    <Box sx={{ ...typeSx, bgcolor: '#F3EFE7', color: '#1B1A18', minHeight: '100vh', '@keyframes materialReveal': { from: { opacity: 0, transform: 'translateY(20px) scale(.96)' }, to: { opacity: 1, transform: 'none' } }, '@keyframes componentsEmbed': { '0%, 38.5%': { opacity: 1, transform: 'scale(1)', filter: 'blur(0)' }, '100%': { opacity: 0, transform: 'scale(.94)', filter: 'blur(4px)' } }, '@keyframes captionReveal': { from: { opacity: 0, transform: 'translateY(8px)' }, to: { opacity: 1, transform: 'none' } }, '@keyframes galleryReveal': { from: { opacity: 0, transform: 'scale(1.025)' }, to: { opacity: 1, transform: 'scale(1)' } }, '@keyframes speakerVibration': { '0%, 100%': { transform: 'translate3d(0,0,0) rotate(0)' }, '20%': { transform: 'translate3d(1.1px,-.55px,0) rotate(.035deg)' }, '40%': { transform: 'translate3d(-1.4px,.45px,0) rotate(-.045deg)' }, '60%': { transform: 'translate3d(.85px,.6px,0) rotate(.028deg)' }, '80%': { transform: 'translate3d(-.9px,-.35px,0) rotate(-.03deg)' } }, '@keyframes feelCobaltRoll': { '0%, 30%': { opacity: 0 }, '34%, 63%': { opacity: 1 }, '67%, 100%': { opacity: 0 } }, '@keyframes feelGreenRoll': { '0%, 63%': { opacity: 0 }, '67%, 96%': { opacity: 1 }, '100%': { opacity: 0 } }, '@media (prefers-reduced-motion: reduce)': { '& *': { animationDuration: '1ms !important', animationDelay: '0ms !important' } } }}>
      <Box component="header" sx={{ position: 'absolute', inset: '0 0 auto', zIndex: 2, px: { xs: 2.5, md: 5 }, py: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ ...typeSx, fontSize: 15, fontWeight: 600, letterSpacing: '0.08em' }}>TEKLA SOUND</Typography>
          <Button color="inherit" href="#listening" sx={{ ...typeSx, fontWeight: 500, borderBottom: '1px solid currentColor', px: 0 }}>Private listening</Button>
        </Stack>
      </Box>

      <Box component="section" sx={{ minHeight: '100svh', position: 'relative', display: 'grid', alignItems: 'end', overflow: 'hidden' }}>
        <Box component="img" src={assets.hero} alt="넓은 거실 벽면에 작품처럼 설치된 TEKLA SOUND Wall Wide" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(20,18,14,.48) 0%, rgba(20,18,14,.08) 55%, transparent 75%)' }} />
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, px: { xs: 2.5, md: 5 }, pb: { xs: 7, md: 10 }, color: '#fff' }}>
          <Typography sx={{ ...typeSx, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', mb: 2 }}>ARCHITECTURAL SOUND</Typography>
          <Typography component="h1" sx={{ ...displayHeadingSx, ml: '-0.04em', maxWidth: 780, fontSize: 'clamp(3.5rem, 8vw, 8.5rem)', lineHeight: { xs: 'calc(1em + 7.5px)', md: 'calc(1em + 12px)' } }}><Box component="span" sx={{ display: 'block' }}>Sound, woven</Box><Box component="span" sx={{ display: 'block' }}>in to space.</Box></Typography>
          <Typography sx={{ ...typeSx, mt: '30px', maxWidth: 620, fontSize: { xs: 17, md: 20 }, fontWeight: 300, lineHeight: 1.65, wordBreak: 'keep-all' }}>사운드는 보이는 것이 아니라 공간 안에서 경험하는 것입니다.<br />건축 안에 설계한 사운드 시스템으로 미세한 음의 결까지 진동으로 감각하는 새로운 경험을 선보입니다.</Typography>
        </Container>
      </Box>

      <Container component="section" maxWidth={false} sx={{ px: { xs: 2.5, md: 5 }, py: { xs: 10, md: 18 } }}>
        <Typography component="h2" sx={{ ...displayHeadingSx, maxWidth: 900, fontSize: 'clamp(2.8rem, 6vw, 6.5rem)', lineHeight: 'calc(1.34em - 10px)' }}>We focuses on<br />spatial experiences.</Typography>
        <Typography sx={{ ...typeSx, mt: 3, fontSize: { xs: 20, md: 28 }, fontWeight: 400 }}>부피는 최소화하고, 감각은 더 확장됩니다.</Typography>
        <Box sx={{ mt: { xs: 8, md: 14 }, borderTop: '1px solid rgba(27,26,24,.35)' }}>
          {values.map(({ id, title, body }) => (
            <Box component="button" type="button" key={id} onClick={() => setActiveValue(id)} aria-pressed={activeValue === id} sx={{ width: '100%', appearance: 'none', border: 0, borderBottom: '1px solid rgba(27,26,24,.22)', bgcolor: activeValue === id ? 'rgba(27,26,24,.045)' : 'transparent', color: 'inherit', textAlign: 'left', display: 'grid', gridTemplateColumns: { xs: '48px 1fr', md: '100px minmax(220px, .7fr) 1fr 28px' }, gap: 2, py: 4, px: { xs: 1, md: 2 }, cursor: 'pointer', transition: 'background-color 180ms ease', '&:hover, &:focus-visible': { bgcolor: 'rgba(27,26,24,.06)', outline: 'none' } }}>
              <Typography sx={{ ...typeSx, fontWeight: 500 }}>{id}</Typography>
              <Typography sx={{ ...typeSx, fontSize: 22, fontWeight: 500 }}>{title}</Typography>
              <Typography sx={{ ...typeSx, gridColumn: { xs: '2', md: 'auto' }, maxWidth: 560, fontSize: 17, lineHeight: 1.7, fontWeight: 300, wordBreak: 'keep-all' }}>{body}</Typography>
              <Typography aria-hidden="true" sx={{ ...typeSx, gridColumn: { xs: '2', md: 'auto' }, justifySelf: 'end', fontSize: 22, fontWeight: 300, transform: activeValue === id ? 'rotate(45deg)' : 'none', transition: 'transform 180ms ease' }}>+</Typography>
            </Box>
          ))}
        </Box>
        <Box key={activeValue} sx={{ mt: { xs: 6, md: 8 }, overflow: 'hidden' }}><ValueVisual activeValue={activeValue} /></Box>
      </Container>

      <Box component="section" sx={{ pt: { xs: 5, md: 8 }, pb: { xs: 10, md: 16 }, bgcolor: '#F3EFE7', color: '#171512' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 5 }, display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1.05fr) minmax(0, .95fr)' }, alignItems: 'center', gap: { xs: 6, md: 7 } }}>
          <Box sx={{ minWidth: 0 }}>
            <Typography component="h2" sx={{ ...displayHeadingSx, fontSize: { xs: 'clamp(1.35rem, 5.5vw, 2rem)', md: 'clamp(2.4rem, 4.3vw, 5rem)' } }}><Box component="span" sx={{ display: 'block' }}>Redefining</Box><Box component="span" sx={{ display: 'block' }}>the sound experience</Box><Box component="span" sx={{ display: 'block' }}>forever.</Box></Typography>
            <Typography sx={{ ...typeSx, maxWidth: 850, mt: { xs: 5, md: 7 }, fontSize: { xs: 16, md: 20 }, fontWeight: 300, lineHeight: 1.8, wordBreak: 'keep-all' }}>
              <Box component="span" sx={{ display: 'block' }}><Box component="span" sx={{ fontWeight: 600 }}>Tekla Sound</Box>는 공간 전체가 울리는 몰입과 휴식을 제안합니다.</Box>
              <Box component="span" sx={{ display: 'block' }}>물리적 부피에서 해방된 사운드는 공간에 스며들어 입체화됩니다.</Box>
              <Box component="span" sx={{ display: 'block' }}>미세한 음의 결도 공간을 타고 전해지는 진동으로 경험되며,</Box>
              <Box component="span" sx={{ display: 'block' }}>스피커는 비로소 사라지고 공간 전체가 감각적인 음향 경험으로 바뀝니다.</Box>
            </Typography>
          </Box>
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifySelf: 'center' }}>
            <Box component="img" src={VERTICAL_WALL_CUTOUT} alt="테라코타 직물 마감의 세로형 TEKLA SOUND Wall 제품 누끼" sx={{ width: 'min(100%, 520px)', maxHeight: { xs: 620, md: 760 }, display: 'block', objectFit: 'contain', transformOrigin: 'center', willChange: isSpeakerOn ? 'transform' : 'auto', animation: isSpeakerOn ? 'speakerVibration .42s infinite linear' : 'none', '@media (prefers-reduced-motion: reduce)': { animation: 'none', willChange: 'auto' } }} />
            <Box role="group" aria-label="제품 음향 상태" sx={{ mt: 2, display: 'flex', gap: '2px', border: '1px solid rgba(23,21,18,.12)', borderRadius: '999px', bgcolor: 'rgba(213,206,195,.72)', p: '3px', boxShadow: 'inset 0 1px 2px rgba(23,21,18,.08)', backdropFilter: 'blur(12px)' }}>
              {[true, false].map((value) => {
                const selected = isSpeakerOn === value;
                return <Button key={String(value)} type="button" color="inherit" aria-pressed={selected} onClick={() => setSpeakerPower(value)} sx={{ ...typeSx, minWidth: 50, minHeight: 32, px: 1.75, py: .5, borderRadius: '999px', fontSize: 11, fontWeight: 600, letterSpacing: '.08em', bgcolor: selected ? 'rgba(255,255,255,.94)' : 'transparent', color: selected ? '#171512' : 'rgba(23,21,18,.5)', boxShadow: selected ? '0 1px 4px rgba(23,21,18,.18), 0 1px 1px rgba(23,21,18,.08)' : 'none', transition: 'background-color 180ms ease, color 180ms ease, box-shadow 180ms ease', '&:hover': { bgcolor: selected ? '#FFF' : 'rgba(255,255,255,.34)' } }}>{value ? 'ON' : 'OFF'}</Button>;
              })}
            </Box>
            <Stack direction="row" flexWrap="wrap" justifyContent="center" gap={{ xs: 1.5, md: 2 }} sx={{ mt: 2.5 }}>
              {audioSamples.map((sample, index) => (
                <Button key={sample.label} type="button" color="inherit" aria-pressed={activeSample === index} onClick={() => selectSample(index)} sx={{ ...typeSx, minWidth: 0, px: 0, pb: .5, borderRadius: 0, borderBottom: activeSample === index ? '1px solid #171512' : '1px solid transparent', fontSize: 10, fontWeight: activeSample === index ? 600 : 400, letterSpacing: '.08em', color: activeSample === index ? '#171512' : 'rgba(23,21,18,.48)' }}>{String(index + 1).padStart(2, '0')} {sample.label}</Button>
              ))}
            </Stack>
            <Box component="audio" ref={audioRef} preload="metadata" loop sx={{ display: 'none' }} />
          </Box>
        </Container>
      </Box>

      <Box component="section" aria-label="TEKLA SOUND immersive listening scene" sx={{ position: 'relative', bgcolor: '#F3EFE7' }}>
        {feelImages.map((item, index) => (
          <Box component="img" key={item.label} src={item.src} alt={index === activeFeelSlide ? item.label : ''} aria-hidden={index !== activeFeelSlide} sx={{ position: index === 0 ? 'relative' : 'absolute', inset: index === 0 ? 'auto' : 0, width: '100%', height: { xs: 480, md: '88vh' }, minHeight: { md: 680 }, display: 'block', objectFit: 'cover', objectPosition: index === 0 ? { xs: '72% center', md: '60% center' } : { xs: '62% center', md: 'center' }, transform: index === 0 ? 'scale(1.06)' : 'none', opacity: index === activeFeelSlide ? 1 : 0, transition: 'opacity 800ms ease-in-out', '@media (prefers-reduced-motion: reduce)': { transitionDuration: '1ms' } }} />
        ))}
        <Box sx={{ position: 'absolute', left: '50%', bottom: { xs: 22, md: 30 }, zIndex: 2, transform: 'translateX(-50%)', display: 'flex', gap: 1.25 }}>
          {feelImages.map((item, index) => (
            <Box component="button" key={item.label} type="button" aria-label={`${item.label} 이미지 보기`} aria-pressed={activeFeelSlide === index} onClick={() => setActiveFeelSlide(index)} sx={{ width: 12, height: 12, p: 0, borderRadius: '50%', border: '1px solid rgba(23,21,18,.72)', bgcolor: activeFeelSlide === index ? '#171512' : 'rgba(243,239,231,.68)', boxShadow: '0 1px 4px rgba(23,21,18,.18)', cursor: 'pointer', transition: 'background-color 180ms ease, transform 180ms ease', transform: activeFeelSlide === index ? 'scale(1.08)' : 'none' }} />
          ))}
        </Box>
      </Box>

      <Box component="section" sx={{ py: { xs: 10, md: 16 }, bgcolor: '#E9E1D4' }}>
        <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 5 } }}>
          <Typography sx={{ ...typeSx, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>WALL WIDE / COLOR SYSTEM</Typography>
          <Typography component="h2" sx={{ ...displayHeadingSx, mt: 2, fontSize: 'clamp(2.8rem, 5vw, 5.5rem)' }}>One form.<br />Five atmospheres.</Typography>
          <Box sx={{ mt: 5, mb: { xs: 0.4375, md: 0.75 }, minHeight: { xs: 240, md: 520 }, display: 'grid', placeItems: 'center' }}>
            <Box component="img" src={activeColor.image} alt={`${activeColor.label} 직물 마감의 TEKLA SOUND Wall Wide`} sx={{ width: 'min(100%, 1250px)', display: 'block', objectFit: 'contain', transition: 'opacity 180ms ease' }} />
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', sm: 'repeat(5, minmax(0, 1fr))' }, columnGap: { xs: 2, md: 4 }, rowGap: 3, width: 'min(100%, 720px)', mx: 'auto' }} onMouseLeave={restorePrimary}>
            {colorways.map((item) => (
              <Box component="button" key={item.id} type="button" aria-label={`${item.label} 컬러 보기`} aria-pressed={activeColor.id === item.id} onMouseEnter={() => setActiveColor(item)} onFocus={() => setActiveColor(item)} onBlur={restorePrimary} sx={{ appearance: 'none', border: 0, bgcolor: 'transparent', p: 0, width: '100%', minWidth: 0, cursor: 'pointer', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center', ...typeSx }}>
                <Box sx={{ width: { xs: 34, md: 44 }, height: { xs: 34, md: 44 }, flexShrink: 0, bgcolor: item.color, border: activeColor.id === item.id ? '2px solid #1B1A18' : '1px solid rgba(27,26,24,.25)', outline: '3px solid #E9E1D4', outlineOffset: activeColor.id === item.id ? 3 : 0, transition: 'outline-offset 160ms ease' }} />
                <Typography component="span" sx={{ ...typeSx, display: 'block', width: '100%', mt: 1.5, fontSize: 12, lineHeight: 1.4, textAlign: 'center', whiteSpace: 'nowrap', fontWeight: activeColor.id === item.id ? 600 : 400 }}>{item.label}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      <Box component="section">
        {products.map((product, index) => (
          <Box key={product.eyebrow} sx={{ ...splitSectionSx, bgcolor: index % 2 ? '#D8D0C2' : '#F3EFE7' }}>
            <Box component="img" src={product.image} alt={product.alt} sx={{ ...splitImageSx, objectPosition: index === 0 ? '36% center' : 'center', order: { md: index % 2 ? 1 : 2 } }} />
            <Box sx={{ minWidth: 0, height: '100%', p: { xs: 4, md: 8, lg: 12 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', order: { md: index % 2 ? 2 : 1 } }}>
              <Typography sx={{ ...typeSx, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>{product.eyebrow}</Typography>
              <Typography component="h2" sx={{ ...displayHeadingSx, mt: 2, fontSize: 'clamp(2.8rem, 5vw, 5.8rem)' }}>{product.headline.map((line) => <Box component="span" key={line} sx={{ display: 'block' }}>{line}</Box>)}</Typography>
              <Typography sx={{ ...typeSx, mt: 4, maxWidth: 560, fontSize: 18, fontWeight: 300, lineHeight: 1.7, wordBreak: 'keep-all' }}>{product.body}</Typography>
              <Button color="inherit" sx={{ ...typeSx, mt: 5, px: 0, alignSelf: 'flex-start', fontWeight: 600, borderBottom: '1px solid currentColor' }}>Explore</Button>
            </Box>
          </Box>
        ))}
      </Box>

      <Box component="section" sx={{ ...splitSectionSx, bgcolor: '#D8D0C2', color: '#171512' }}>
        <Box component="img" src={assets.material} alt="직물 표면과 오크 프레임, 하단 음향 슬롯의 근접 디테일" sx={splitImageSx} />
        <Box sx={{ minWidth: 0, height: '100%', p: { xs: 4, md: 8, lg: 12 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          <Typography sx={{ ...typeSx, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>MATERIAL DETAIL</Typography>
          <Typography component="h2" sx={{ ...displayHeadingSx, mt: 2, fontSize: 'clamp(3rem, 5vw, 6rem)' }}><Box component="span" sx={{ display: 'block' }}>Sound you</Box><Box component="span" sx={{ display: 'block' }}>can almost touch.</Box></Typography>
          <Typography sx={{ ...typeSx, mt: 4, fontSize: 18, lineHeight: 1.7, fontWeight: 300 }}>직물의 결, 오크의 온기, 하나의 깊은 음향 라인.<br />기술은 표면 아래로 사라지고 감각만 남습니다.</Typography>
        </Box>
      </Box>

      <Box component="section" sx={{ bgcolor: '#E9E1D4', color: '#171512', py: { xs: 10, md: 15 } }}>
        <Container maxWidth={false} sx={{ px: { xs: 2.5, md: 5 } }}>
          <Typography sx={{ ...typeSx, fontSize: 11, fontWeight: 600, letterSpacing: '.14em' }}>CONCEPT SPECIFICATION / DIRECTIONAL</Typography>
          <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'minmax(0, .8fr) minmax(0, 1.2fr)' }, gap: { xs: 5, md: 10 }, alignItems: 'end' }}>
            <Typography component="h2" sx={{ ...displayHeadingSx, fontSize: 'clamp(2.6rem, 5vw, 5.8rem)' }}><Box component="span" sx={{ display: 'block' }}>Engineered</Box><Box component="span" sx={{ display: 'block' }}>to disappear.</Box></Typography>
            <Typography sx={{ ...typeSx, maxWidth: 720, fontSize: { xs: 16, md: 19 }, lineHeight: 1.75, fontWeight: 300, wordBreak: 'keep-all' }}>시스템은 건축 면 뒤로 숨기고,<br />청취자에게 입체적인 음향과 진동만 선사합니다.</Typography>
          </Box>
          <Box sx={{ mt: { xs: 7, md: 10 }, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' }, borderTop: '1px solid rgba(23,21,18,.3)', borderLeft: { lg: '1px solid rgba(23,21,18,.18)' } }}>
            {conceptSpecs.map((spec) => (
              <Box key={spec.label} sx={{ minHeight: 190, p: { xs: '28px 0', sm: 3.5, md: 4 }, borderRight: { sm: '1px solid rgba(23,21,18,.18)' }, borderBottom: '1px solid rgba(23,21,18,.18)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography sx={{ ...typeSx, fontSize: 10, fontWeight: 600, letterSpacing: '.13em', color: 'rgba(23,21,18,.55)' }}>{spec.label}</Typography>
                <Box sx={{ mt: 5 }}>
                  <Typography sx={{ ...typeSx, fontSize: { xs: 24, md: 28 }, fontWeight: 400, letterSpacing: '-.025em' }}>{spec.value}</Typography>
                  <Typography sx={{ ...typeSx, mt: 1, fontSize: 13, lineHeight: 1.5, fontWeight: 300, color: 'rgba(23,21,18,.68)' }}>{spec.detail}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Typography sx={{ ...typeSx, mt: 3, fontSize: 11, lineHeight: 1.6, fontWeight: 300, color: 'rgba(23,21,18,.55)' }}>* Concept targets for design development. Final performance, certification and connectivity are subject to prototype validation.</Typography>
        </Container>
      </Box>

      <Box id="listening" component="section" sx={{ minHeight: '72vh', color: '#171512', display: 'grid', placeItems: 'center', textAlign: 'center', px: 3, py: 10, backgroundImage: `linear-gradient(rgba(243,239,231,.66), rgba(243,239,231,.66)), url(${LISTENING_IMAGE})`, backgroundSize: 'cover', backgroundPosition: { xs: '62% center', md: 'center 42%' } }}>
        <Box>
          <Typography sx={{ ...typeSx, fontSize: 12, fontWeight: 600, letterSpacing: '0.14em' }}>PRIVATE LISTENING</Typography>
          <Typography component="h2" sx={{ ...displayHeadingSx, mt: 2, maxWidth: 980, fontSize: 'clamp(2.24rem, 4.9vw, 5.6rem)' }}><Box component="span" sx={{ display: 'block' }}>Enter the room.</Box><Box component="span" sx={{ display: 'block' }}>Feel every note.</Box></Typography>
          <Button variant="outlined" sx={{ ...typeSx, mt: 6, px: 4, py: 1.5, borderRadius: '999px', border: '1px solid #C2513A', bgcolor: 'rgba(255,255,255,.22)', color: '#C2513A', fontWeight: 600, boxShadow: 'inset 0 1px 0 rgba(255,255,255,.5), 0 6px 20px rgba(23,21,18,.06)', backdropFilter: 'blur(14px)', textTransform: 'none', '&:hover': { border: '1px solid #C2513A', bgcolor: 'rgba(255,255,255,.38)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,.65), 0 8px 24px rgba(23,21,18,.08)' } }}>Book a private listening</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TeklaSoundLanding;
