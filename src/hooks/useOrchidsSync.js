import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchOrchids, clearCache } from '../store/slices/orchidsSlice';

/**
 * Hook để đồng bộ dữ liệu với MockAPI
 * - Tự động fetch khi component mount
 * - Auto refresh mỗi 60 giây
 * - Refresh khi tab được focus lại
 */
export const useOrchidsSync = () => {
  const dispatch = useDispatch();

  // Fetch data khi hook được sử dụng
  useEffect(() => {
    console.log('🔄 Initial sync with MockAPI...');
    dispatch(fetchOrchids());
  }, [dispatch]);

  // Auto refresh mỗi 60 giây để đồng bộ với MockAPI
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Auto syncing with MockAPI every 60s...');
      dispatch(clearCache()); // Clear cache trước
      dispatch(fetchOrchids()); // Fetch fresh data
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [dispatch]);

  // Refresh khi user focus vào tab (người khác có thể đã thay đổi data)
  useEffect(() => {
    const handleFocus = () => {
      console.log('🔄 Tab focused, syncing with MockAPI...');
      dispatch(clearCache()); // Clear cache
      dispatch(fetchOrchids()); // Fetch fresh data
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [dispatch]);

  // Refresh khi online lại (sau khi mất mạng)
  useEffect(() => {
    const handleOnline = () => {
      console.log('🌐 Back online, syncing with MockAPI...');
      dispatch(clearCache());
      dispatch(fetchOrchids());
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [dispatch]);
};

/**
 * Hook để force refresh data từ MockAPI
 */
export const useForceRefresh = () => {
  const dispatch = useDispatch();

  const forceRefresh = () => {
    console.log('🔄 Force refresh from MockAPI...');
    dispatch(clearCache());
    dispatch(fetchOrchids());
  };

  return forceRefresh;
};