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
          <vs-select v-model="selected.category">
            <vs-select-item
              :key="index"
              :value="item.value"
              :text="item.text"
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
          <vs-button color="warning" type="border" class="mb-2" @click="onTesting">Testing</vs-button>
        </div>
      </div>
      <template slot="codeContainer">{{ selected.jsonQuestions }}</template>
    </vx-card>

    <vx-card class="mb-6" title="Questions" code-toggler>
      <template slot="codeContainer">{{ questions }}</template>
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
        category: { text: 'Choose!', value: 0 },
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
          text: 'Turkish to English',
          value: 'tr:en'
        },
        {
          text: 'English to Turkish',
          value: 'en:tr'
        },
        {
          text: 'None',
          value: 'none'
        }
      ],
      questions: []
    };
  },
  computed: {
    getHeaders() {
      return this.getJsonQuestionKeys().map(item => {
        return {
          header: item,
          key: item
        };
      });
    },
    /**
     * Cevap şıklarından boş olanları filtrelerek döndürür
     */
    getJsonQuestion() {
      const selectedAnswerKey = this.selected.answerKey.value;

      return this.selected.jsonQuestions.filter(item => {
        const val = item[selectedAnswerKey];

        return typeof val !== 'undefined' && val !== '';
      });
    },
    getQuestionAnswer() {
      return this.$store.state.questionAnswer;
    },
    getTranslatedTexts() {
      return this.$store.state.translatedTexts;
    },
    getLanguages() {
      return this.$store.state.languages;
    },
    getSubCategoriesDropdown() {
      return this.$store.state.subCategoriesDropdown;
    },
    getAnswerLanguage() {
      const selectedAnswerLanguage = this.selected.answerLanguage.value;
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
      const selectedQuestionLanguage = this.selected.questionLanguage.value;
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
      this.validateForm();
    },
    async onTesting() {
      this.questions = [];
debugger
      this.$store.dispatch('clearQuestionAnswer');

      //   const selectedAnswerKey = this.selected.answerKey.value;
      this.answerRandomSort();

      for (let i = 0; i < this.getQuestionAnswer.length; i++) {
        const item = this.getQuestionAnswer[i];
        const questionLanguage = this.getQuestionLanguage.language;
        const question = item.question;

        this.questions.push({
          questionLocalized: [
            {
              language: questionLanguage,
              question
            },
            {
              language:
                questionLanguage === this.getLanguages.english
                  ? this.getLanguages.turkish
                  : this.getLanguages.english,
              question: await this.translateQuestion(
                question,
                this.getQuestionLanguage.target,
                this.getQuestionLanguage.source
              )
            }
          ],
          answers: [
            {
              language: item.language,
              correctStylish: item.correctStylish,
              stylish1: item.stylish1,
              stylish2: item.stylish2,
              stylish3: item.stylish3
            },
            {
              language: this.getLanguages.english,
              correctStylish: await this.translateAnswer(
                item.correctStylish,
                this.getAnswerLanguage.target,
                this.getAnswerLanguage.source
              ),
              stylish1: await this.translateAnswer(
                item.stylish1,
                this.getAnswerLanguage.target,
                this.getAnswerLanguage.source
              ),
              stylish2: await this.translateAnswer(
                item.stylish2,
                this.getAnswerLanguage.target,
                this.getAnswerLanguage.source
              ),
              stylish3: await this.translateAnswer(
                item.stylish3,
                this.getAnswerLanguage.target,
                this.getAnswerLanguage.source
              )
            }
          ],
          questions: [
            {
              questionType: this.selected.questionType.value,
              answerTypes: this.selected.answerType.value,
              subCategoryId: this.selected.category.value,
              link: item.link
            }
          ]
        });
      }
    },
    /**
     * Form validation
     */
    validateForm() {
      if (this.answerKeys.length === 0) {
        alert('Please load a json file');
        return;
      }

      if (this.selected.category.value === 0) {
        alert('Select subcategory id');
        return;
      }

      if (this.selected.questionType.value === 0) {
        alert('Select question type');
        return;
      }

      if (this.selected.question === '') {
        alert('Write a question');
        return;
      }

      if (this.selected.questionLanguage.value === '') {
        alert('Select question language');
        return;
      }

      if (this.selected.answerType.value === 0) {
        alert('Select answer type');
        return;
      }

      if (this.selected.answerKey.value === '') {
        alert('Select answer key');
        return;
      }

      if (this.selected.answerLanguage.value === '') {
        alert('Select answer language');
        return;
      }

      return true;
    },
    translateAnswer(textToTranslate, target, source) {
      if (this.selected.answerLanguage.value === 'none') {
        return textToTranslate;
      }

      return this.translateText(textToTranslate, target, source);
    },
    translateQuestion(textToTranslate, target, source) {
      if (this.selected.questionLanguage === 'none') {
        return textToTranslate;
      }

      return this.translateText(textToTranslate, target, source);
    },
    /**
     * Çeviri işlemi yapar
     */
    async translateText(textToTranslate, target, source) {
      const translatedTexts = this.getTranslatedTexts[textToTranslate];
      if (translatedTexts !== undefined) {
        return translatedTexts;
      }

      return await this.$store.dispatch('translate', {
        textToTranslate,
        target,
        source
      });
    },
    /*
     * Şıkları random sıraları şekilde array oluşturur
     */
    answerRandomSort() {
      const selectedAnswerKey = this.selected.answerKey.value;
      const onlyAnswerKeyItems = this.getOnlyAnswerKeyItems();

      this.getJsonQuestion.forEach(item => {
        const correctStylish = item[selectedAnswerKey];

this.$store.dispatch('getRandomAnswersFromArray', {
          answers: onlyAnswerKeyItems,
          correctStylish,
          link: item[this.selected.link.value] || '',
          question: this.replaceQuestionFields(item),
          language:
            this.getQuestionLanguage.language === this.getLanguages.english
              ? this.getLanguages.english
              : this.getLanguages.turkish
        });
      });
    },

    replaceQuestionFields(item) {
      const replaceQuestion =
        this.selected.question.match(/[^{{\\}]+(?=}})/g) || [];
      let question = this.selected.question;
      for (let j = 0; j < replaceQuestion.length; j++) {
        const replaceField = replaceQuestion[j];
        const fieldValue = item[replaceField];

        question = this.selected.question.replace(
          `{{${replaceField}}}`,
          fieldValue
            .toLowerCase()
            .charAt(0)
            .toUpperCase() + fieldValue.substr(1).toLowerCase()
        );
      }

      return question;
    },

    /**
     * Oluşturulacak soruların sadece cevap şıklarını verir
     */
    getOnlyAnswerKeyItems() {
      const selectedAnswerKey = this.selected.answerKey.value;

      return this.getJsonQuestion.map(item => item[selectedAnswerKey]);
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