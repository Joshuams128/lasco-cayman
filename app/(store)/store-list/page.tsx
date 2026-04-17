import { client } from "@/sanity/client";

interface StoreLocation {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  hours?: string;
}

async function getStores() {
  return client.fetch<StoreLocation[]>(
    `*[_type == "storeLocation"] | order(name asc) {
      _id, name, address, phone, hours
    }`
  );
}

export default async function StoreListPage() {
  const stores = await getStores();

  return (
    <div>
      {/* Header */}
      <section className="bg-primary py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold">Store Locations</h1>
          <p className="mt-2 text-white/80">Find LASCO products near you in the Cayman Islands</p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12">
        {stores.length === 0 ? (
          <div className="rounded-xl border bg-gray-50 py-20 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Locations Coming Soon</h2>
            <p className="mt-2 text-sm text-gray-500">
              We&apos;re adding our retail partner locations. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {stores.map((store) => (
              <div
                key={store._id}
                className="rounded-xl border bg-white p-6 transition hover:shadow-md"
              >
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{store.name}</h3>
                    <p className="mt-1 whitespace-pre-line text-sm text-gray-600">{store.address}</p>
                    {store.phone && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        <a href={`tel:${store.phone}`} className="hover:text-primary">
                          {store.phone}
                        </a>
                      </p>
                    )}
                    {store.hours && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {store.hours}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 rounded-xl bg-gray-50 p-8 text-center">
          <h2 className="text-lg font-bold text-gray-900">Want to carry LASCO products?</h2>
          <p className="mt-2 text-sm text-gray-600">
            If you&apos;re a retailer in the Cayman Islands and would like to stock LASCO products,
            we&apos;d love to hear from you.
          </p>
          <a
            href="mailto:info@lasco-cayman.com"
            className="mt-4 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
