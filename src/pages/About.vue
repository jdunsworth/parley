<template>
  <q-page padding>
    <div class="q-pa-md row justify-center">

      <!-- Left Card -->
      <q-card flat bordered class="col-6 q-mr-sm">

        <!-- About Section -->
        <q-card-section class="text-weight-light text-caption">

          <!-- Logo -->
          <div class="q-my-lg text-center">
            <q-img
              src="~/assets/logos/parley_wide.png"
              spinner-color="primary"
              contain
              width="350px"
            />
          </div>
          <p>
            Parley was born out of frustration with using Canvas to manage our daughters schoolwork after being thrust into
            virtual learning from the Great Coronavirus Pandemic of 2020.
          </p>
          <p>
            Even as a seasoned developer and technophile, I found the interface extremely confusing and having to hunt down
            assignments that haven't been  turned in, the lesson plan, and grades got old quickly and knew that others were
            having the same problem as me.
          </p>
          <p>
            This tool is free, open-source, licensed under the
            <a href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank">GNU General Public License v3.0</a>, and adheres to the <a href="https://canvas.instructure.com/login/canvas" target="_blank">Canvas Acceptable Use Policy</a>.
            Hopefully you will find it as useful and helpful as I intend it to be.
            <ul>
              <li>
                Have a suggestion? Find a bug? Submit an issue on
                <a href="https://github.com/jdunsworth/parley/issues" target="_blank">Github</a>.
              </li>
              <li>
                Join the conversation on <a href="https://discord.gg/kzUwrfcNrW" target="_blank">Discord</a>
              </li>
            </ul>
          </p>
        </q-card-section>
        <!-- END: About Section -->

        <!-- Copyright Information -->
        <q-card-section class="text-weight-light text-caption text-center">
          Copyright Goes Here
        <!-- TODO: Add Copyright information -->

        </q-card-section>

      </q-card>
      <!-- END: Left Card -->

      <!-- Right Card -->
      <q-card flat bordered class="col-4">
        <q-card-section class="bg-primary text-white text-bold">
          Parley Information
        </q-card-section>
        <q-list bordered>
          <!-- Application Version -->
          <q-item>
            <q-item-section avatar>
              <q-icon name="fas fa-code-branch" />
            </q-item-section>
            <q-item-section>Application Version</q-item-section>
            <q-item-section side>
              <q-item-label>{{ $store.state.config.version.app }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- Data Configuration Version -->
          <q-item>
            <q-item-section avatar>
              <q-icon name="fas fa-database" />
            </q-item-section>
            <q-item-section>Data Configuration Version</q-item-section>
            <q-item-section side>
              <q-item-label>{{ $store.state.config.version.config }}</q-item-label>
            </q-item-section>
          </q-item>

          <!-- Configuration Location -->
          <q-item clickable v-ripple @click="openConfiguration()">
            <q-tooltip>Open Configuration Folder</q-tooltip>
            <q-item-section avatar>
              <q-icon name="fas fa-hdd" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Configuration Location</q-item-label>
              <q-item-label caption lines="1" class="text-italic">
                <small>{{ $store.state.config.location }}</small>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label>
                <q-icon name="fas fa-folder-open" />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />

          <!-- Github Link -->
          <q-item clickable v-ripple @click.native="open('https://github.com/jdunsworth/parley#readme')">
            <q-item-section avatar>
              <q-icon name="fab fa-github" />
            </q-item-section>
            <q-item-section>Parley Github </q-item-section>
            <q-item-section side>
              <q-icon name="fas fa-external-link-alt" />
            </q-item-section>
          </q-item>

          <!-- Instructure Link -->
          <q-item clickable v-ripple @click.native="open('https://www.instructure.com/')">
            <q-item-section avatar>
              <q-icon name="fas fa-chalkboard-teacher" />
            </q-item-section>
            <q-item-section>Instructure Canvas LMS</q-item-section>
            <q-item-section side>
              <q-icon name="fas fa-external-link-alt" />
            </q-item-section>
          </q-item>

          <!-- Dale Canvas Link -->
          <!-- TODO: Fix canvasURL and name from getters -->
          <q-item clickable v-ripple @click.native="open(`${$store.getters.canvasURL}/login/canvas`)">
            <q-item-section avatar>
              <q-icon name="fas fa-chalkboard-teacher" />
            </q-item-section>
            <q-item-section>Dale Canvas Site </q-item-section>
            <q-item-section side>
              <q-icon name="fas fa-external-link-alt" />
            </q-item-section>
          </q-item>

        </q-list>

        <q-card-section class="bg-primary text-white text-bold">
          Authors & Contributers
        </q-card-section>

        <!-- Credits -->
        <q-list bordered>

          <!-- Justin -->
          <q-item clickable v-ripple @click.native="open('https://github.com/jdunsworth/')">
            <q-item-section avatar>
              <q-avatar>
                <img src="~/assets/profile/JustinDunsworth.jpg">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Justin Dunsworth</q-item-label>
              <q-item-label caption lines="1" class="text-italic">
                justin.dunsworth@gmail.com
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="fab fa-github" />
            </q-item-section>
          </q-item>

          <!-- Chad -->
          <q-item clickable v-ripple @click.native="open('https://github.com/cjpitch23/')">
            <q-item-section avatar>
              <q-avatar>
                <img src="~/assets/profile/ChadPitchford.jpg">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Chad Pitchford</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="fab fa-github" />
            </q-item-section>
          </q-item>

        </q-list>
        <!-- END: Credits -->

      </q-card>
      <!-- END: Right Card -->

    </div>
  </q-page>
</template>

<script>
import { openURL } from 'quasar';
import { shell } from 'electron';

export default {
  name: 'ParleyAbout',
  methods: {
    open(url) {
      openURL(url);
    },
    openConfiguration() {
      shell.openPath(this.$store.state.config.location);
    },
  },
};
</script>
