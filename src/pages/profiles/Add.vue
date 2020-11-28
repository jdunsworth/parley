<template>
  <q-page padding>
    <!-- Add Profile Key -->
    <q-card dark bordered class="bg-grey-9 absolute absolute-center add-profile-card">
      <q-card-section>
        <div class="text-h6">
          <div class="row justify-between">
            <div class="col-8">Add Profile</div>
            <div class="col-1">
              <q-icon
                name="fas fa-question-circle"
                class="cursor-pointer"
                @click="help = !help"
              >
                <q-tooltip anchor="top middle" self="bottom middle" class="bg-info">
                  Click for help!
                </q-tooltip>
              </q-icon>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <!-- Help Section -->
      <q-card-section v-if="help">
        <p>In order to add a profile from Canvas, we need you to enter
        the api key assigned to your account here.</p>

        <p>You can find that api key by following these steps:</p>
        <ol class="text-weight-light">
          <li>Log into the Canvas account you want to add.</li>
          <li>Click on the <strong>Account</strong> tab in the top right.</li>
          <li>Click on <strong>Settings</strong>.</li>
          <li>
            Underneath <strong>Approved Integrations</strong>,
            click on the <strong>New Access Token</strong> button.
          </li>
          <li>Enter <strong>Parley</strong> as the <strong>Purpose</strong>.</li>
          <li>Leave <strong>Expires</strong> blank.</li>
          <li>Click <strong>Generate Token</strong>.</li>
          <li>Copy <strong>Token</strong> and paste it down below!</li>
        </ol>

        <p>
          <strong>Warning!</strong>
          <em>
            Once you leave that page on Canvas you won't be able to retrieve the
            full token anymore, you'll have to regenerate it to
            get a new value.
          </em>
        </p>
      </q-card-section>

      <!-- API Key Form -->
      <q-card-section>
        <q-input v-model="apiKey" label="Profile Key" filled />
      </q-card-section>

      <q-card-actions align="between">
        <q-btn label="About" color="info" to="/about" />
        <q-btn label="Add" color="positive" :disable="!apiKey" @click="addApiKey" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'ProfileAdd',
  data() {
    return {
      apiKey: null,
      help: false,
    };
  },
  methods: {
    addApiKey() {
      // TODO :: Store Api Key
      // TODO :: Redirect to profile overview
    },
  },
};
</script>

<style lang="stylus">
.add-profile-card
  width 500px
</style>
