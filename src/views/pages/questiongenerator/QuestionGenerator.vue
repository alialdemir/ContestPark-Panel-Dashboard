<template>
  <div>
    <vx-card class="mb-6" title="Question Generator" code-toggler>
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
                  <dropdown :items="keys" @onChanged="onSelectedKey" />
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
                  <dropdown :items="categories" @onChanged="onSelectedCategory" />
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
                  <span>Json File</span>
                </vs-col>
                <vs-col vs-type="flex" vs-align="center" vs-w="5">
                  <input type="file" @change="successUpload" />
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
                  <span>Category</span>
                </vs-col>
                <vs-col vs-type="flex" vs-align="center" vs-w="5">
                  <dropdown :items="categories" @onChanged="onSelectedCategory" />
                </vs-col>
              </vs-row>
            </vs-col>
          </vs-row>
        </vs-col>
      </vs-row>

      <div class="vx-row pt-6">
        <div class="vx-col w-full">
          <vs-button class="mr-3 mb-2" @click="onSubmit">Generate</vs-button>
          <vs-button color="warning" type="border" class="mb-2" @click="onSubmit">Testing</vs-button>
        </div>
      </div>
      <template slot="codeContainer">{{ selected.jsonQuestions }}</template>
    </vx-card>

    <table-pagination
      title="Questions"
      :isCreateActive="false"
      :isEditTableActive="false"
      :items="selected.jsonQuestions"
      :headers="getHeaders"
    ></table-pagination>
  </div>
</template>
<script>
import Dropdown from '../../ui-elements/dropdown/Dropdown.vue';

import TablePagination from '../../ui-elements/table/TablePagination.vue';
export default {
  components: {
    Dropdown,
    TablePagination
  },
  data() {
    return {
      selected: {
        category: { text: 'Choose!', value: 0 },
        questionType: { text: 'Choose!', value: 0 },
        answerType: { text: 'Choose!', value: 0 },
        key: { text: 'Choose!', value: 0 },
        question: '',
        questionLanguage: {
          text: 'Choose!',
          value: 0
        },
        jsonQuestions: []
      },
      keys: [],
      categories: [
        {
          text: 'Football',
          value: 3
        },
        {
          text: 'General',
          value: 1
        },
        {
          text: 'Music',
          value: 4
        }
      ],
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
        }
      ]
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
    }
  },
  methods: {
    onSubmit() {
      alert('submit');
    },
    onSelectedAnswerType(key) {
      this.selected.answerType = key;
    },
    onSelectedQuestionType(key) {
      this.selected.questionType = key;
    },
    onSelectedCategory(key) {
      this.selected.category = key;
    },
    onSelectedKey(key) {
      this.selected.key = key;
    },
    onSelectedQuestionLanguage(selectedQuestionLanguage) {
      this.selected.questionLanguage = selectedQuestionLanguage;
    },
    successUpload(es) {
      let files = es.target.files || es.dataTransfer.files;
      if (!files.length || files[0].type !== 'application/json') {
        return;
      }

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
      this.keys = keys.map(item => {
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
</style>