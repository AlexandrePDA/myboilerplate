"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const ButtonSignOut = () => {
  const handleClick = () => {
    signOut();
  };
  return (
    <Button className="mt-8" onClick={handleClick}>
      Déconnexion
    </Button>
  );
};

export default ButtonSignOut;
