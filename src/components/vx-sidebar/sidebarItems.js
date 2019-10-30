/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: '/',
    name: "Dashboard",
    slug: "dashboard",
    icon: "HomeIcon",
    i18n: "Dashboard",
  },
  {
    header: "Manager",
    i18n: "Manager",
  },
  {
    url: "/categories",
    name: "Categories",
    slug: "Categories",
    icon: "MoreVerticalIcon",
    i18n: "Categories",
  },
  {
    url: "/subcategories",
    name: "SubCategories",
    slug: "SubCategories",
    icon: "MoreHorizontalIcon",
    i18n: "SubCategories",
  }, {
    url: null,
    name: "QuestionGenerator",
    slug: "QuestionGenerator",
    icon: "UmbrellaIcon",
    i18n: "QuestionGenerator",
    submenu: [
      {
        url: '/question-generator',
        name: "QuestionGeneratorM",
        slug: "question",
        i18n: "Question",
      },
      {
        url: '/question-generator/music',
        name: "questionGeneratorMusic",
        slug: "QuestionGeneratorMusic",
        i18n: "Music",
      },
    ]
  },
]