<template>
  <vs-sidebar
    click-not-close
    position-right
    parent="body"
    default-index="1"
    color="primary"
    class="add-new-data-sidebar items-no-padding"
    spacer
    v-model="isSidebarActiveLocal"
  >
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{getTitle}}</h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
    <VuePerfectScrollbar class="scroll-area--data-list-add-new pb-6" :settings="settings">
      <div class="p-6">
        <vs-images alternating not-border-radius not-margin hover="dark">
          <vs-image :src="picturePath" />
        </vs-images>
        <vs-tabs>
          <vs-tab
            :label="localized.language"
            :key="indextr"
            v-for="(localized, indextr) in localizedModels"
          >
            <vs-input label="Subcategory name" size="default" v-model="localized.text" />
            <vs-input label="Description" size="default" v-model="localized.description" />
          </vs-tab>
        </vs-tabs>

        <vs-select label="Visibility" v-model="visibility">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item,index) in getVisibility"
          />
        </vs-select>
        <vs-dropdown vs-custom-content vs-trigger-click>
          <a class="a-icon" href.prevent>
            Categories
            <vs-icon class icon="expand_more"></vs-icon>
          </a>

          <vs-dropdown-menu>
            <vs-checkbox
              v-for="(region, index) in categoriesDropdown"
              :key="index"
              v-model="categoryIds"
              :vs-value="region"
            >{{ region.categoryName }}</vs-checkbox>
          </vs-dropdown-menu>
        </vs-dropdown>
        <vs-input label="Price" size="default" v-model="price" />
        <vs-input-number v-model="displayOrder" label="Display Order" />
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button class="mr-6" color="success" @click="onSave">Save</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { mapFields, mapMultiRowFields } from 'vuex-map-fields';

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    subCategoryId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    subCategoryId(val) {
      if (val && val > 0) {
        this.$store.dispatch('getSubCategoryById', val);
      }
      this.$store.dispatch('getCategoriesDropdown');
    }
  },
  data() {
    return {
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  computed: {
    isSidebarActiveLocal: {
      get() {
        return this.isSidebarActive;
      },
      set(val) {
        if (!val) {
          this.$emit('closeSidebar');
        }
      }
    },

    getVisibility() {
      return this.$store.state.visibility;
    },

    categoriesDropdown() {
      return this.$store.state.categoriesDropdown;
    },

    getTitle() {
      return this.$props.categoryId > 0
        ? 'EDİT SUBCATEGORY'
        : 'ADD NEW SUBCATEGORY';
    },
    ...mapFields([
      'subCategoryForm.visibility',
      'subCategoryForm.picturePath',
      'subCategoryForm.price',
      'subCategoryForm.displayOrder',
      'subCategoryForm.categoryIds'
    ]),
    ...mapMultiRowFields(['subCategoryForm.localizedModels'])
  },
  methods: {
    onSave() {
      const subCategoryForm = {
        ...this.$store.state.subCategoryForm,
        subCategoryId: this.$props.subCategoryId
      };

      const url =
        subCategoryForm.subCategoryId > 0
          ? 'updateSubCategory'
          : 'addSubCategory';

      this.$store.dispatch(url, subCategoryForm);
      this.isSidebarActiveLocal = false;
    }
  },
  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  /deep/ .vs-sidebar--background {
    z-index: 52010;
  }

  /deep/ .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;
  }
}
.scroll-area--data-list-add-new {
  height: calc(100% - 4.3rem);
}
</style>

<style lang="css">
.vs-sidebar-position-right {
  right: 0 !important;
}
.vs-select--options.vs-select-primary,
.con-vs-dropdown--menu {
  z-index: 999999;
}

.vs-input-number {
  justify-content: end;
  margin-left: 0px;
}

.vs-tabs--content {
  padding-left: 0;
}
</style>