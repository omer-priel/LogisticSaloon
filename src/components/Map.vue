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

                events: [
                    {
                        event: {
                            id: 0,
                            link: "https://www.hamal.co.il/post/-Le3Soja2sYlS7gZ17nz",
                            content: "מטח רקטות שוגר לעבר באר שבע",
                            event_type: "הסלמה בדרום",
                            location: {
                                lat: 31.313430926637704,
                                lng: 34.5967077351318
                            }
                        }
                    },
                    {
                        event: {
                            id: 1,
                            link: "https://www.hamal.co.il/post/-Laqlj7WosEV8BKPV3NY",
                            content: "הפסקות חשמל במספר יישובים המועצה האזורית שער הנגב",
                            event_type: "הסלמה בדרום",
                            location: {
                                lat: 31.525942837952083,
                                lng: 34.59669981017577
                            }
                        }
                    },
                    {
                        event: {
                            id: 2,
                            link: "https://www.hamal.co.il/post/-LgOmzUeECDM3rxL3kwf",
                            content: "דיווח ראשוני על שיגור כושל מצפון רצועת עזה לעבר שטח ישראל. לפי הדיווח, הרקטה נחתה בים",
                            event_type: "רצועת עזה",
                            location: {
                                lat: 32.05020128541517,
                                lng: 34.75984151911165
                            }
                        }
                    }
                ]
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

            this.events.forEach(item => {
                let event = {
                    id: item.event.id,
                    data: item.event,
                    map: {
                        onClick() {
                            console.log(this);
                        }
                    }
                }
                this.addEvent(event);
            });
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
