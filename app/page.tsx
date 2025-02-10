import Header from '@/app/components/Header/Header';
import TrainerSection from '@/app/components/TrainerSection/TrainerSection'; // Import the new component
import ImageContent from './components/Middle/Middle';


export default function HomePage() {
  return (
    <div>
      <Header />
      <TrainerSection /> {/* Add the new section here */}
      {/* Add other components or content here */}
      <ImageContent />
    </div>
  );
}