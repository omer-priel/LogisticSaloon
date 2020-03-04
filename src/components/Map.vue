<template>
    <div id="Map">
        <HereMapMarker 
          appId="FymdsOx1OInDIkWIBErG"
          appCode="i_LyBjYPh3K-ymfzPrpBPw"
          :lng="37.7397" 
          :lat="-121.4252"
          :zoom="14"
          />
    </div>
</template>

<script>
    import HereMapMarker from "./HereMapMarker.vue"

    export default {
        name: 'Map',

        components: {
            HereMapMarker
        },

        data() {
            return {
                
            };
        },
    }
</script>

<style lang="scss">

</style>