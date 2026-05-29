import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubscriptionStatus } from '../services/api';
import { toast } from 'react-toastify';

export function useSubscription() {
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStatus = useCallback(async () => {
    try {
      const data = await getSubscriptionStatus();
      setStatus(data);
    } catch (e) {
      setStatus({ active: false });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStatus();
  }, [loadStatus]);

  // Returns true if user can proceed, false if redirected
  const requireSub = useCallback((actionName = 'this action') => {
    if (loading) {
      toast.info('Checking subscription...');
      return false;
    }
    if (!status?.active) {
      toast.warning(`Pro subscription required to ${actionName}`);
      setTimeout(() => navigate('/dashboard/subscription'), 800);
      return false;
    }
    return true;
  }, [status, loading, navigate]);

  // Returns true if API response indicates subscription required
  const handleApiError = useCallback((err) => {
    if (err?.requiresSubscription || err?.message?.includes('subscription required')) {
      toast.warning('Pro subscription required');
      setTimeout(() => navigate('/dashboard/subscription'), 800);
      return true;
    }
    return false;
  }, [navigate]);

  return { status, loading, requireSub, handleApiError, refresh: loadStatus };
}
