import { BackToMainButton, Footer } from '@components';

const AboutPage = () => {
  return (
    <>
      <main className="p-8 flex-grow">
        <h1 className="text-gray-500 mb-8">About the developer</h1>
        <p className="text-gray-500 text-left">
          Yana Malakhova (
          <a href="https://github.com/Zorro-amarillo" target="_blank" rel="noreferrer">
            @zorro-amarillo
          </a>
          ) is a frontend developer with a background in web content management and editorial
          systems. With over four years of experience in website editing, Yana combines technical
          precision with editorial discipline to build clean, user-focused interfaces.
        </p>
        <p className="text-gray-500 text-left mb-8">
          Currently enrolled in{' '}
          <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer">
            RSSchool React course
          </a>{' '}
          to master modern frontend development.
        </p>
        <BackToMainButton text="Back to Main Page" />
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
