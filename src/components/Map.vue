<template>
    <div id="Map">
        <HereMap 
          appId="FymdsOx1OInDIkWIBErG"
          appCode="i_LyBjYPh3K-ymfzPrpBPw"
          :lng="37.7397" 
          :lat="-121.4252"
          :zoom="14"
          />
    </div>
</template>

<script>
    import HereMap from "./HereMap.vue"

    export default {
        name: 'Map',

        components: {
            HereMap
        },

        data() {
            return {
                
            };
        },
    }
</script>

<style lang="scss">

</style>