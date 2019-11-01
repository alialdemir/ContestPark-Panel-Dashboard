<template>
  <div>
    <vx-card class="mb-6" title="Question Generator" code-toggler>
      <vs-row class="pb-2" vs-w="12">
        <vs-col vs-type="flex" vs-align="center" vs-lg="4" vs-sm="6" vs-xs="12">
          <vs-row>
            <vs-col vs-type="flex" vs-align="center" vs-w="12">
              <vs-row>
                <vs-col vs-type="flex" vs-align="center" vs-w="7">
                  <span>Json File</span>
                </vs-col>
                <vs-col vs-type="flex" vs-align="center" vs-w="5">
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
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>

        <vs-col vs-type="flex" vs-align="center" vs-lg="4" vs-sm="6" vs-xs="12">
          <vs-row>
            <vs-col vs-type="flex" vs-align="center" vs-w="12">
              <vs-row>
                <vs-col vs-type="flex" vs-align="center" vs-w="7">
                  <span>Subcategory</span>
                </vs-col>
                <vs-col vs-type="flex" vs-align="center" vs-w="5">
                  <dropdown :items="getSubCategoriesDropdown" @onChanged="onSelectedCategory" />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>

        <vs-col vs-type="flex" vs-align="center" vs-lg="4" vs-sm="6" vs-xs="12">
          <vs-row>
            <vs-col vs-type="flex" vs-align="center" vs-w="12">
              <vs-row>
                <vs-col vs-type="flex" vs-align="center" vs-w="7">
                  <span>Link(Optional)</span>
                </vs-col>
                <vs-col vs-type="flex" vs-align="center" vs-w="5">
                  <dropdown :items="answerKeys" @onChanged="onSelecLinkKey" />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>

      <vs-row class="pb-2" vs-w="12">
        <vs-col vs-type="flex" vs-align="center" vs-lg="4" vs-sm="6" vs-xs="12">
          <vs-row>
            <vs-col vs-type="flex" vs-align="center" vs-w="12">
              <vs-row>
                <vs-col vs-type="flex" vs-align="center" vs-w="7">
                  <span>Question Type</span>
                </vs-col>
                <vs-col vs-type="flex" vs-align="center" vs-w="5">
                  <dropdown :items="questionTypes" @onChanged="onSelectedQuestionType" />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>
        <vs-col vs-type="flex" vs-align="center" vs-lg="4" vs-sm="6" vs-xs="12">
          <vs-row>
            <vs-col vs-type="flex" vs-align="center" vs-w="12">
              <vs-row>
                <vs-col vs-type="flex" vs-align="center" vs-w="7">
                  <span>Question</span>
                </vs-col>
                <vs-col vs-type="flex" vs-align="center" vs-w="5">
                  <vs-input class="w-full" v-model="selected.question" />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>
        <vs-col vs-type="flex" vs-align="center" vs-lg="4" vs-sm="6" vs-xs="12">
          <vs-row>
            <vs-col vs-type="flex" vs-align="center" vs-w="12">
              <vs-row>
                <vs-col vs-type="flex" vs-align="center" vs-w="7">
                  <span>Question Language</span>
                </vs-col>
                <vs-col vs-type="flex" vs-align="center" vs-w="5">
                  <dropdown @onChanged="onSelectedQuestionLanguage" :items="translateTypes" />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>

      <vs-row class="pb-2" vs-w="12">
        <vs-col vs-type="flex" vs-align="center" vs-lg="4" vs-sm="6" vs-xs="12">
          <vs-row>
            <vs-col vs-type="flex" vs-align="center" vs-w="12">
              <vs-row>
                <vs-col vs-type="flex" vs-align="center" vs-w="7">
                  <span>Answer Type</span>
                </vs-col>
                <vs-col vs-type="flex" vs-align="center" vs-w="5">
                  <dropdown :items="answerTypes" @onChanged="onSelectedAnswerType" />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>

        <vs-col vs-type="flex" vs-align="center" vs-lg="4" vs-sm="6" vs-xs="12">
          <vs-row>
            <vs-col vs-type="flex" vs-align="center" vs-w="12">
              <vs-row>
                <vs-col vs-type="flex" vs-align="center" vs-w="7">
                  <span>Answer Key</span>
                </vs-col>
                <vs-col vs-type="flex" vs-align="center" vs-w="5">
                  <dropdown :items="answerKeys" @onChanged="onSelectedKey" />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>

        <vs-col vs-type="flex" vs-align="center" vs-lg="4" vs-sm="6" vs-xs="12">
          <vs-row>
            <vs-col vs-type="flex" vs-align="center" vs-w="12">
              <vs-row>
                <vs-col vs-type="flex" vs-align="center" vs-w="7">
                  <span>Answer Language</span>
                </vs-col>
                <vs-col vs-type="flex" vs-align="center" vs-w="5">
                  <dropdown :items="translateTypes" @onChanged="onSelectedAnswerLanguage" />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>
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
import Dropdown from '../../ui-elements/dropdown/Dropdown.vue';

export default {
  components: {
    Dropdown
  },
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
    },
    /**
     * Cevap tipini set eder
     */
    onSelectedAnswerType(key) {
      this.selected.answerType = key;
    },
    /**
     * Soru tipini set etme eventi
     */
    onSelectedQuestionType(key) {
      this.selected.questionType = key;
    },
    /**
     * Kategoriyi set etme eventi
     */
    onSelectedCategory(key) {
      this.selected.category = key;
    },
    /**
     * Cevap şıkları için oluşturulacak keyi set eder
     */
    onSelectedKey(key) {
      this.selected.answerKey = key;
    },
    /**
     * link keyi set eder
     */
    onSelecLinkKey(key) {
      this.selected.link = key;
    },
    /**
     * Dil seçmini set eder
     */
    onSelectedQuestionLanguage(selectedQuestionLanguage) {
      this.selected.questionLanguage = selectedQuestionLanguage;
    },
    /**
     * Dil seçmini set eder
     */
    onSelectedAnswerLanguage(selectedAnswerLanguage) {
      this.selected.answerLanguage = selectedAnswerLanguage;
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

.upload-btn {
  display: block;
  text-align: center;
  margin: 20px auto 20px;
  width: 50%;
  height: 30px;
  background-color: #fcff7f;
  line-height: 30px;
}

.upload-btn:hover {
  background-color: #c39d5a;
  color: white;
  cursor: pointer;
}
</style>