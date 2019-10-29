/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import { default as colors, default as themeConfig } from '../../themeConfig.js'

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
}

export default state