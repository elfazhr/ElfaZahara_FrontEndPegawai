// auth.js
import api, { buildURL } from './api';

export const login = async (email, password) => {
  try {
    // Melakukan permintaan POST ke endpoint login
    const response = await api.post(buildURL('/login'), {
      email,
      password
    });

    // Mengecek apakah login berhasil
    if (response.data.status) {
      // Menyimpan token ke localStorage
      localStorage.setItem('access_token', response.data.data.access_token);
      return response.data; // Mengembalikan data untuk digunakan di komponen lain
    } else {
      return response.data; // Jika login gagal, kembalikan pesan error
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
    try {
      // Ambil token dari localStorage
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Token not found');
      }
  
      // Menambahkan token di header Authorization dan menggunakan POST method untuk logout
      const response = await api.post(buildURL('/logout'), null, {
        headers: {
          Authorization: `Bearer ${token}`  // Menambahkan token ke header
        }
      });
  
      // Mengecek apakah logout berhasil
      if (response.data.status) {
        // Hapus token dari localStorage setelah logout
        localStorage.removeItem('access_token');
        return response.data;  // Mengembalikan response
      } else {
        return response.data;
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };