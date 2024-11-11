import api, { buildURL } from './api';

export const addPenugasan = async (penugasanData) => {
    try {
        const response = await api.post(buildURL('/penugasan_add'), penugasanData);

        // Check if the request was successful and handle the response
        if (response.data.status) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error creating penugasan:', error);
        throw error;
    }
};

export const fetchPenugasan = async () => {
    try {
        const response = await api.get(buildURL('/penugasan'));
        return response.data; 
    } catch (error) {
        console.error('Error fetching penugasan data:', error);
        throw error;
    }
};

export const deletePenugasan = async (id) => {
    try {
        const response = await api.delete(buildURL(`/penugasan/${id}`));

        if (response.data.status) {
            return response.data;
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('Error deleting penugasan:', error);
        throw error;
    }
};

export async function updatePenugasan(penugasan) {
    try {
        const response = await api.put(buildURL(`/penugasan/${penugasan.ID_Penugasan}`), penugasan);

        if (response.data && response.data.updated_at) {
            return response.data;
        } else {
            console.error('Update failed: No updated data returned');
            return response.data;
        }
    } catch (error) {
        console.error('Error updating penugasan:', error);
        throw error; 
    }
};





