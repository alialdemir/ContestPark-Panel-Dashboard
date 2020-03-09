<template>
  <div>
    <vx-card class="mb-6" title="Question Generator" code-toggler>
      <vs-row class="pb-2" vs-w="12">
        <cp-vertical-form label="Json File">
          <input ref="fileUpload" type="file" class="input-file" @change="successUpload" />
          <vs-button
            class="btnx btn-dropdown"
            color="dark"
            size="small"
            type="filled"
            @click="$refs.fileUpload.click()"
          >
            <span>{{uploadFileName }}</span>
          </vs-button>
        </cp-vertical-form>

        <cp-vertical-form label="Subcategory">
          <vs-select v-model="selected.subCategoryId">
            <vs-select-item
              :key="index"
              :value="item.subCategoryId"
              :text="item.subCategoryName"
              v-for="(item,index) in getSubCategoriesDropdown"
            />
          </vs-select>
        </cp-vertical-form>
        <cp-vertical-form label="Link(Optional)">
          <vs-select v-model="selected.link">
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item,index) in answerKeys"
            />
          </vs-select>
        </cp-vertical-form>
      </vs-row>
      <cp-vertical-form label></cp-vertical-form>
      <vs-row class="pb-2" vs-w="12">
        <cp-vertical-form label="Question Type">
          <vs-select v-model="selected.questionType">
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item,index) in questionTypes"
            />
          </vs-select>
        </cp-vertical-form>

        <cp-vertical-form label="Question">
          <vs-input class="w-full" v-model="selected.question" />
        </cp-vertical-form>

        <cp-vertical-form label="Question Language">
          <vs-select v-model="selected.questionLanguage">
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item,index) in translateTypes"
            />
          </vs-select>
        </cp-vertical-form>
      </vs-row>

      <vs-row class="pb-2" vs-w="12">
        <cp-vertical-form label="Answer Type">
          <vs-select v-model="selected.answerType">
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item,index) in answerTypes"
            />
          </vs-select>
        </cp-vertical-form>

        <cp-vertical-form label="Answer Key">
          <vs-select v-model="selected.answerKey">
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item,index) in answerKeys"
            />
          </vs-select>
        </cp-vertical-form>
        <cp-vertical-form label="Answer Language">
          <vs-select v-model="selected.answerLanguage">
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
              v-for="(item,index) in translateTypes"
            />
          </vs-select>
        </cp-vertical-form>
      </vs-row>

      <div class="vx-row pt-6">
        <div class="vx-col w-full">
          <vs-button color="danger" class="mr-3 mb-2" @click="onSubmit">Load questions</vs-button>
        </div>
      </div>
    </vx-card>
  </div>
