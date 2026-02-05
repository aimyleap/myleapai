"use client";

import { useUserSync } from "@/hooks/useUserSync";

export function AuthSync() {
    useUserSync();
    return null;
}
