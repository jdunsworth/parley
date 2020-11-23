<template>
  <q-layout view="lhh lpR lff">
    <q-drawer
      show-if-above
      v-model="navigationDrawer"
      side="left"
    >
      <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px;">
        <q-list>
          <template v-for="nav in navigation">
            <q-item
              :key="nav.name"
              :active="nav.name === 'Messages'"
              active-class="bg-accent"
              clickable
              v-ripple
            >
              <q-item-section avatar>
                <q-icon :name="`fas fa-${nav.icon}`" />
              </q-item-section>

              <q-item-section>
                {{ nav.name }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </q-scroll-area>
      <div class="absolute-top" style="height: 150px; border-bottom: 1px solid #1976D2;">
        <div class="absolute-bottom bg-transparent" style="margin: 10px 10px;">
          <q-avatar size="56px" class="q-mb-sm" color="accent">
            <q-icon name="fas fa-user" color="primary" />
          </q-avatar>
          <div class="text-weight-bold">Kinley Dunsworth</div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      navigationDrawer: false,
      navigation: [
        {
          name: 'Assignments',
          icon: 'calculator',
        },
        {
          name: 'Messages',
          icon: 'envelope',
        },
      ],
    };
  },
};
</script>
