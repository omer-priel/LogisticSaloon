<template>
  <div class="here-map">
    <div ref="map" style="width: 100%; height: 100vh;"></div>
  </div>
</template>

<script>
export default {
  name: "HereMap",
  data() {
    return {
      
    };
  },
  props: {
    appId: String,
    appCode: String,
    lat: Number,
    lng: Number
  }
};
</script>

<style lang="scss">
  
</style>