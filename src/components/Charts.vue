<template>
    <div>
        <b-navbar variant="faded" type="light">
            <h1>
                מידע גרפי
            </h1>
        </b-navbar>
        <div class="chart-box">
        <PieChart :chart-data="datacollection"/>
        <b-button
            style="margin: 10px"
            size="sm"
            variant="outline-primary"
            @click="fillData()">
            רענן
            </b-button>
        </div>
    </div>
</template>

<script>
    import store from "../store";
    
    import PieChart from "../assets/js/PieChart.js";

    export default {
        components: {
            PieChart
        },
        data() {
            return {
                datacollection: {
                    labels: [],
                    datasets: [],
                }
            };
        },
        mounted() {
            this.fillData();
        },
        methods: {
            fillData() {
                let datacollection = {
                    labels: [],
                    datasets: [
                        {
                            label: "גרף מידע",
                            backgroundColor: [],
                            data: [],
                        }
                    ]
                };
                
                let groups = store.getters.getGroups;
                let colors = store.getters.getColors;

                for (const group of groups) {                    
                    let color = colors[group.colorId];
                    let count = group.events.size;

                    datacollection.labels.push(group.title);
                    datacollection.datasets[0].backgroundColor.push(color);
                    datacollection.datasets[0].data.push(count);
                }

                this.datacollection = datacollection;
            },
        }
    };
</script>

<style lang="scss" scoped>
    @mixin border-radius($radius) {
        -webkit-border-radius: $radius;
        -moz-border-radius: $radius;
        -ms-border-radius: $radius;
        border-radius: $radius;
    }

    @mixin shadow() {
        -webkit-box-shadow: 10px 9px 65px -14px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 10px 9px 65px -14px rgba(0, 0, 0, 0.75);
        box-shadow: 10px 9px 65px -14px rgba(0, 0, 0, 0.75);
    }
    #Charts {
        background-color: azure;
    }
    .chart-box {
        @include border-radius(10px);
        @include shadow();
        max-width: 300px;
        margin: 1cm auto;
    }
</style>