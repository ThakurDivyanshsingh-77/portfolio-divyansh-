import AppLayout from '../components/AppLayout';
import macBackground1 from '../assets/images/mac-background1.jpg';
import macBackground2 from '../assets/images/mac-background2.jpg';
import macBackground3 from '../assets/images/mac-background3.jpg';

export const dynamic = 'force-dynamic';

const backgrounds = [macBackground1, macBackground2, macBackground3];

function getRandomBackground() {
  return `bg-${Math.floor(Math.random() * backgrounds.length) + 1}`;
}

const backgroundMap = Object.fromEntries(
  backgrounds.map((bg, index) => [`bg-${index + 1}`, bg.src])
);

export default function Home() {
  return <AppLayout initialBg={getRandomBackground()} backgroundMap={backgroundMap} />;
}
