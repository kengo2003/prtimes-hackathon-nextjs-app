"use client";

import { ComponentProps } from "react";
import { Button } from "./button";
import { deleteBB } from "@/actions/post";

export function ClientContent({
  paramsId,
  children,
  ...props
}: ComponentProps<typeof Button> & { paramsId: number }) {
  return (
    <Button onClick={() => deleteBB(paramsId)} {...props}>
      {children}
    </Button>
  );
}
