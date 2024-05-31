import * as icons from 'components/icons';

import { BackgroundPlane } from 'app/home/BackgroundPlane';
export const MyNetworks = () => {
  return (
    <div className="h-80 relative">
      <BackgroundPlane />
      <div className="absolute top-0 left-0 w-full h-full z-10 flex items-center">
        <div className="max-w-3xl m-auto px-2 sm:px-6 ">
          <h3 className="text-primary text-2xl font-medium my-2 px-3 sm:mb-6 text-black dark:text-white">
            Find me on others places
          </h3>
          <ul className="flex justify-center gap-4">
            {networks.map((network) => {
              const Icon = network.icon;
              return (
                <li key={network.name} className="p-4">
                  <a
                    href={network.url}
                    title={network.name}
                    target="_blank"
                    rel="noreferrer"
                    className="text-purple-600 bg-white dark:text-white dark:bg-purple-800 rounded-full shadow-lg w-12 h-12 inline-flex justify-center items-center"
                  >
                    <Icon className="w-7 h-7" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const networks = [
  {
    name: 'Github',
    url: 'https://github.com/davidcostadev',
    icon: icons.IconGithub,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/davidcostadev',
    icon: icons.IconTwitter,
  },
  {
    name: 'Linkedin',
    url: 'https://www.linkedin.com/in/davidcostadev',
    icon: icons.IconLinkedin,
  },
];
