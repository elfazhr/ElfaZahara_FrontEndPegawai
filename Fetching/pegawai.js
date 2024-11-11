import api, { buildURL } from './api';
export const fetchPegawai = async (IDPenugasan = '', searchQuery = '') => {
    try {
        const response = await api.get(buildURL(`/pegawai_all`), {
            params: {
                ID_Penugasan: IDPenugasan, // Kirim parameter unitKerja
                searchQuery: searchQuery
            }
        });
        return response.data; // Mengembalikan data yang diterima dari server
    } catch (error) {
        console.error('Error fetching pegawai data:', error);
        throw error;
    }
};


export const deletePegawai = async (nip) => {
    try {
        const response = await api.delete(buildURL(`/pegawai/${nip}`));

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

export async function updatePegawai({NIP, updatedData}) {
    try {
        const response = await api.put(buildURL(`/pegawai/${NIP}`), updatedData);
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

