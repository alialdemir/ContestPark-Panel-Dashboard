<!-- =========================================================================================
    File Name: Table.vue
    Description: Table demo - Imports all table demos
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
 

<template>
  <div>
    <edit-category :isSidebarActive="addNewDataSidebar" @closeSidebar="addNewDataSidebar = false" />
    <table-pagination
      :onEdit="this.onEdit"
      :onDelete="this.onDelete"
      :onCreate="this.onCreate"
      title="Categories"
      :items="categories"
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
  methods: {
    onDelete(category) {
      alert(category.categoryId);
    },
    onEdit(category) {
      alert(category.categoryId);
    },
    onCreate() {
      this.addNewDataSidebar = true;
    }
  },
  data: () => ({
    addNewDataSidebar: false,
    headers: [
      {
        header: 'Category Name',
        key: 'categoryName'
      },
      {
        header: 'Display Order',
        key: 'displayOrder'
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
    ],
    categories: [
      {
        categoryId: 4,
        categoryName: 'Music',
        visibility: 0,
        displayOrder: 0,
        modifiedDate: null,
        createdDate: '2019-10-28 04:25:43'
      },
      {
        categoryId: 2,
        categoryName: 'General',
        visibility: 1,
        displayOrder: 0,
        modifiedDate: '2019-09-21 02:21:29',
        createdDate: '2019-09-21 02:21:30'
      },
      {
        categoryId: 3,
        categoryName: 'Football',
        visibility: 1,
        displayOrder: 1,
        modifiedDate: null,
        createdDate: '2019-10-10 20:02:53'
      }
    ]
  })
};
</script>