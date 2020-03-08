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
    import PieChart from "../assets/js/PieChart.js";

    export default {
        components: {
            PieChart
        },
        data() {
            return {
                datacollection: null
            };
        },
        mounted() {
            this.fillData();
        },
        methods: {
            fillData() {
                this.datacollection = {
                    labels: ["נפגעים", "חוסר במים", "חוסר בתחמושת", "חתולים", "אובדנים"],
                    datasets: [
                        {
                            label: "גרף מידע",
                            backgroundColor: [
                                "rgba(38, 196, 133, 1)",
                                "rgba(153, 205, 254, 1)",
                                "rgba(233, 227, 155, 1)",
                                "rgba(253, 154, 130, 1)",
                                "rgba(119, 150, 203, 1)"
                            ],
                            data: [
                                this.getRandomInt(),
                                this.getRandomInt(),
                                this.getRandomInt(),
                                this.getRandomInt(),
                                this.getRandomInt()
                            ]
                        }
                    ]
                };
            },
            getRandomInt() {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
            }
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