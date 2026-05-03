'use client';
import { useEffect } from 'react';
import posthog from 'posthog-js';
export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, { api_host: 'https://app.posthog.com' });
    }
  }, []);
  return <>{children}</>;
}