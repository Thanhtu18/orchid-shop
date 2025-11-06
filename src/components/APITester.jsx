import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, CircularProgress, Alert } from '@mui/material';

const APITester = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'https://69037a6ed0f10a340b247adb.mockapi.io/api/v1/orchids';

  const testAPI = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      console.log('🧪 Testing API:', API_URL);
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('✅ API Test Success:', result);
      setData(result);
    } catch (err) {
      console.error('❌ API Test Failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testAPI();
  }, []);

  return (
    <Box sx={{ p: 3, border: '2px solid #2196f3', borderRadius: 2, m: 2 }}>
      <Typography variant="h6" gutterBottom>
        🧪 API Tester - Orchids Endpoint
      </Typography>
      
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {API_URL}
      </Typography>

      <Button 
        variant="contained" 
        onClick={testAPI} 
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? 'Testing...' : 'Test API Again'}
      </Button>

      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CircularProgress size={20} sx={{ mr: 1 }} />
          <Typography>Đang kiểm tra API...</Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="body2">
            <strong>Lỗi API:</strong> {error}
          </Typography>
        </Alert>
      )}

      {data && (
        <Alert severity="success">
          <Typography variant="body2">
            <strong>✅ API hoạt động tốt!</strong><br/>
            📊 Tổng số orchids: {data.length}<br/>
            🌸 Orchid đầu tiên: {data[0]?.name || 'N/A'}<br/>
            🏷️ Danh mục: {data[0]?.category || 'N/A'}
          </Typography>
        </Alert>
      )}

      {data && data.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            📝 Danh sách orchids (3 đầu tiên):
          </Typography>
          <ul>
            {data.slice(0, 3).map((orchid, index) => (
              <li key={orchid.id || index}>
                <strong>{orchid.name}</strong> - {orchid.category} (Rating: {orchid.rating}/5)
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default APITester;