import Link from 'next/link';

import { LastPosts } from 'app/home/LastPosts';
import { LastProjects } from 'app/home/LastProjects';
import { MyNetworks } from 'app/home/MyNetworks';

export default function Index() {
  return (
    <div>
      <div className="max-w-3xl m-auto px-2 sm:px-6 -mt-16 z-10 relative mb-7">
        <div className="shadow-lg dark:bg-gray-800 dark:bg-opacity-60 rounded-lg p-4 sm:p-10">
          <h2 className="text-primary text-4xl sm:text-5xl mb-2">Hi! I{"'"}m David</h2>
          <p className="text-secondary text-xl sm:text-2xl">
            I{"'"}m creating better web experiences
          </p>
        </div>
      </div>
      <div className="max-w-3xl m-auto px-2 sm:px-6 mb-7">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg px-4 py-6 sm:py-8 sm:px-10 leading-relaxed">
          <p className="text-primary mb-4 sm:mb-6">
            Hello, my name is <strong>David Costa</strong>, I{"'"}m a fullstack developer, I live in
            Brazil, I work for{' '}
            <a href="https://papa.com" target="_blank" rel="noreferrer" title="Papa Website">
              Papa
            </a>{' '}
            a remote-friendly company in Miami. Creating solutions to help support our customers.
          </p>

          <p className="text-primary mb-4 sm:mb-4">
            Whenever possible working with <strong>Javascript</strong> and{' '}
            <strong>Typescript</strong>, using <strong>React</strong> as the main framework most of
            the time.
          </p>

          <p className="text-primary">
            This website is intended to concentrate my articles, projects and be a hub to my
            networks. Make yourself comfortable here!
          </p>
        </div>
      </div>
      <LastPosts />
      {/* <LastProjects /> */}
      <MyNetworks />
    </div>
  );
}
