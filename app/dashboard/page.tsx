import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import ButtonSignOut from "@/components/ButtonSignOut";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  return (
    <div className="border p-2 m-4 rounded-xl">
      <p className="font-bold">Dasboard</p>
      <div>
        <p>user: {session.user.email}</p>
        <p>id: {session.user.id}</p>
        <p>linkedin: {session.user.linkedin}</p>
        <div>
          {session.user.isPremium ? (
            <p>isPremium : ✅</p>
          ) : (
            <p>isPremium : ❌</p>
          )}
        </div>
        <p>github: {session.user.github}</p>
        <ButtonSignOut />
      </div>
    </div>
  );
}
