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
      // Silently block - no toast noise while subscription status loads
      return false;
    }
    if (!status?.active) {
      window.dispatchEvent(new CustomEvent('show-status', { detail: {
        type: 'error',
        title: 'Pro Membership Required',
        message: `Unlock ${actionName} and access premium tools, advanced trading features, and exclusive market insights with a Quantyrex Pro membership.`,
        autoClose: 5000
      }}));
      setTimeout(() => navigate('/dashboard/subscription'), 800);
      return false;
    }
    return true;
  }, [status, loading, navigate]);

  // Returns true if API response indicates subscription required
  const handleApiError = useCallback((err) => {
    if (err?.requiresSubscription || err?.message?.includes('subscription required')) {
      window.dispatchEvent(new CustomEvent('show-status', { detail: {
        type: 'error',
        title: 'Pro Membership Required',
        message: 'This feature is exclusive to Quantyrex Pro members. Upgrade your account to unlock advanced trading tools, premium signals, and full platform access.',
        autoClose: 5000
      }}));
      setTimeout(() => navigate('/dashboard/subscription'), 800);
      return true;
    }
    return false;
  }, [navigate]);

  return { status, loading, requireSub, handleApiError, refresh: loadStatus };
}
