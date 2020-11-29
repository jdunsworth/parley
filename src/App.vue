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
};
</script>
