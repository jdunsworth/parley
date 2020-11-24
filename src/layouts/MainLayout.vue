<template>
  <q-layout view="lhh lpR lff">
    <q-drawer
      show-if-above
      v-model="navDrawer"
      side="left"
    >

      <!-- User Select :: START  -->
      <q-scroll-area
        id="profileNav"
        horizontal
      >
        <div class="row no-wrap">

          <!-- Add Profile Button -->
          <q-avatar color="accent" size="50px" class="q-ma-md cursor-pointer">
            <q-icon name="fas fa-plus" />
          </q-avatar>

          <!-- // TODO :: Loop over profiles in config file -->
          <q-avatar
            v-for="i in [1, 2, 3, 4, 5, 6]"
            :key="i"
            size="50px"
            color="accent"
            class="q-ma-md q-ml-none cursor-pointer"
          >
            <q-icon :color="(i === 3) ? 'primary': 'grey-7'" name="fas fa-user" />
          </q-avatar>
        </div>
      </q-scroll-area>
      <!-- User Select :: END -->

      <!-- Application Nav :: START -->
      <q-scroll-area style="height: calc(100% - 350px); margin-top: 100px;">
        <q-list>

          <!-- Core Nav :: START -->
          <template v-for="item in navItems">
            <q-item
              :key="item.name"
              :to="`/${item.route}`"
              clickable
              v-ripple
              exact
              exact-active-class="bg-accent"
            >

              <q-item-section avatar>
                <q-icon :name="`fas fa-${item.icon}`" />
              </q-item-section>

              <q-item-section>
                {{ item.name }}
              </q-item-section>
            </q-item>
          </template>
          <!-- Core Nav :: END -->

          <q-separator spaced />

          <!-- Settings Nav :: START -->
          <q-item-label header class=" q-pt-xs q-pl-sm q-pb-md">Settings</q-item-label>

          <q-item
            v-ripple
            clickable
            exact
            exact-active-class="bg-accent"
          >
            <q-item-section avatar>
              <q-icon name="fas fa-cog" />
            </q-item-section>
            <q-item-section>
              Main Settings
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-ripple
            exact
            exact-active-class="bg-accent"
          >
            <q-item-section avatar>
              <q-icon name="fas fa-plus" />
            </q-item-section>
            <q-item-section>
              Integrations
            </q-item-section>
          </q-item>
          <!-- Settings Nav :: END -->
        </q-list>
      </q-scroll-area>
      <!-- Application Nav :: END -->

      <!-- Profile Box :: START -->
      <div class="absolute-top" style="height: 150px; border-bottom: 1px solid #1976D2;">
        <div class="absolute-bottom bg-transparent" style="margin: 10px 10px;">
          <q-avatar size="56px" class="q-mb-sm" color="accent">
            <q-icon name="fas fa-user" color="primary" />
          </q-avatar>
          <div class="text-weight-bold">Kinley Dunsworth</div>
        </div>
      </div>
      <!-- Profile Box :: END -->
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
      navDrawer: false,
      navItems: [
        {
          name: 'Overview',
          icon: 'tachometer-alt',
          route: '',
        },
        {
          name: 'Assignments',
          icon: 'clipboard-list',
          route: 'assignments',
        },
        {
          name: 'Messages',
          icon: 'envelope',
          route: 'messages',
        },
        {
          name: 'Grades',
          icon: 'calculator',
          route: 'grades',
        },
        {
          name: 'Classmates',
          icon: 'users',
          route: 'classmates',
        },
      ],
    };
  },
};
</script>

<style lang="stylus">
#profileNav
  height 90px
  width 290px
  margin-top 150px
  z-index 1

.navContainer
  height 90px
  width 300px
  margin-top 150px
</style>
