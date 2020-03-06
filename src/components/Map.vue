<template>
    <div class="here-map">
        <div ref="map" class="max_height"></div>
    </div>
</template>

<script>
    import config from "../js/config";

    export default {
        name: 'Map',
        props: {

        },
        data() {
            return {
                map: {},
                platform: {},
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

            let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

            let ui = H.ui.UI.createDefault(this.map, defaultLayers, 'en-US');

            ui.removeControl('mapsettings');
        },
        methods: {
            addEvent (event) {
                let location = {
                    lat: event.data.location.lat,
                    lng: event.data.location.lng + 0.06
                };

                let iconUrl = require('../assets/img/speech-bubble.png');

                let markerOptions = {
                    icon: new H.map.Icon(iconUrl),
                    data: event
                };
    
                let marker = new H.map.Marker(location, markerOptions);

                marker.addEventListener('tap', function(e) {
                    let event = e.target.getData();
                    event.map.onClick.call(event);
                });
                
                this.map.addObject(marker);
            }
        }
    }
</script>

<style lang="scss">

</style>
