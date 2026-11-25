import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Building2,
  FileText,
  AlertTriangle,
  Users,
  CheckCircle2,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { useI18n } from '../../../i18n/I18nProvider';

const SCENE_DURATION = 6000;

const scenes = [
  { time: '00:00', label: 'University Onboarding' },
  { time: '00:45', label: 'AI Topic-Overlap Checking' },
  { time: '01:30', label: 'Supervisor Matching' },
  { time: '02:15', label: 'Dashboard & Reporting' },
];

interface AnimatedDemoProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function AnimatedDemo({ activeIndex, onSelect }: AnimatedDemoProps) {
  const { t } = useI18n();
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const startRef = useRef<number>(performance.now());

  useEffect(() => {
    startRef.current = performance.now();
    setProgress(0);
    if (!playing) return;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - startRef.current) / SCENE_DURATION);
      setProgress(p);
      if (p >= 1) {
        onSelect((activeIndex + 1) % scenes.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [activeIndex, playing, onSelect]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(107, 33, 245, 0.25) 0%, rgba(13, 11, 31, 1) 70%)',
        }}
      />
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2 text-xs text-white/70">
          <div className="w-2 h-2 rounded-full bg-red-500/80" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
          <div className="w-2 h-2 rounded-full bg-green-500/80" />
          <span className="ml-2">akep.app/demo</span>
        </div>
        <div className="text-xs text-white/50">{t('video.illustration')}</div>
      </div>

      <div className="absolute inset-0 pt-12 pb-6 px-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex items-center justify-center"
          >
            {activeIndex === 0 && <SceneOnboarding />}
            {activeIndex === 1 && <SceneDuplicate />}
            {activeIndex === 2 && <SceneSupervisor />}
            {activeIndex === 3 && <SceneDashboard />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPlaying(!playing)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
            aria-label={playing ? t('video.pause') : t('video.play')}
          >
            {playing ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>
          <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, #6B21F5, #A78BFA)',
                transition: 'width 80ms linear',
              }}
            />
          </div>
          <div className="text-xs text-white/60 tabular-nums">
            {String(activeIndex + 1).padStart(2, '0')} / {String(scenes.length).padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="rounded-xl border p-4"
      style={{
        borderColor: 'rgba(255,255,255,0.08)',
        background: 'rgba(20,16,43,0.7)',
      }}
    >
      {children}
    </motion.div>
  );
}

function SceneOnboarding() {
  const { t } = useI18n();
  const labels = t('video.onboarding').split('|');
  const steps = [
    { icon: Building2, label: 'Connect SSO' },
    { icon: Users, label: 'Import 12 faculties' },
    { icon: FileText, label: 'Sync 8,420 dissertations' },
    { icon: CheckCircle2, label: 'Ready to go' },
  ];
  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-2 text-white/80 mb-4">
        <Building2 size={16} style={{ color: '#A78BFA' }} />
        <span className="text-sm">{t('video.setup')}</span>
      </div>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.5, duration: 0.4 }}
            className="flex items-center gap-3 rounded-lg border px-4 py-3"
            style={{
              borderColor: 'rgba(107, 33, 245, 0.25)',
              background: 'rgba(107, 33, 245, 0.08)',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.5, type: 'spring' }}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(107, 33, 245, 0.3)' }}
            >
              <s.icon size={14} style={{ color: '#E9D5FF' }} />
            </motion.div>
            <span className="text-white/90 text-sm flex-1">{labels[i]}</span>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.5 }}
            >
              <CheckCircle2 size={16} style={{ color: '#34D399' }} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SceneDuplicate() {
  const { t } = useI18n();
  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-2 text-white/80 mb-4">
        <Sparkles size={16} style={{ color: '#A78BFA' }} />
        <span className="text-sm">{t('video.comparing')}</span>
      </div>
      <Card>
        <div className="text-white text-sm mb-1">
          {t('spot.example')}
        </div>
        <div className="text-white/50 text-xs">{t('video.submitted')}</div>
        <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '92%' }}
            transition={{ duration: 2.4, delay: 0.2 }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #6B21F5, #A78BFA)' }}
          />
        </div>
        <div className="mt-2 text-xs text-white/60">{t('video.compare')}</div>
      </Card>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.8, duration: 0.5 }}
        className="mt-3 rounded-lg border p-3 flex items-start gap-3"
        style={{
          borderColor: 'rgba(245, 158, 11, 0.4)',
          background: 'rgba(245, 158, 11, 0.08)',
        }}
      >
        <AlertTriangle size={16} style={{ color: '#FBBF24' }} className="mt-0.5" />
        <div className="flex-1">
          <div className="text-white text-sm">{t('video.overlap')}</div>
          <div className="text-white/60 text-xs mt-0.5">
            {t('video.example')}
          </div>
        </div>
        <span
          className="text-xs px-2 py-1 rounded"
          style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#FCD34D' }}
        >
          {t('video.flagged')}
        </span>
      </motion.div>
    </div>
  );
}

