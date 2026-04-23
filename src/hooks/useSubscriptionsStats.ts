"use client";

import { useState, useEffect, useCallback } from "react";
import { getSubscriptionStatistics } from "@/lib/api";
import type { SubscriptionsStatisticsData } from "@/lib/types";

interface UseSubscriptionsStatsReturn {
  data: SubscriptionsStatisticsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSubscriptionsStats(): UseSubscriptionsStatsReturn {
  const [data, setData] = useState<SubscriptionsStatisticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getSubscriptionStatistics();
      if (response.status === 200 && response.data) {
        setData(response.data);
      } else {
        setError(response.message || "Failed to load subscriptions data");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, retryCount]);

  const refetch = useCallback(() => {
    setRetryCount((c) => c + 1);
  }, []);

  return { data, loading, error, refetch };
}
