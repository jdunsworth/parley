<template>
  <div class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 20vh">
        Oops!
      </div>
      <div class="text-h2" style="opacity:.4">
        We couldn't find that resource.
      </div>
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="primary"
        unelevated
        to="/"
        label="Go Back to Parley Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
};
</script>
