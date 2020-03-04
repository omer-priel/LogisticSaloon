<template>
  <div class="here-map max_height">
    <div ref="map" class="max_height"></div>
  </div>
</template>

<script>
import config from "../js/config";

export default {
  name: 'HereMap',
  props: {

  },
  data() {
    return {
      map: {},
      platform: {}
    };
  },
  created() {
    this.platform = new H.service.Platform({
      app_id: config.HERE_MAP_APP_ID,
      app_code: config.HERE_MAP_APP_CODE
    });
  },
  mounted() {
    const defaultLayers = this.platform.createDefaultLayers();
    const mapOptions = {
      zoom: 8,
      center: { lat: 31.2, lng: 34.8 }
    };

    this.map = new H.Map(this.$refs.map, defaultLayers.normal.map, mapOptions);

    for (let i = 0; i < 5; i++) {
      let lat = Math.floor(Math.random() * 10) / 10;
      let lng = Math.floor(Math.random() * 10) / 10;
      console.log(lat);
      let marker = new H.map.Marker({ lat: 31.2 + lat, lng: 34.8 + lng });
      this.map.addObjects([marker]);     
    }
  }
};
</script>

<style></style>
