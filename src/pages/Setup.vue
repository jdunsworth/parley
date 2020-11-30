<template>
  <q-page padding>

    <!-- Logo -->
    <div class="q-my-md text-center">
      <q-img
        src="~/assets/logos/parley_wide.png"
        spinner-color="primary"
        contain
        width="350px"
      />
    </div>
    <!-- END: Logo -->

    <div class="q-pa-md row justify-center">

      <!-- Setup Wizard Stepper -->
      <q-stepper
        v-model="step"
        vertical
        color="primary"
        animated
        class="col-8"
      >
        <!-- Step 1 :: Welcome -->
        <q-step
          :name="1"
          title="Welcome to Parley"
          icon="fas fa-map"
        >
          <p>
            Parley is an alternative interface for the <a href="https://www.instructure.com/canvas/" target="_blank">Canvas Learning Platform</a>
            that makes it easier for parents, students, and teachers to access and manage their virtual classroom.
          </p>
          <p>
            We will need a few things from your schools Canvas website to proceed with setup so go ahead and fire up your
            favorite browser (<em>Chrome, right?</em>) and head to the Canvas login screen.
          </p>
          <p>
            Oh, by the way... this tool follows the <a href="https://canvas.instructure.com/login/canvas" target="_blank">Canvas Acceptable Use Policy</a>
            and by using it, you are also agreeing to follow it just as you would be when using the Canvas website.
          </p>

          <!-- Stepper Navigation -->
          <q-stepper-navigation>
            <q-btn @click="step = 2" color="primary" label="I agree!" :loading="loading" />
          </q-stepper-navigation>

        </q-step>
        <!-- END: Step 1 :: Welcome -->


        <!-- Step 2 :: Organization -->
        <q-step
          :name="2"
          title="Enter your Organization"
          icon="fas fa-building"
        >
          <p>
            Are you on the Canvas log in screen for your school? Great! I will now need to know the Canvas
            <strong>organization</strong> which you can find in the website address in the bar near the top of your browser
            window. Enter just the organization name below.
          </p>

          <!-- Organization Input -->
          <q-input
            type="text"
            v-model="organization"
            filled
            input-class="text-center text-h5"
            :rules="[ val => val.length >= 3 || 'Please use a minimum of 3 characters']"
          >
            <template v-slot:before>https://</template>
            <template v-slot:after>.instructure.com</template>
          </q-input>

          <!-- Stepper Navigation -->
          <q-stepper-navigation>
            <q-btn @click="step = 3" color="primary" label="Continue" :loading="loading" />
          </q-stepper-navigation>
        </q-step>
        <!-- END: Step 2 :: Organization -->


        <!-- Step 3 :: Access Token -->
        <q-step
          :name="3"
          title="Generate your Access Token"
          icon="fas fa-key"
        >
          <!-- Access Token Instructions -->
          <p>
            Next we need to authorize Parley to access the information within your Canvas account. Go ahead and
            <a :href="[`https://${organization}.instructure.com/login/canvas`]" target="_blank">log in</a> to the account
            that you want to access.
          </p>
          <p class="text-caption text-italic">
            Note: If you are a parent, we recommend that you add your childs account instead of your Observer account due
            to restrictions of Observer accounts. Have more than one child? You can add more accounts before we finish.
          </p>
          <p>
            Once logged in, you will need to go to the <a :href="[`https://${organization}.instructure.com/profile/settings`]" target="_blank">settings page</a>.
            To get there follow the link above or clicking on their profile picture and choosing 'Settings' from the options.
          </p>
          <p>
            Next we need to create an <strong>Access Token</strong> to authorize Parley to access your account.
            <ol>
              <li>In your settings page, scroll down to the "Approved Integrations" section.</li>
              <li>Click the yellow <q-badge color="orange" label="New Access Token" /> button.</li>
              <li>In the "Purpose" field enter a reason. <em>(e.g. Parley, Parley on Justins Computer)</em></li>
              <li>
                <em>(Optional)</em> Set an expiration date that you want the access token to expire like at the end of the
                school year. Leave blank if you don't want the access token to expire.
              </li>
              <li>Click the yellow <q-badge color="orange" label="Generate Token" /> button.</li>
              <li>Select the full token in the Token field and copy it (<em>right click and "Copy"</em>).</li>
              <li>Paste the token in the Access Token field below.</li>
            </ol>
            <q-btn
              flat
              color="primary"
              label="Learn how Parley uses your Access Token"
              @click="tokenDialog = true"
              size="sm"
              icon="fas fa-info-circle"
            />
          </p>

          <!-- Access Token Input -->
          <q-input
            type="text"
            v-model="accessToken"
            filled
            label="Access Token"
            error-message="Invalid Access Token. Please try again."
            :error="$v.accessToken.$error"
            @blur="$v.accessToken.$touch()"
          >
            <template v-slot:append>
              <q-btn flat @click="pasteAccessToken()" icon="fas fa-paste">
                <q-tooltip>Paste Access token</q-tooltip>
              </q-btn>
            </template>
          </q-input>

          <!-- Stepper Navigation -->
          <q-stepper-navigation>
            <q-btn @click="verifyAccessToken()" color="primary" label="Verify & Add Profile" :loading="loading" />
            <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" :loading="loading" />
          </q-stepper-navigation>
        </q-step>
        <!-- END: Step 3 :: Key -->


        <!-- Step 4 :: Done! -->
        <q-step
          :name="4"
          title="Finish Up"
          icon="fas fa-check"
        >
          <p>Awesome! It looks like everything worked just fine. Here's what we found:</p>

          <!-- User Profile Card -->
          <div v-if="profile" class="text-center" style="width: 300px;">
            <q-card class="bg-grey-9">
              <q-card-section class="bg-primary text-white text-h6">
                <div class="text-h6">{{ profile.name }}</div>
                <div class="text-subtitle2">User since {{ $date.fCommonDateO(profile.created_at) }}</div>
              </q-card-section>
              <q-card-section>
                <q-avatar rounded size="250px">
                  <img :src="profile.avatar_url || 'https://canvas.instructure.com/images/messages/avatar-50.png'">
                </q-avatar>
              </q-card-section>
            </q-card>
          </div>

          <!-- Stepper Navigation -->
          <q-stepper-navigation class="q-gutter-sm">
            <q-btn
              @click="saveSettingsAndProfile(false)"
              color="positive"
              label="Finish & Go Home"
              :loading="loading"
            />
            <q-btn
              @click="saveSettingsAndProfile(true)"
              color="primary"
              label="Finish & Add Another"
              :loading="loading"
            />
          </q-stepper-navigation>

        </q-step>
        <!-- END: Step 4 :: Done! -->

      </q-stepper>
      <!-- END: Setup Wizard -->


      <!-- Token Info Dialog -->
      <q-dialog v-model="tokenDialog">
        <q-card>
          <q-card-section>
            <div class="text-h6">Access Tokens & Parley</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Test
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK, cool!" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- END: Token Info Dialog -->


    </div>
  </q-page>
