<template>
  <body id="App">
    <div class="container-fluid">
      <div class="row">
        <div class="col-4">
          <Cards class="max_height" />
        </div>
        <div class="col-5">
          <Map class="max_height" />
        </div>
        <div class="col-3">
          <Charts class="max_height" />
        </div>
      </div>
    </div>
  </body>
</template>

<script>

  require("./js/here/mapsjs-core.js");
  require("./js/here/mapsjs-data.js");
  require("./js/here/mapsjs-service.js");
  require("./js/here/mapsjs-ui.js");
  require("./js/here/mapsjs-mapevents.js");

  document.body.dir="rtl";

  import Cards from "./components/Cards.vue";
  import Map from "./components/Map.vue";
  import Charts from "./components/Charts.vue";

  export default {
    name: 'App',

    components: {
      Cards,
      Map,
      Charts
    },

    head: {
      title: {
        inner: "Logistic Saloon"
      },
    }
  }
</script>

<style lang="scss">
  #App {
    .row > div {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
</style>
