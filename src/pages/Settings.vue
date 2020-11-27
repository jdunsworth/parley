<template>
  <q-page padding>
    Settings
  </q-page>
</template>

<script>
export default {
  name: 'ParleySettings',

  methods: {
    // Show Developer Console
    windowDevConsole() {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().toggleDevTools();
      }
    },
  },
};
</script>
