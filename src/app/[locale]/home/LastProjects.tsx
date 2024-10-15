import Image from 'next/image';

import * as Icon from 'components/icons';

export const LastProjects = () => {
  return (
    <div className="max-w-3xl m-auto px-2 sm:px-6 mb-7">
      <h3 className="text-secondary text-2xl font-medium my-2 px-3 sm:px-10 sm:mb-4">
        Here my last <span className="text-primary">projects1</span>
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project) => (
          <li
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 sm:last:hidden md:last:block flex flex-col"
          >
            <h4 className="text-link-normal hover:text-link-hover active:text-link-active text-lg font-medium mb-2">
              {project.title}
            </h4>
            <Image
              src={project.image}
              alt={project.title}
              width="200"
              height="200"
              className="w-full h-32 object-cover object-top rounded mb-2"
            />
            <div className="flex justify-between flex-grow items-end">
              <span className="text-secondary text-xs mt-2 inline-flex items-center">
                <Icon.IconBxTime />
                <span className="ml-1">{project.createdAt}</span>
              </span>
              <a href={project.link}>Check out</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const projects = [
  {
    id: 1,
    title: 'How to use pm2 for deploy nodejs applications',
    image: 'https://source.unsplash.com/random/200x200',
    link: 'https://www.google.com',
    createdAt: '2021-01-01',
  },
  {
    id: 2,
    title: 'My notes about Leaning in public',
    image: 'https://source.unsplash.com/random/200x200',
    link: 'https://www.google.com',
    createdAt: '2021-01-01',
  },
  {
    id: 3,
    title: 'Using Popper as Tooltip TypeScript and styled-components',
    image: 'https://source.unsplash.com/random/200x200',
    link: 'https://www.google.com',
    createdAt: '2021-01-01',
  },
];
