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

            this.events.forEach(item => {
                this.addEvent(item.event);
            })
        },
        methods: {
            addEvent (event) {
                let marker = new H.map.Marker(event.location);
                this.map.addObject(marker);
            }
        }
    }
</script>

<style lang="scss">

</style>