</template>

<script>
// Imports
import { required, helpers } from 'vuelidate/lib/validators';
import { clipboard } from 'electron';

const accesstoken = helpers.regex('accesstoken', /^[0-9]{1,10}~[0-9A-Za-z]{64}/g);

export default {
  name: 'ParleySetup',
  data() {
    return {
      step: 1,
      organization: 'dale',
      tokenDialog: false,
      accessToken: '',
      loading: false,
      profile: null,
    };
  },

  validations: {
    accessToken: { required, accesstoken },

  },

  methods: {


    /**
     * Paste Access Token from Clipboard
     * ---------------------------------------------------------
     */
    pasteAccessToken() {
      // Read contents of clipboard
      const clipboardContents = clipboard.readText().trim();
      if (!clipboardContents) {
        this.$q.notify({
          icon: 'fas fa-exclamation-triangle',
          type: 'negative',
          message: 'Paste Failed: We couldn\'t find anything on the clipboard!',
        });
        return;
      }

      // Verify clipboard contents is a valid access token
      if (clipboardContents.match(this.$parley.accessTokenRegex)) {
        this.accessToken = clipboardContents;
      } else {
        this.$q.notify({
          icon: 'fas fa-exclamation-triangle',
          type: 'negative',
          message: 'Paste Failed: Clipboard contents does not look like an access token!',
        });
      }
    }, // END: pasteAccessToken()


    /**
     * Verify Canvas Access Token
     * ---------------------------------------------------------
     */
    verifyAccessToken() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.loading = true;

        this.$axios.get(`https://${this.organization}.instructure.com/api/v1/users/self/profile`, {
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        })
          .then((res) => {
            this.loading = false;
            this.profile = res.data;
            this.step = 4;
          })
          .catch((err) => {
            this.loading = false;
            if (err.response.status === 401) {
              this.$q.notify({
                icon: 'fas fa-exclamation-triangle',
                type: 'negative',
                message: 'Supplied access token is invalid. You may have to invalidate and create a new one and try again.',
              });
            } else {
              this.$q.notify({
                icon: 'fas fa-exclamation-triangle',
                type: 'negative',
                message: err.message,
              });
            }
          });
      }
    }, // END: verifyAccessToken()


    saveSettingsAndProfile(addAnother = false) {
      // Save Organization to state
      this.$store.commit('saveSettings', { organization: this.organization });

      // Add Profile to state
      this.$store.commit('addProfile', {
        id: this.profile.id,
        token: this.accessToken,
        login: this.profile.login_id,
        name: this.profile.name,
        email: this.profile.primary_email,
        avatar: this.profile.avatar_url,
        lti: this.profile.lti_user_id,
      });

      if (addAnother) {
        this.$router.push('/profiles/add');
      } else {
        this.$router.push('/');
      }
    }, // END: saveSettingsAndProfile()


  },
};
</script>
