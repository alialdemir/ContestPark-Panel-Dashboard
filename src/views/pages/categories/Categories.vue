<template>
  <div>
    <edit-category
      :categoryId="selectedCategoryId"
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="addNewDataSidebar = false"
    />
    <table-pagination
      :onEdit="this.onEdit"
      :onCreate="this.onCreate"
      title="Kategoriler"
      :items="getCategories"
      :headers="headers"
    ></table-pagination>
  </div>
</template>

<script>
import TablePagination from '../../ui-elements/table/TablePagination.vue';

import EditCategory from './EditCategory.vue';
export default {
  components: {
    TablePagination,
    EditCategory
  },
  computed: {
    getCategories() {
      return this.$store.state.categories.items || [];
    }
  },
  methods: {
    onEdit(category) {
      this.selectedCategoryId = category.categoryId;
      this.addNewDataSidebar = true;
    },
    onCreate() {
      this.selectedCategoryId = 0;
      this.addNewDataSidebar = true;
    }
  },
  created() {
    this.$store.dispatch('getCategories', {
      pageSize: 9999,
      pageNumber: 1
    });
  },
  data: () => ({
    addNewDataSidebar: false,
    selectedCategoryId: 0,
    headers: [
      {
        header: 'Kategori Adı',
        key: 'categoryName'
      },
      {
        header: 'Gösterim Sırası',
        key: 'displayOrder'
      },
      {
        header: 'Aktif/Pasif',
        key: 'visibility',
        type: 'status'
      },
      {
        header: 'Güncellenme Tarihi',
        key: 'modifiedDate',
        type: 'date'
      },
      {
        header: 'Oluşturulma Tarihi',
        key: 'createdDate',
        type: 'date'
      }
    ]
  })
};
</script>