</template>
<script>
import CpVerticalForm from '../../../components/vertical-form/cpVerticalForm';
export default {
  components: { CpVerticalForm },
  data() {
    return {
      selected: {
        file: null,
        subCategoryId: { text: 'Choose!', value: 0 },
        questionType: { text: 'Choose!', value: 0 },
        answerType: { text: 'Choose!', value: 0 },
        answerKey: { text: 'Choose!', value: '' },
        link: { text: 'Choose!', value: '' },
        question: '',
        questionLanguage: {
          text: 'Choose!',
          value: ''
        },
        answerLanguage: {
          text: 'Choose!',
          value: ''
        },
        jsonQuestions: []
      },
      uploadFileName: 'Choose file!',
      answerKeys: [],
      answerTypes: [
        {
          text: 'Text',
          value: 1
        }
      ],
      questionTypes: [
        {
          text: 'Text',
          value: 1
        },
        {
          text: 'Music',
          value: 2
        },
        {
          text: 'Image',
          value: 3
        }
      ],
      translateTypes: [
        {
          text: 'None',
          value: 0
        },
        {
          text: 'Turkish to English',
          value: 1
        },
        {
          text: 'English to Turkish',
          value: 2
        }
      ]
    };
  },

  computed: {
    getLanguages() {
      return this.$store.state.languages;
    },

    getSubCategoriesDropdown() {
      return this.$store.state.subCategoriesDropdown;
    },

    getAnswerLanguage() {
      const selectedAnswerLanguage = this.selected.answerLanguage;
      const splitLanguage = selectedAnswerLanguage.split(':');
      const source = splitLanguage[0];

      return {
        source,
        target: splitLanguage[1],
        language:
          source === 'en'
            ? this.getLanguages.english
            : this.getLanguages.turkish
      };
    },

    getQuestionLanguage() {
      const selectedQuestionLanguage = this.selected.questionLanguage;
      const splitLanguage = selectedQuestionLanguage.split(':');
      const source = splitLanguage[0];

      return {
        source,
        target: splitLanguage[1],
        language:
          source === 'en'
            ? this.getLanguages.english
            : this.getLanguages.turkish
      };
    }
  },

  created() {
    this.$store.dispatch('getSubCategoriesDropdown');
  },

  methods: {
    onSubmit() {
      if (!this.validateForm()) {
        return;
      }

      const questionForm = {
        ...this.selected
      };
      let formData = new FormData();
      if (this.selected.file) {
        formData.append('file', this.selected.file);
      }

      const keys = Object.keys(this.selected);
      keys.forEach(key => {
        const item =
          typeof questionForm[key] === 'object'
            ? JSON.stringify(questionForm[key])
            : questionForm[key];
        if (key !== 'file') {
          formData.append(key, item);
        }
      });

      this.$store.dispatch('addQuestions', formData);
    },

    /**
     * Form validation
     */
    validateForm() {
      if (this.answerKeys.length === 0) {
        alert('Please load a json file');

        return false;
      }

      if (this.selected.subCategoryId.value === 0) {
        alert('Select subcategory id');

        return false;
      }

      if (this.selected.questionType.value === 0) {
        alert('Select question type');

        return false;
      }

      if (this.selected.question === '') {
        alert('Write a question');

        return false;
      }

      if (this.selected.questionLanguage.value === '') {
        alert('Select question language');

        return false;
      }

      if (this.selected.answerType.value === 0) {
        alert('Select answer type');

        return false;
      }

      if (this.selected.answerKey.value === '') {
        alert('Select answer key');

        return false;
      }

      if (this.selected.answerLanguage.value === '') {
        alert('Select answer language');

        return false;
      }

      return true;
    },

    /**
     * jSON Soru yükleme
     */
    successUpload(es) {
      let files = es.target.files || es.dataTransfer.files;
      if (!files.length || files[0].type !== 'application/json') {
        return;
      }
      this.uploadFileName = files[0].name;

      const reader = new FileReader();
      const that = this;

      reader.onload = e => {
        that.loadQuestionKeys(e.target.result);
      };
      reader.readAsText(files[0]);

      this.selected.file = files[0];
    },

    /**
     * Yüklenen soruların object keylerini  verir
     */
    getJsonQuestionKeys() {
      if (this.selected.jsonQuestions.length === 0) {
        return [];
      }

      return Object.keys(this.selected.jsonQuestions[0]);
    },

    /**
     * Yüklenen json dosyasındaki objecnin keylerini dropdown için yüklen
     */
    loadQuestionKeys(jsonQuestions) {
      if (typeof jsonQuestions !== 'string') {
        return;
      }
      const obj = JSON.parse(jsonQuestions || '[]');
      if (obj.length === 0) {
        return null;
      }

      this.selected.jsonQuestions = obj;

      const keys = this.getJsonQuestionKeys();
      if (keys === null) {
        return;
      }
      keys.push('none');

      this.answerKeys = keys.map(item => {
        return {
          text: item,
          value: item
        };
      });
    }
  }
};
</script>

<style lang="css" scope>
.vs-con-input-label {
  width: 100%;
}
.input-file {
  display: none;
}
.theme-dark .vs-button-dark.vs-button-filled {
  background: #262c49 !important;
  width: 100%;
  min-height: 37px;
}
.theme-dark .vs-button-dark.vs-button-filled .vs-button--text span {
  display: none;
}

.vs-inputx {
  height: 37px;
}
</style>