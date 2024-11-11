import api, { buildURL } from './api';

export const addJabatan = async (jabatanData) => {
    try {
        const response = await api.post(buildURL('/jabatan_add'), jabatanData);

        // Check if the request was successful and handle the response
        if (response.data.status) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error creating jabatan:', error);
        throw error;
    }
};

export const fetchJabatan = async () => {
    try {
        const response = await api.get(buildURL('/jabatan'));
        return response.data; // Kembalikan data yang diterima dari server
    } catch (error) {
        console.error('Error fetching jabatan data:', error);
        throw error;
    }
};

// Fungsi untuk delete jabatan
export const deleteJabatan = async (id) => {
    try {
        const response = await api.delete(buildURL(`/jabatan/${id}`));

        if (response.data.status) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error deleting jabatan:', error);
        throw error;
    }
};

// Fungsi untuk update jabatan
export async function updateJabatan(jabatan) {
    try {
        // Make sure to send the jabatan object directly as the request body
        const response = await api.put(buildURL(`/jabatan/${jabatan.ID_Jabatan}`), jabatan);

        // Check if the response contains updated jabatan data
        if (response.data && response.data.updated_at) {
           
            return response.data;
        } else {
    
            console.error('Update failed: No updated data returned');
            return response.data;
        }
    } catch (error) {
        console.error('Error updating jabatan:', error);
        throw error; 
    }
};





