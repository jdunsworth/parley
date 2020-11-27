<template>
  <q-layout view="hhh lpR lff">

    <!-- Titlebar -->
    <q-header elevated class="bg-primary text-white">
      <q-bar class="q-electron-drag">
        <q-icon name="far fa-map" />
        <div class="text-weight-bold">Parley for Canvas</div>
        <q-space />

        <!-- Settings Button & Menu-->
        <q-btn
          flat
          icon="fas fa-cog q-electron-drag--exception"
        >
          <!-- Settings Menu -->
          <q-menu auto-close fit anchor="bottom right" self="top right">
            <q-list dense style="min-width: 150px">

              <!-- Toggle Dev Console -->
              <q-item clickable v-close-popup @click="windowDevConsole">
                <q-item-section side>
                  <q-icon name="fas fa-bug" size="xs" />
                </q-item-section>
                <q-item-section>Toggle Dev Console</q-item-section>
              </q-item>

              <!-- Reset Configuration -->
              <q-item clickable v-close-popup>
                <q-item-section side>
                  <q-icon name="fas fa-eraser" size="xs" />
                </q-item-section>
                <q-item-section>Reset Configuration</q-item-section>
              </q-item>
              <q-separator />

              <!-- About Parley -->
              <q-item clickable v-close-popup>
                <q-item-section side>
                  <q-icon name="far fa-map" size="xs" />
                </q-item-section>
                <q-item-section>About Parley</q-item-section>
              </q-item>

            </q-list>
          </q-menu>
          <!-- END: Settings Menu -->
        </q-btn>

        <!-- Minimize button -->
        <q-btn
          dense
          flat
          icon="far fa-window-minimize q-electron-drag--exception"
          @click="windowMinimize"
        >
          <q-tooltip>Minimize</q-tooltip>
        </q-btn>

        <!-- Unmaximize/Restore button -->
        <q-btn
          v-if="isMaximized"
          dense
          flat
          icon="far fa-window-restore q-electron-drag--exception"
          @click="windowUnmaximize"
        >
          <q-tooltip>Restore</q-tooltip>
        </q-btn>

        <!-- Maximize Button -->
        <q-btn
          v-else
          dense
          flat
          icon="far fa-window-maximize q-electron-drag--exception"
          @click="windowMaximize"
        >
          <q-tooltip>Maximize</q-tooltip>
        </q-btn>

        <!-- Close button -->
        <q-btn
          dense
          flat
          icon="far fa-window-close q-electron-drag--exception"
          @click="windowClose"
        >
          <q-tooltip>Close</q-tooltip>
        </q-btn>

      </q-bar>
    </q-header>
    <!-- END: Titlebar -->

    <!-- Navigation Drawer -->
    <q-drawer
      show-if-above
      side="left"
    >

      <div v-if="$store.state.profiles.length > 0">

      </div>

      <div v-else>

      </div>

      <!-- Profile Selector -->
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
    <!-- END: Navigation Drawer -->

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
      isMaximized: false,
    };
  }, // /data();

  methods: {

    // Minimize Electron Window
    windowMinimize() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize();
      }
    },
    // Close Electron Window
    windowClose() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close();
      }
    },

    // Maximize Electron Window
    windowMaximize() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().maximize();
        this.isMaximized = true;
      }
    },

    // Restore Electron Window
    windowUnmaximize() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().unmaximize();
        this.isMaximized = false;
      }
    },

    // Show Developer Console
    windowDevConsole() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    },
  },

  mounted() {
  },
};
</script>

<style lang="stylus">
</style>
