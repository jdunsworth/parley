<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'Parley',

  beforeCreate() {
    this.$store.commit('initializeStore');
  },
};
</script>
