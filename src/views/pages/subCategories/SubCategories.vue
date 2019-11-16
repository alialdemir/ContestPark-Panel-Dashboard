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
      title="SubCategories"
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
        header: 'SubCategory Name',
        key: 'subCategoryName'
      },
      {
        header: 'Display Price',
        key: 'displayPrice'
      },
      {
        header: 'Display Order',
        key: 'displayOrder'
      },
      {
        header: 'Linked Categories',
        key: 'linkedCategories'
      },
      {
        header: 'Visibility',
        key: 'visibility',
        type: 'status'
      },
      {
        header: 'Modified Date',
        key: 'modifiedDate',
        type: 'date'
      },
      {
        header: 'Created Date',
        key: 'createdDate',
        type: 'date'
      }
    ]
  })
};
</script>