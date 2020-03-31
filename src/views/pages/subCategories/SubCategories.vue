<template>
  <div>
    <edit-subCategory
      :subCategoryId="selectedSubCategoryId"
      :isSidebarActive="addNewDataSidebar"
      @closeSidebar="addNewDataSidebar = false"
    />
    <table-pagination
      :onEdit="this.onEdit"
      :onCreate="this.onCreate"
      title="Alt Kategoriler"
      :items="getSubCategories"
      :headers="headers"
    ></table-pagination>
  </div>
</template>

<script>
import TablePagination from '../../ui-elements/table/TablePagination.vue';

import EditSubCategory from './EditSubCategory.vue';
export default {
  components: {
    TablePagination,
    EditSubCategory
  },
  computed: {
    getSubCategories() {
      return this.$store.state.subCategories.items || [];
    }
  },
  methods: {
    onEdit(subCategory) {
      this.selectedSubCategoryId = subCategory.subCategoryId;
      this.addNewDataSidebar = true;
    },
    onCreate() {
      this.selectedSubCategoryId = 0;
      this.addNewDataSidebar = true;
    }
  },
  created() {
    this.$store.dispatch('getSubCategories', {
      pageSize: 9999,
      pageNumber: 1
    });
  },
  data: () => ({
    addNewDataSidebar: false,
    selectedSubCategoryId: 0,
    headers: [
      {
        header: 'Id',
        key: 'subCategoryId'
      },
      {
        header: 'Alt Kategori Adı',
        key: 'subCategoryName'
      },
      {
        header: 'Gösterim Fiyatı',
        key: 'displayPrice'
      },
      {
        header: 'Gösterim Sırası',
        key: 'displayOrder'
      },
      {
        header: 'İlişkili Kategori Sayısı',
        key: 'linkedCategories'
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