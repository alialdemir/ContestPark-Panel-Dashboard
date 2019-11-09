/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import { default as colors, default as themeConfig } from '../../themeConfig.js';
import Localized from '../helpers/Localized';

const state = {
  isSidebarActive: true,
  breakpoint: null,
  sidebarWidth: "default",
  reduceButton: themeConfig.sidebarCollapsed,
  bodyOverlay: false,
  sidebarItemsMin: false,
  theme: themeConfig.theme || 'light',
  AppActiveUser: {
    id: 0,
    name: 'John Doe',
    about: 'Dessert chocolate cake lemon drops jujubes. Biscuit cupcake ice cream bear claw brownie brownie marshmallow.',
    img: 'avatar-s-11.png',
    status: 'online',
  },

  themePrimaryColor: colors.primary,

  userRole: null,
  // QUESTION GENERATOR
  translatedTexts: {},
  questionAnswer: [],
  questionLocalized: [],
  languages: {
    turkish: 1,
    english: 2
  },
  localizeds: Localized,
  visibility: [
    {
      text: 'Active',
      value: 1,
    },
    {
      text: 'Passive',
      value: 0
    }
  ],
  // CATEGORY
  subCategoriesDropdown: [],
  categories: {},
  categoryForm: {
    categoryId: 0,
    visibility: 0,
    displayOrder: 0,
    localizedModels: Localized
  },
  // SUBCATEGORY
  subCategories: [],
  categoriesDropdown: [],
  subCategoryForm: {
    subCategoryId: 0,
    visibility: 0,
    displayOrder: 0,
    localizedModels: Localized,
    categoryIds: [],
    price: 0,
    picturePath: '',
  },
}

export default state