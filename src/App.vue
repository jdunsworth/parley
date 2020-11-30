<template>
  <div id="q-app">

    <transition-group
      appear
      leave-active-class="animated fadeOut slower"
      enter-active-class="animated fadeIn slower"
    >
      <!-- Initial Loading Animation -->
      <div
        v-if="loading"
        class="absolute-center text-center"
        key="loading-grid">
        <q-spinner-grid color="primary" size="8em" />
        <div class="q-pt-md text-primary text-center text-h5">
          Parley is Loading...
        </div>
      </div>

      <!-- Primary Router View -->
      <router-view v-else key="app-router-view" />

    </transition-group>
  </div>
</template>
<script>
export default {
  name: 'ParleyApp',
  data() {
    return {
      loading: true,
    };
  },

  async beforeCreate() {
    // Initialize store & redirect on setups.
    await this.$store.dispatch('initializeStore').finally(() => {
      if (
        !this.$store.state.config.organization
        && this.$route.path !== '/setup'
      ) {
        // Intention: Going to any route (but /setup) and does NOT have organization
        // Result:    Redirect to Setup
        this.$router.push('/setup');
      } else if (
        this.$store.state.config.organization
        && this.$route.path === '/setup'
      ) {
        // Intention: Going to /setup page and DOES have organization set
        // Result:    Redirect to Index
        this.$router.push('/');
      } else if (
        this.$store.state.profiles.length === 0
        && this.$route.path !== '/profiles/add'
      ) {
        // Intention: Going to any route (but /profiles/add) and does NOT have any profiles set
        // Result:    Redirect to add profile
        this.$router.push('/profiles/add');
      }

      // Simulated loading
      setTimeout(() => { this.loading = false; }, 1500);
    });
  },
  mounted() {
    // Router Interceptor to detect configuration and settings changes
    this.$router.beforeEach((to, from, next) => {
      if (
        !this.$store.state.config.organization
        && to.path !== '/setup'
      ) {
        // Intention: Going to any route (but /setup) and does NOT have organization
        // Result:    Redirect to Setup
        next('/setup');
      } else if (
        this.$store.state.config.organization
        && to.path === '/setup'
      ) {
        // Intention: Going to /setup page and DOES have organization set
        // Result:    Redirect to Index
        next('/');
      } else if (
        this.$store.state.profiles.length === 0
        && to.path !== '/profiles/add'
      ) {
        // Intention: Going to any route (but /profiles/add) and does NOT have any profiles set
        // Result:    Redirect to add profile
        next('/profiles/add');
      } else {
        // Intention: Going to any route
        // Result:    Go to route.
        next();
      }
    });
  },
};
</script>
