 
 <template>
  <vs-col vs-type="flex" vs-align="center" vs-lg="4" vs-sm="6" vs-xs="12">
    <vs-row>
      <vs-col vs-type="flex" vs-align="center" vs-w="12">
        <vs-row>
          <vs-col vs-type="flex" vs-align="center" vs-w="7">
            <span>{{getLabel}}</span>
          </vs-col>
          <vs-col vs-type="flex" vs-align="center" vs-w="5">
            <slot />
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
  </vs-col>
</template>

<script>
export default {
  name: 'cp-vertical-form',
  props: {
    label: {
      type: String
    }
  },
  computed: {
    getLabel() {
      return this.$props.label;
    }
  }
};
</script>
 