<template>
  <div class="dropdown">
    <vs-dropdown>
      <vs-button class="btnx btn-dropdown" color="dark" size="small" type="filled">
        <span>{{selected.text}}</span>
        <vs-icon class icon="expand_more"></vs-icon>
      </vs-button>

      <vs-dropdown-menu>
        <vs-dropdown-item
          @click="onChanged(item)"
          :key="indextr"
          v-for="(item, indextr) in items"
        >{{item.text}}</vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array
    }
  },
  data() {
    return {
      selected: {
        text: 'Choose!',
        value: ''
      }
    };
  },
  methods: {
    onChanged(item) {
      if (item.value !== '') {
        this.$emit('onChanged', item);
        this.selected = item;
      }
    }
  }
};
</script> 
<style >
.dropdown input[type='color'] {
  border: 0px;
  width: 30px;
  height: 30px;
  display: block;
}
.dropdown .a-icon {
  outline: none;
  text-decoration: none !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dropdown .a-icon i {
  font-size: 18px;
}

.dropdown .vs-button-text {
  display: flex;
  justify-content: space-between;
}

.dropdown .vs-button-text span {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}

.parent-dropdown,
.btn-dropdown {
  width: 100%;
  min-width: 103px;
}

.btn-dropdown i {
  color: #000 !important;
}
</style>