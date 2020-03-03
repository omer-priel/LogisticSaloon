<template>
    <div id="Map">
         <HereMap
            appId="a3htDgHlMkQpyw0icN4q"
            appCode="???"
            :lat=37.7397
            :lng=-121.4252
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
    #Map {
        
    }
</style>