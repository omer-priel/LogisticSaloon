<template>
    <body id="App">
        <b-container fluid>
            <b-row>
                <b-col>
                    <Cards ref="cards" class="max_height"/>
                </b-col>
                <b-col cols="5">
                    <Map ref="map" class="max_height" />
                </b-col>
                <b-col>
                    <Charts ref="charts" class="max_height"/>
                </b-col>
            </b-row>
        </b-container>
    </body>
</template>

<script>
    require("./js/here/mapsjs-core.js");
    require("./js/here/mapsjs-data.js");
    require("./js/here/mapsjs-service.js");
    require("./js/here/mapsjs-ui.js");
    require("./js/here/mapsjs-mapevents.js");

    document.body.dir = "rtl";

    import Cards from "./components/Cards.vue";
    import Map from "./components/Map.vue";
    import Charts from "./components/Charts.vue";

    export default {
        name: "App",

        components: {
            Cards,
            Map,
            Charts
        },

        head: {
            title: {
                inner: "Logistic Saloon"
            }
        },

        data() {
            return {
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
                            content:
                              "דיווח ראשוני על שיגור כושל מצפון רצועת עזה לעבר שטח ישראל. לפי הדיווח, הרקטה נחתה בים",
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

        mounted() {
            // test
            this.events.forEach(eventData => {

                eventData.event.from = "גדוד 4321";
                eventData.event.date = new Date().getTime();

                this.addEvent(eventData);
            });
        },

        methods: {
            addEvent(eventData) {
            let data = eventData.event;
            
            data.date = new Date(data.date);

            let event = {
                id: data.id,
                data: data,
                map: {
                    onClick() {
                        console.log(this);
                    }
                }
            };

            this.$refs.map.addEvent(event);
            this.$refs.cards.addEvent(event);
          }
        }
    };
</script>

<style lang="scss">
    .row > div {
        padding-left: 0px;
        padding-right: 0px;
    }
</style>
