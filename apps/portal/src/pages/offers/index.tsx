import OffersTable from '~/components/offers/OffersTable';

export default function OffersHomePage() {
  return (
    <main className="flex-1 overflow-y-auto">
      <div className="flex h-full items-center justify-center">
        <OffersTable />
      </div>
    </main>
  );
}
