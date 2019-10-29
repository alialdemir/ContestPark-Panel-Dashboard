<!-- =========================================================================================
	File Name: TheNavbar.vue
	Description: Navbar component
	Component Name: TheNavbar
	----------------------------------------------------------------------------------------
	Item Name: Vuesax Admin - VueJS Dashboard Admin Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div class="relative">
    <div class="vx-navbar-wrapper">
      <vs-navbar class="vx-navbar navbar-custom" :color="navbarColor" :class="classObj">
        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon
          class="sm:inline-flex xl:hidden cursor-pointer mr-1"
          icon="MenuIcon"
          @click.stop="showSidebar"
        ></feather-icon>

        <vs-spacer></vs-spacer>

        <!-- USER META -->
        <div class="the-navbar__user-meta flex items-center">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ user_displayName }}</p>
            <small>Available</small>
          </div>
          <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
            <div class="con-img ml-3">
              <img
                v-if="activeUserImg.startsWith('http')"
                key="onlineImg"
                :src="activeUserImg"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              />
              <img
                v-else
                key="localImg"
                :src="require(`@/assets/images/portrait/small/${activeUserImg}`)"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block"
              />
            </div>
            <vs-dropdown-menu>
              <ul style="min-width: 9rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="logout"
                >
                  <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"></feather-icon>
                  <span class="ml-2">Logout</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'the-navbar',
  props: {
    navbarColor: {
      type: String,
      default: '#fff'
    }
  },
  data() {
    return {
      navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
      searchQuery: '',
      showFullSearch: false,
      unreadNotifications: [
        {
          index: 0,
          title: 'New Message',
          msg: 'Are your going to meet me tonight?',
          icon: 'MessageSquareIcon',
          time: 'Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)',
          category: 'primary'
        },
        {
          index: 1,
          title: 'New Order Recieved',
          msg: 'You got new order of goods.',
          icon: 'PackageIcon',
          time: 'Wed Jan 30 2019 07:45:23 GMT+0000 (GMT)',
          category: 'success'
        },
        {
          index: 2,
          title: 'Server Limit Reached!',
          msg: 'Server have 99% CPU usage.',
          icon: 'AlertOctagonIcon',
          time: 'Thu Jan 31 2019 07:45:23 GMT+0000 (GMT)',
          category: 'danger'
        },
        {
          index: 3,
          title: 'New Mail From Peter',
          msg: 'Cake sesame snaps cupcake',
          icon: 'MailIcon',
          time: 'Fri Feb 01 2019 07:45:23 GMT+0000 (GMT)',
          category: 'primary'
        },
        {
          index: 4,
          title: "Bruce's Party",
          msg: 'Chocolate cake oat cake tiramisu',
          icon: 'CalendarIcon',
          time: 'Fri Feb 02 2019 07:45:23 GMT+0000 (GMT)',
          category: 'warning'
        }
      ],
      settings: {
        // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      },
      autoFocusSearch: false,
      showBookmarkPagesDropdown: false
    };
  },
  watch: {
    $route() {
      if (this.showBookmarkPagesDropdown)
        this.showBookmarkPagesDropdown = false;
    }
  },
  computed: {
    // HELPER
    sidebarWidth() {
      return this.$store.state.sidebarWidth;
    },
    breakpoint() {
      return this.$store.state.breakpoint;
    },

    // NAVBAR STYLE
    classObj() {
      if (this.sidebarWidth == 'default') return 'navbar-default';
      else if (this.sidebarWidth == 'reduced') return 'navbar-reduced';
      else if (this.sidebarWidth) return 'navbar-full';

      return '';
    },

    // BOOKMARK & SEARCH
    data() {
      return this.$store.state.navbarSearchAndPinList;
    },
    starredPages() {
      return this.$store.state.starredPages;
    },
    starredPagesLimited: {
      get() {
        return this.starredPages.slice(0, 10);
      },
      set(list) {
        this.$store.dispatch('arrangeStarredPagesLimited', list);
      }
    },

    // PROFILE
    user_displayName() {
      return JSON.parse(localStorage.getItem('userInfo') || '{}').displayName;
    },
    activeUserImg() {
      return (
        JSON.parse(localStorage.getItem('userInfo') || '{}').photoURL ||
        this.$store.state.AppActiveUser.img
      );
    }
  },
  methods: {
    updateLocale(locale) {
      this.$i18n.locale = locale;
    },
    showSidebar() {
      this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true);
    },
    selected(item) {
      this.$router.push(item.url);
      this.showFullSearch = false;
    },
    actionClicked(item) {
      // e.stopPropogation();
      this.$store.dispatch('updateStarredPage', {
        index: item.index,
        val: !item.highlightAction
      });
    },
    showNavbarSearch() {
      this.showFullSearch = true;
    },
    showSearchbar() {
      this.showFullSearch = true;
    },
    elapsedTime(startTime) {
      let x = new Date(startTime);
      let now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;

      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      var years = timeDiff;

      if (years > 0) {
        return years + (years > 1 ? ' Years ' : ' Year ') + 'ago';
      } else if (days > 0) {
        return days + (days > 1 ? ' Days ' : ' Day ') + 'ago';
      } else if (hours > 0) {
        return hours + (hours > 1 ? ' Hrs ' : ' Hour ') + 'ago';
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + 'ago';
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? `${seconds} sec ago` : 'just now');
      }

      return 'Just Now';
    },
    logout() {
      // if user is logged in via auth0
      if (this.$auth.profile) this.$auth.logOut();

      // if user is looged in via firebase
      const firebaseCurrentUser = true; // çıkış yap isteği at

      if (firebaseCurrentUser) {
        this.$router.push('/pages/login');
        localStorage.removeItem('userInfo');
      }
      // Change role on logout. Same value as initialRole of acj.js
      this.$acl.change('admin');
      localStorage.removeItem('userRole');
    },
    outside: function() {
      this.showBookmarkPagesDropdown = false;
    },

    // CART DROPDOWN
    removeItemFromCart(item) {
      this.$store.dispatch('eCommerce/toggleItemInCart', item);
    }
  },
  directives: {
    'click-outside': {
      bind: function(el, binding) {
        const bubble = binding.modifiers.bubble;
        const handler = e => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e);
          }
        };
        el.__vueClickOutside__ = handler;
        document.addEventListener('click', handler);
      },

      unbind: function(el) {
        document.removeEventListener('click', el.__vueClickOutside__);
        el.__vueClickOutside__ = null;
      }
    }
  }
};
</script>
