<template>
  <vx-card :title="title">
    <!-- ADD NEW -->
    <vs-button
      v-show="isCreateActive"
      slot="title-right"
      @click="onClickCreate"
      size="small"
      color="primary"
      type="border"
    >
      <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
      <span class="ml-2 text-base text-primary">Add New</span>
    </vs-button>

    <vs-table max-items="10" pagination :data="items">
      <template slot="thead">
        <vs-th :key="indextr" v-for="(tr, indextr) in getHeaders">{{getHeaders[indextr].header}}</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(item, indextr) in data">
          <vs-td v-show="isEditTableActive">
            <edit-table :item="item" :onEdit="onEdit" :onDelete="onDelete"></edit-table>
          </vs-td>
          <vs-td :key="indextrx" v-for="(key, indextrx) in getKeys" :data="item[key.key]">
            <vs-chip
              v-if="key.type === 'status'"
              :color="getStatusColor(item[key.key])"
              class="product-order-status"
            >{{getStatusText(item[key.key])}}</vs-chip>
            <span v-else-if="key.type === 'date'">{{ item[key.key] | moment("dddd, MMMM Do YYYY") }}</span>

            <div v-else>{{item[key.key]}}</div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </vx-card>
</template>

<script>
import EditTable from './EditTable.vue';
export default {
  props: {
    title: String,
    headers: Array,
    items: Array,
    onEdit: {
      type: Function,
      default: null
    },
    onCreate: {
      type: Function,
      default: null
    },
    onDelete: {
      type: Function,
      default: null
    },
    isCreateActive: {
      type: Boolean,
      default: true
    },
    isEditTableActive: {
      type: Boolean,
      default: true
    }
  },
  components: { EditTable },
  methods: {
    getStatusColor(isActive) {
      return isActive === true ? 'success' : 'danger';
    },
    getStatusText(isActive) {
      return isActive === true ? 'Active' : 'Passive';
    },
    onClickCreate() {
      if (this.onCreate) {
        this.onCreate();
      }
    }
  },
  computed: {
    getKeys() {
      return this.headers.filter(item => item.key !== '');
    },
    getHeaders() {
      if (this.isEditTableActive === false) {
        return this.headers;
      }

      return [
        {
          key: '',
          header: 'Actions'
        },
        ...this.headers
      ];
    }
  }
};
</script>