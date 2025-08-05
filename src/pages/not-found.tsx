import page404 from '../assets/page404.png';
import { BackToMainButton } from '@components/index.ts';

const NotFound = () => {
  return (
    <main className="p-8 flex-grow flex-col flex items-center justify-center">
      <img
        src={page404}
        alt="Page Not Found"
        className="mb-5 max-w-[500px] mx-auto"
        data-testid="404-image"
      />
      <BackToMainButton text="Back to Main Page" />
    </main>
  );
};

export default NotFound;
