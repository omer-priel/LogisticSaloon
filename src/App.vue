<template>
  <body id="App">
    <div class="container-fluid">
      <b-row>
        <b-col>
          <Cards class="max_height" />
        </b-col>
        <b-col>
          <Map class="max_height" />
        </b-col>
        <b-col>
          <Charts class="max_height" />
        </b-col>
      </b-row>
    </div>
  </body>
</template>

<script>

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
