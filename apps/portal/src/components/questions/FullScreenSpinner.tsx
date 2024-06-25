import { Spinner } from '~/ui';

export default function FullScreenSpinner() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner size="lg" />
    </div>
  );
}
