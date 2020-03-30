<template>
  <vx-card class="mb-6" title="Music Question Generator" code-toggler>
    <vs-row class="pb-2" vs-w="12">
      <cp-vertical-form label="Spotify Id">
        <vs-input class="w-full" v-model="selectedMusicQuestion.spotifyId" />
      </cp-vertical-form>

      <cp-vertical-form label="Spotify question type">
        <vs-select v-model="selectedMusicQuestion.spotifyQuestionType">
          <vs-select-item
            :key="index"
            :value="item.value"
            :text="item.text"
            v-for="(item, index) in spotifyQuestionTypes"
          />
        </vs-select>
      </cp-vertical-form>

      <cp-vertical-form label="Subcategory">
        <vs-select v-model="selectedMusicQuestion.subCategoryId">
          <vs-select-item
            :key="index"
            :value="item.subCategoryId"
            :text="item.subCategoryName"
            v-for="(item, index) in getSubCategoriesDropdown"
          />
        </vs-select>
      </cp-vertical-form>
    </vs-row>

    <div class="vx-row pt-6">
      <div class="vx-col w-full">
        <vs-button color="danger" class="mr-3 mb-2" @click="onSubmit">Generate Music Questions</vs-button>
      </div>
    </div>
  </vx-card>
</template>

<script>
import CpVerticalForm from '../../../components/vertical-form/cpVerticalForm';
export default {
  components: { CpVerticalForm },
  data() {
    return {
      selectedMusicQuestion: {
        spotifyId: '',
        subCategoryId: { text: 'Choose!', value: 0 },
        spotifyQuestionType: { text: 'Choose!', value: 0 }
      },
      spotifyQuestionTypes: [
        { text: 'Playlist', value: 1 },
        { text: 'Artist', value: 2 }
      ]
    };
  },

  computed: {
    getSubCategoriesDropdown() {
      return this.$store.state.subCategoriesDropdown;
    }
  },

  created() {
    this.$store.dispatch('getSubCategoriesDropdown');
  },

  methods: {
    onSubmit() {
      const {
        spotifyId,
        subCategoryId,
        spotifyQuestionType
      } = this.selectedMusicQuestion;

      if (spotifyId && subCategoryId > 0 && spotifyQuestionType) {
        this.$store.dispatch('addMusicQuestions', {
          spotifyId,
          subCategoryId,
          spotifyQuestionType
        });
      }
    }
  }
};
</script>
 