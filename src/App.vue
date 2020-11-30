<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Parley',
  beforeCreate() {
    this.$store.dispatch('initializeStore');
  },
  mounted() {
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
