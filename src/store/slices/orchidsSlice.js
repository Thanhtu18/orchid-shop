import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orchidAPI } from '../../services/orchidApiFetch.js';

// Async thunks for API calls using FETCH
export const fetchOrchids = createAsyncThunk(
  'orchids/fetchOrchids',
  async (_, { rejectWithValue }) => {
    try {
      const data = await orchidAPI.getAll();
      console.log('🔄 Redux: Orchids fetched via FETCH API', data);
      return data;
    } catch (error) {
      console.error('🔄 Redux: Fetch orchids failed', error);
      return rejectWithValue(error.message || 'Failed to fetch orchids');
    }
  }
);

export const fetchOrchidById = createAsyncThunk(
  'orchids/fetchOrchidById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await orchidAPI.getById(id);
      console.log('🔄 Redux: Orchid fetched by ID via FETCH', data);
      return data;
    } catch (error) {
      console.error('🔄 Redux: Fetch orchid by ID failed', error);
      return rejectWithValue(error.message || 'Failed to fetch orchid');
    }
  }
);

export const createOrchid = createAsyncThunk(
  'orchids/createOrchid',
  async (orchidData, { dispatch, rejectWithValue }) => {
    try {
      // Tạo mới trực tiếp trên MockAPI
      const data = await orchidAPI.create(orchidData);
      console.log('✅ Orchid created on MockAPI:', data);
      
      // Fetch lại toàn bộ data từ MockAPI để đồng bộ
      await dispatch(fetchOrchids());
      
      return data;
    } catch (error) {
      console.error('❌ Create orchid failed:', error);
      return rejectWithValue(error.message || 'Failed to create orchid');
    }
  }
);

export const updateOrchid = createAsyncThunk(
  'orchids/updateOrchid',
  async ({ id, data }, { dispatch, rejectWithValue }) => {
    try {
      // Cập nhật trực tiếp trên MockAPI
      const result = await orchidAPI.update(id, data);
      console.log('✅ Orchid updated on MockAPI:', result);
      
      // Fetch lại toàn bộ data từ MockAPI để đồng bộ
      await dispatch(fetchOrchids());
      
      return result;
    } catch (error) {
      console.error('❌ Update orchid failed:', error);
      return rejectWithValue(error.message || 'Failed to update orchid');
    }
  }
);

export const deleteOrchid = createAsyncThunk(
  'orchids/deleteOrchid',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      // Xóa trực tiếp trên MockAPI
      await orchidAPI.delete(id);
      console.log('✅ Orchid deleted from MockAPI:', id);
      
      // Fetch lại toàn bộ data từ MockAPI để đồng bộ
      await dispatch(fetchOrchids());
      
      return id;
    } catch (error) {
      console.error('❌ Delete orchid failed:', error);
      return rejectWithValue(error.message || 'Failed to delete orchid');
    }
  }
);

const initialState = {
  orchids: [],
  selectedOrchid: null,
  loading: false,
  error: null,
  searchTerm: '',
  filters: {
    category: '',
    isSpecial: null,
    isNatural: null,
    origin: '',
  },
};

const orchidsSlice = createSlice({
  name: 'orchids',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchTerm = '';
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedOrchid: (state) => {
      state.selectedOrchid = null;
    },
    clearCache: (state) => {
      state.orchids = [];
      state.selectedOrchid = null;
      console.log('🗑️ Redux cache cleared - will fetch from MockAPI');
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all orchids
      .addCase(fetchOrchids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrchids.fulfilled, (state, action) => {
        state.loading = false;
        state.orchids = action.payload;
      })
      .addCase(fetchOrchids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch orchid by ID
      .addCase(fetchOrchidById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrchidById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrchid = action.payload;
      })
      .addCase(fetchOrchidById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create orchid
      .addCase(createOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrchid.fulfilled, (state) => {
        state.loading = false;
        // Không thêm vào local array, data sẽ được fetch lại từ MockAPI
      })
      .addCase(createOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update orchid
      .addCase(updateOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrchid.fulfilled, (state) => {
        state.loading = false;
        // Không update local array, data sẽ được fetch lại từ MockAPI
      })
      .addCase(updateOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete orchid
      .addCase(deleteOrchid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrchid.fulfilled, (state) => {
        state.loading = false;
        // Không filter local array, data sẽ được fetch lại từ MockAPI
      })
      .addCase(deleteOrchid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setSearchTerm, 
  setFilters, 
  clearFilters, 
  clearError, 
  clearSelectedOrchid,
  clearCache
} = orchidsSlice.actions;

// Selectors
export const selectAllOrchids = (state) => state.orchids.orchids;
export const selectOrchidsLoading = (state) => state.orchids.loading;
export const selectOrchidsError = (state) => state.orchids.error;
export const selectSelectedOrchid = (state) => state.orchids.selectedOrchid;
export const selectSearchTerm = (state) => state.orchids.searchTerm;
export const selectFilters = (state) => state.orchids.filters;

// Filtered orchids selector
export const selectFilteredOrchids = (state) => {
  const { orchids, searchTerm, filters } = state.orchids;
  
  return orchids.filter(orchid => {
    // Search term filter
    const matchesSearch = orchid.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = !filters.category || orchid.category === filters.category;
    
    // Special filter
    const matchesSpecial = filters.isSpecial === null || orchid.isSpecial === filters.isSpecial;
    
    // Natural filter
    const matchesNatural = filters.isNatural === null || orchid.isNatural === filters.isNatural;
    
    // Origin filter
    const matchesOrigin = !filters.origin || orchid.origin.toLowerCase().includes(filters.origin.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesSpecial && matchesNatural && matchesOrigin;
  });
};

export default orchidsSlice.reducer;