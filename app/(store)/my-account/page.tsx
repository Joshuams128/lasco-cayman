import { currentUser } from "@clerk/nextjs/server";

export default async function MyAccountPage() {
  const user = await currentUser();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Account</h1>

      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="mt-4 space-y-2">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {user?.firstName} {user?.lastName}
          </p>
          <p>
            <span className="font-medium">Email:</span>{" "}
            {user?.emailAddresses[0]?.emailAddress}
          </p>
        </div>
      </div>

      {/* TODO: Add account management options */}
      {/* - Update profile */}
      {/* - Address book */}
      {/* - Order history link */}
    </div>
  );
}
