import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center mt-8 font-bold text-xl">
      <h1>
        🎉 Boilerplate NextJs + Typescript + Nextauth made by @AlexandrePDA 🎉
      </h1>
      <Link href="/login" className="mt-8">
        <Button>Login</Button>
      </Link>
    </div>
  );
}
