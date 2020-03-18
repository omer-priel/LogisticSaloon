<template>
    <div>
        <b-jumbotron class="chart-box" bg-variant="light">
            <PieChart :chart-data="datacollection"/>
        </b-jumbotron>
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
                
                let groupsByTypes = store.getters.getGroupsByTypes.values();
                let colors = store.getters.getColors;

                for (const group of groupsByTypes) {                    
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
    .chart-box {
        max-width: 80%;
        padding: 16px;
        margin-left: 60px;
    }

    // old code
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
    .chart-box-OLD {
        @include border-radius(10px);
        @include shadow();
        max-width: 300px;
        margin: 1cm auto;
    }
</style>