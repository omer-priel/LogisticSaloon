<template>
    <div class="here-map">
        <div ref="map" class="max_height"></div>
    </div>
</template>

<script>

    import { mapActions } from "vuex";

    import store from "../store";
    import config from "../js/config";

    export default {
        name: "Map",
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
                zoom: 7.7,
                center: { lat: 31.55, lng: 35.2 }
            };

            this.map = new H.Map(this.$refs.map, defaultLayers.normal.map, mapOptions);

            let behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

            let ui = H.ui.UI.createDefault(this.map, defaultLayers, "en-US");

            //Cuastum UI Controls

            //Map Settings
            ui.removeControl("mapsettings");

            //Zoom
            let zoom = ui.getControl("zoom");
            zoom.setAlignment("left-middle");

            //Scalebar
            ui.removeControl("scalebar");
        },
        
        methods: {
            ...mapActions([
                "openEvent"
            ]),

            load() {
                let events = store.getters.getEvents;
                for (let event of events.values()) {
                    this.addEvent(event);
                }
            },

            addEvent(event) {                
                let location = {
                    lat: event.data.location.lat,
                    lng: event.data.location.lng + 0.06
                };

                let normalIconUrl = require('../assets/img/bubble-' + event.typeId + '.png');
                let normalIcon = new H.map.Icon(normalIconUrl);
                let selectedIconUrl = require('../assets/img/bubble-' + event.typeId + '-selected.png');
                let selectedIcon = new H.map.Icon(selectedIconUrl);

                let markerOptions = {
                    icon: normalIcon,
                    data: event.id
                };
    
                let marker = new H.map.Marker(location, markerOptions);

                marker.addEventListener('tap', function(e) {
                    let eventId = e.target.getData();
                    this.openEvent(eventId);
                }.bind(this));

                event.map = {
                    marker: marker,
                    normalIcon: normalIcon,
                    selectedIcon: selectedIcon,
                    changeIcon(selected) {
                        if (selected) {
                            this.marker.setIcon(this.selectedIcon);
                        } else {
                            this.marker.setIcon(this.normalIcon);
                        }
                    },
                    setVisibility(visibility) {
                        this.marker.setVisibility(visibility);
                    }
                };
                
                this.map.addObject(marker);
            },

            changeCenter(zoomIn, location) {
                if (!zoomIn) {
                    this.map.setZoom(7.7);
                    this.map.setCenter({ lat: 31.55, lng: 35.2 });
                } else {
                    this.map.setZoom(9);
                    this.map.setCenter(location);
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
