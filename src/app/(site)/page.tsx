import { LastPosts } from 'app/home/LastPosts';
import { MyNetworks } from 'app/home/MyNetworks';
import { BackgroundRetro } from 'app/home/BackgroundRetro';

export const metadata = {
  title: 'David Costa - Senior Software Engineer',
  description: 'Creating creating better web experiences.',
};

export default function Index() {
  return (
    <main>
      <BackgroundRetro className="w-full h-72 sm:h-80 md:h-96" />
      <div>
        <div className="max-w-3xl m-auto px-2 sm:px-6 -mt-16 z-10 relative mb-7">
          <div className="shadow-lg bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-10">
            <h2 className="text-secondary text-xl sm:text-2xl">
              <span className="text-primary text-4xl sm:text-5xl mb-2 inline-flex w-full">
                Hi! I{"'"}m David,
              </span>
              and I{"'"}m creating creating better web experiences.
            </h2>
          </div>
        </div>
        <div className="max-w-3xl m-auto px-2 sm:px-6 mb-7">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-6 sm:py-8 sm:px-10 leading-relaxed">
            <p className="text-primary mb-4 sm:mb-6">
              Hello, my name is <strong>David Costa</strong>. I{"'"}m a Senior Software Engineer
              living in Brazil, creating solutions to help support our customers.
            </p>

            <p className="text-primary mb-4 sm:mb-4">
              I work with <strong>Javascript</strong> and <strong>Typescript</strong>, using{' '}
              <strong>React</strong> as the main framework most of the time.
            </p>

            <p className="text-primary">
              This website is intended to concentrate my articles, projects, and be a hub for my
              networks.
            </p>
          </div>
        </div>
        <LastPosts />
        {/* <LastProjects /> */}
        <MyNetworks />
      </div>
    </main>
  );
}
