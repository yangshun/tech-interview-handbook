import { Button, CounterButton } from '@tih/ui';

export default function HomePage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="flex h-full items-center justify-center">
        <div>
          <h1 className="text-center text-4xl font-bold text-red-600">
            Homepage
          </h1>
          <CounterButton />
          <Button label="Button text" size="md" variant="primary" />
        </div>
      </div>
    </main>
  );
}