function SceneSupervisor() {
  const { t, language } = useI18n();
  const subjects = t('spot.subjects').split('|');
  const loads = t('video.studentLoads').split('|');
  const matches = [
    { name: 'Prof. M. Sow', match: 96, load: '3/8 students', topic: 'Applied ML' },
    { name: 'Dr. F. Ndiaye', match: 89, load: '5/8 students', topic: 'AgriTech' },
    { name: 'Prof. K. Bâ', match: 74, load: '7/8 students', topic: 'Data Science' },
  ];
  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-2 text-white/80 mb-4">
        <Users size={16} style={{ color: '#A78BFA' }} />
        <span className="text-sm">{t('video.matches')}</span>
      </div>
      <div className="space-y-2">
        {matches.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.35 }}
            className="flex items-center gap-3 rounded-lg border px-4 py-3"
            style={{
              borderColor: i === 0 ? 'rgba(107, 33, 245, 0.5)' : 'rgba(255,255,255,0.08)',
              background:
                i === 0 ? 'rgba(107, 33, 245, 0.12)' : 'rgba(20,16,43,0.6)',
            }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm"
              style={{
                background: 'linear-gradient(135deg, #6B21F5, #A78BFA)',
              }}
            >
              {m.name.split(' ').slice(-1)[0][0]}
            </div>
            <div className="flex-1">
              <div className="text-white text-sm">{m.name}</div>
              <div className="text-white/50 text-xs">
                {subjects[i]} · {loads[i]}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm" style={{ color: '#A78BFA' }}>
                {new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en', { style: 'percent' }).format(m.match / 100)}
              </div>
              <div className="text-white/40 text-xs">{t('video.match')}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="mt-3 text-center text-xs text-white/60"
      >
        {t('video.assigned')}
      </motion.div>
    </div>
  );
}

function SceneDashboard() {
  const { t, language } = useI18n();
  const labels = t('spot.stats').split('|');
  const bars = [40, 65, 55, 80, 72, 90, 85];
  const kpis = [
    { label: 'Active', value: '1,284' },
    { label: 'In review', value: '312' },
    { label: 'Completed', value: '8,420' },
  ];
  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-2 text-white/80 mb-4">
        <BarChart3 size={16} style={{ color: '#A78BFA' }} />
        <span className="text-sm">{t('video.dean')}</span>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="rounded-lg border p-3"
            style={{
              borderColor: 'rgba(255,255,255,0.08)',
              background: 'rgba(20,16,43,0.7)',
            }}
          >
            <div className="text-white text-xl">{language === 'fr' ? new Intl.NumberFormat('fr-FR').format(Number(k.value.replaceAll(',', ''))) : k.value}</div>
            <div className="text-white/50 text-xs">{labels[i]}</div>
          </motion.div>
        ))}
      </div>
      <Card delay={0.6}>
        <div className="flex items-end gap-2 h-32">
          {bars.map((b, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${b}%` }}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
              className="flex-1 rounded-t-sm"
              style={{
                background: 'linear-gradient(180deg, #A78BFA 0%, #6B21F5 100%)',
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-white/40">
          {t('video.weekdays').split('|').map((day) => <span key={day}>{day}</span>)}
        </div>
      </Card>
    </div>
  );
}
