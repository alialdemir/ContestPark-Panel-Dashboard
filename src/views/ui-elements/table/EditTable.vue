<template>
  <vs-dropdown>
    <vs-button class="btn-drop" type="success-gradient" icon="more_horiz"></vs-button>
    <vs-dropdown-menu>
      <vs-dropdown-item v-if="onClickEdit" @click="onClickEdit(item)">
        <feather-icon icon="EditIcon" svgClasses="w-4 h-4"></feather-icon>
        <span class="ml-2">Edit</span>
      </vs-dropdown-item>

      <vs-dropdown-item v-if="onClickDelete" divider @click="onClickDelete(item)">
        <feather-icon icon="Trash2Icon" svgClasses="w-4 h-4"></feather-icon>
        <span class="ml-2">Delete</span>
      </vs-dropdown-item>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
export default {
  props: {
    item: Object,
    onEdit: {
      type: Function
    },
    onDelete: {
      type: Function
    }
  },
  methods: {
    onClickEdit() {
      if (this.onEdit) {
        this.onEdit(this.item);
      }
    },
    onClickDelete() {
      if (this.onDelete) {
        this.onDelete(this.item);
      }
    }
  }
};
</script>
<style lang="css">
.vs-dropdown--item-link {
  display: flex !important;
}
</style>