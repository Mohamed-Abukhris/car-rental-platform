import { auth } from "@/auth";

export default async function AdminPage() {
  const session = await auth();

  return (
    <div>
      <h1>Admin dashboard</h1>
      <p>Welcome, {session?.user?.name}</p>
    </div>
  );
}
