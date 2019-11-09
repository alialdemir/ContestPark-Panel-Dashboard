import axios from 'axios';
import Localized from '../../helpers/Localized';

const categoryActions = {

    /**
     * Kategoriler
     */
    async getCategories({ commit }, paing) {
        const { data, status } = await axios.get(
            `/Category?pageSize=${paing.pageSize || 9999}&pageNumber=${paing.pageNumber || 1}`
        );
        if (status === 200) {
            commit('GET_CATEGORIES', data)
        }
    },

    /**
     * Kategori ekle
     * @param {*} param0 
     * @param {*} data 
     */
    async addCategory({ dispatch }, data) {
        const { status } = await axios.post('/Category', data);
        if (status === 200) {
            dispatch('defaultCategoryForm', {
                categoryId: 0,
                visibility: 0,
                displayOrder: 0,
                localizedModels: Localized
            });

            dispatch('getCategories', {
                pageSize: 9999,
                pageNumber: 1
            });
        } else {
            alert('Kategori ekleme işlemi başarısız oldu.');
        }
    },

    /**
     * Kategori güncelle
     * @param {*} param0 
     * @param {*} data 
     */
    async updateCategory({ dispatch }, data) {
        const { status } = await axios.put('/Category', data);
        if (status === 200) {
            dispatch('getCategories', {
                pageSize: 9999,
                pageNumber: 1
            });
        } else {
            alert('Kategori güncelleme işlemi başarısız oldu.');
        }
    },

    /**
     * Kategori id'sine ait kategoriyi döndürür
     */
    async getCategoryById({ dispatch }, categoryId) {
        const { data, status } = await axios.get(`/Category/${categoryId}`)
        if (status === 200) {
            dispatch('defaultCategoryForm', data);
        }
    },

    /**
     * Kategori ekleme güncelleme formunu default hale getirir
     */
    defaultCategoryForm({ commit }, data) {
        commit('DEFAULT_CATEGORY_FORM', data);
    },

    /**
     * Get categories dropdown
     */
    async getCategoriesDropdown({ commit }) {
        const { data, status } = await axios.get('/Category/Dropdown?pageSize=9999&pageNumber=1');
        if (status === 200) {
            commit('GET_CATEGORIES_DROPDOWN', data)
        }
    },
}

export default categoryActions