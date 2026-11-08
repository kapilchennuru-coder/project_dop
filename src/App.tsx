import { MotionConfig } from 'motion/react';
import { Navigation } from './components/Navigation';
import { HeroSection, SchoolChapter } from './components/SchoolChapters';
import { KapilChapter, VoiceChapter } from './components/PersonalChapters';
import { LetterChapter } from './components/LetterChapter';
import { CityJourney, TimelineChapter } from './components/TimeChapters';
import { Credits, FinalLantern, KandilThreshold } from './components/FinalChapters';
import { Seam } from './components/shared';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navigation />
      <main>
        <HeroSection />
        <SchoolChapter />
        <Seam from="#EFE3C8" to="#0B1024" tall />
        <VoiceChapter />
        <Seam from="#0B1024" to="#E9E4D3" tall />
        <KapilChapter />
        <Seam from="#E9E4D3" to="#170F09" tall />
        <LetterChapter />
        <Seam from="#170F09" to="#080D20" />
        <CityJourney />
        <TimelineChapter />
        <KandilThreshold />
        <FinalLantern />
      </main>
      <Credits />
    </MotionConfig>
  );
}
