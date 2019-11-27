import axios from 'axios';
import Localized from '../../helpers/Localized';

const SubCategoryActions = {

    /**
     * Alt kategori id'sine ait alt kategoriyi döndürür
     */
    async  getSubCategoryById({ commit }, subCategoryId) {
        const { data, status } = await axios.get(`/SubCategory/${subCategoryId}`);

        if (status === 200) {
            commit('DEFAULT_SUBCATEGORY_FORM', data);
        }
    },

    /**
     * Alt kategori form güncelle
     */
    defaultSubCategoryForm({ commit }, data) {
        commit('DEFAULT_SUBCATEGORY_FORM', data);
    },

    /**
     * Kategoriler
     */
    async getSubCategories({ commit }, paing) {
        const { data, status } = await axios.get(
            `/SubCategory?pageSize=${paing.pageSize || 9999}&pageNumber=${paing.pageNumber || 1}`
        );

        if (status === 200) {
            commit('GET_SUBCATEGORIES', data);
        }
    },

    /**
     * Kategori ekle
     * @param {*} param0 
     * @param {*} data 
     */
    async addSubCategory({ dispatch }, data) {
        const { status } = await axios.post('/Category', data);

        if (status === 200) {
            dispatch('getCategories', {
                pageSize: 9999,
                pageNumber: 1
            });
        } else {
            alert('Kategori ekleme işlemi başarısız oldu.');
        }
    },
    /**
     * Set default form
     */
    setDefaultSubCategoryForm({ commit }) {
        commit('DEFAULT_SUBCATEGORY_FORM', {
            subCategoryId: 0,
            visibility: 0,
            displayOrder: 0,
            localizedModels: Localized.map(a => Object.assign({}, a)),
            categoryIds: [],
            price: 0,
            picturePath: '',
        });
    },

    /**
     * Alt kategori güncelle
     * @param {*} param0 
     * @param {*} data 
     */
    async updateSubCategory({ dispatch }, data) {
        const { status } = await axios.put('/SubCategory', data);

        if (status === 200) {
            dispatch('getSubCategories', {
                pageSize: 9999,
                pageNumber: 1
            });
        } else {
            alert('Alt kategori güncelleme işlemi başarısız oldu.');
        }
    },

    /**
     * Get subcategories dropdown
     */
    async getSubCategoriesDropdown({ commit }) {
        const { data, status } = await axios.get('/SubCategory/Dropdown');
        if (status === 200) {
            commit('GET_SUBCATEGORIES_DROPDOWN', data)
        }
    },
}

export default SubCategoryActions