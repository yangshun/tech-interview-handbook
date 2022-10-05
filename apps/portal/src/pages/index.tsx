import { Button, Spinner } from '@tih/ui';

export default function HomePage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="flex h-full items-center justify-center">
        <div>
          <h1 className="text-primary-600 text-center text-4xl font-bold">
            Homepage
          </h1>
          <Button label="Button text" size="md" variant="primary" />
          <Spinner size="md" />
        </div>
      </div>
    </main>
  );
}
