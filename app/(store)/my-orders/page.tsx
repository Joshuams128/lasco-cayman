import { currentUser } from "@clerk/nextjs/server";

// TODO: Fetch orders from Sanity by clerkUserId
// import { client } from "@/sanity/client";

export default async function MyOrdersPage() {
  const user = await currentUser();

  // TODO: Fetch orders
  // const orders = await client.fetch(
  //   `*[_type == "order" && clerkUserId == $userId] | order(createdAt desc)`,
  //   { userId: user?.id }
  // );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

      <p className="text-gray-500">
        TODO: Fetch and display orders for user {user?.id}
      </p>

      {/* TODO: Order list with status badges */}
    </div>
  );
}
