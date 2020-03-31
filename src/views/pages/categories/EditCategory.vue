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
        <vs-tabs>
          <vs-tab
            :label="localized.language"
            :key="indextr"
            v-for="(localized, indextr) in localizedModels"
          >
            <vs-input label="Kategori Adı" size="default" v-model="localized.text" />
          </vs-tab>
        </vs-tabs>
        <vs-select label="Aktif/Pasif" v-model="visibility">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item,index) in getVisibility"
          />
        </vs-select>
        <vs-input-number v-model="displayOrder" label="Gösterim Sırası" />
      </div>
    </VuePerfectScrollbar>

    <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
      <vs-button class="mr-6" color="success" @click="onSave">Kaydet</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">İptal</vs-button>
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
    categoryId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    categoryId(val) {
      if (val && val > 0) {
        this.$store.dispatch('getCategoryById', val);
      }
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

    getTitle() {
      return this.$props.categoryId > 0 ? 'KATEGORİ GÜNCELLE' : 'KATEGORİ EKLE';
    },
    ...mapFields(['categoryForm.visibility', 'categoryForm.displayOrder']),
    ...mapMultiRowFields(['categoryForm.localizedModels'])
  },
  methods: {
    onSave() {
      const categoryForm = {
        ...this.$store.state.categoryForm,
        categoryId: this.$props.categoryId
      };

      const url =
        categoryForm.categoryId > 0 ? 'updateCategory' : 'addCategory';

      this.$store.dispatch(url, categoryForm);
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
.vs-select--options.vs-select-primary {
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