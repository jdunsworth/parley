<template>
  <q-page padding>
    Index
  </q-page>
</template>

<script>
export default {
  name: 'ParleyIndex',

  mounted() {
    if (this.$store.state.profiles.length === 0) {
      this.$router.push({ path: '/profiles/add' });
    }
  },

};
</script>
