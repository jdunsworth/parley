<template>
  <q-layout view="lhh lpR lff">
    <q-drawer
      show-if-above
      side="left"
    >

      <!-- Profile Selector -->
      <div class="row">
        <div class="col q-py-sm text-h4 text-center">Parley</div>
      </div>
      <!-- END: Profile Selector -->

      <!-- Navigation -->
      <q-list>
        <q-item
          clickable
          v-ripple
          exact
          exact-active-class="bg-accent text-white"
        >
          <q-item-section avatar>
            <q-icon name="fas fa-plus" />
          </q-item-section>
          <q-item-section>
            Integrations
          </q-item-section>
        </q-item>
      </q-list>
      <!-- END: Navigation -->

    </q-drawer>

    <!-- Router View -->
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data() {
    return {
    };
  }, // /data();

  methods: {
  },

  mounted() {
  },
};
</script>

<style lang="stylus">
</style>
