export default function TestPage() {
  return (
    <main className="px-5 sm:px-12 max-w-4xl mx-auto min-h-screen">
      <header className="mx-auto py-6">
        <h1 className="font-title text-5xl text-primary-light dark:text-primary-dark font-bold leading-tight">
          Bem-vindo ao Meu Blog
        </h1>
        <p className="font-body text-xl text-secondary-light dark:text-secondary-dark my-4">
          Criando experiências web melhores.
        </p>
      </header>
      <div className="mx-auto py-6">
        <article>
          <h2 className="font-title text-5xl text-primary-light dark:text-primary-dark font-bold">
            Meu Primeiro Artigo
          </h2>
          <p className="font-body text-xl my-4">
            Aqui está um exemplo de texto do meu blog. Este é um parágrafo usando a fonte Lato.
          </p>
          <pre className="bg-gray-800 text-fira-code p-4 rounded-md my-4">
            <code className="font-code text-green-400">{`const greeting = 'Hello, World!';`}</code>
          </pre>
          <p className="my-4 text-xl font-normal">
            <a
              href="#"
              className="text-link-normal dark:text-link-normal hover:text-link-hover dark:hover:text-link-hover active:text-link-active dark:active:text-link-active hover:underline"
            >
              Leia mais
            </a>
          </p>
        </article>
      </div>
    </main>
  );
}
