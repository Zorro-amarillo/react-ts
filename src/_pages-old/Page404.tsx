import { BackToMainButton } from '@components';

import page404 from '../../public/images/page404.png';

const Page404 = () => {
  return (
    <main className="p-8 flex-grow flex-col flex items-center justify-center">
      <img
        src={page404.src}
        alt="Page Not Found"
        className="mb-5 max-w-[500px] mx-auto"
        data-testid="404-image"
      />
      <BackToMainButton text="Back to Main Page" />
    </main>
  );
};

export default Page404;
