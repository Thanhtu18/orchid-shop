// Enhanced API service using FETCH for Lab 6 requirements
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://69037a6ed0f10a340b247adb.mockapi.io/api/v1';

// Helper function for FETCH requests
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  console.log(`🌐 FETCH Request: ${options.method || 'GET'} ${url}`);
  
  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`✅ FETCH Success:`, data);
    return data;
  } catch (error) {
    console.error(`❌ FETCH Error:`, error);
    throw error;
  }
};

// CRUD Operations using FETCH
export const orchidAPI = {
  // GET all orchids (filter only records with valid ID)
  getAll: async () => {
    const allOrchids = await fetchWithAuth(`${BASE_URL}/orchids`);
    // Filter to only include orchids with valid ID (removes old/duplicate data)
    const validOrchids = allOrchids.filter(orchid => orchid.id && orchid.id !== '');
    console.log(`🔍 Filtered orchids: ${allOrchids.length} total → ${validOrchids.length} valid`);
    return validOrchids;
  },

  // GET orchid by ID
  getById: async (id) => {
    return await fetchWithAuth(`${BASE_URL}/orchids/${id}`);
  },

  // POST new orchid
  create: async (orchidData) => {
    return await fetchWithAuth(`${BASE_URL}/orchids`, {
      method: 'POST',
      body: JSON.stringify(orchidData),
    });
  },

  // PUT update orchid
  update: async (id, orchidData) => {
    return await fetchWithAuth(`${BASE_URL}/orchids/${id}`, {
      method: 'PUT',
      body: JSON.stringify(orchidData),
    });
  },

  // DELETE orchid
  delete: async (id) => {
    return await fetchWithAuth(`${BASE_URL}/orchids/${id}`, {
      method: 'DELETE',
    });
  },

  // Search orchids (using query parameters)
  search: async (searchTerm) => {
    const url = `${BASE_URL}/orchids?search=${encodeURIComponent(searchTerm)}`;
    return await fetchWithAuth(url);
  },

  // Filter orchids by category
  filterByCategory: async (category) => {
    const url = `${BASE_URL}/orchids?category=${encodeURIComponent(category)}`;
    return await fetchWithAuth(url);
  },

  // Sync với MockAPI - đảm bảo dữ liệu fresh
  sync: async () => {
    console.log('🔄 Syncing with MockAPI...');
    try {
      const data = await fetchWithAuth(`${BASE_URL}/orchids`);
      console.log('✅ Sync completed:', data.length, 'orchids from MockAPI');
      return data;
    } catch (error) {
      console.error('❌ Sync failed:', error);
      throw error;
    }
  },

  // Get count orchids trên MockAPI
  getCount: async () => {
    try {
      const data = await fetchWithAuth(`${BASE_URL}/orchids`);
      return data.length;
    } catch (error) {
      console.error('❌ Get count failed:', error);
      throw error;
    }
  }
};

// Test API connection
export const testAPIConnection = async () => {
  try {
    console.log('🧪 Testing API connection...');
    const orchids = await orchidAPI.getAll();
    console.log('✅ API Connection successful!', { count: orchids.length });
    return { success: true, data: orchids };
  } catch (error) {
    console.error('❌ API Connection failed:', error);
    return { success: false, error: error.message };
  }
};

export default orchidAPI;