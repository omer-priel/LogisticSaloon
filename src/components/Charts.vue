<template>
    <div>
        <b-jumbotron class="chart-box" bg-variant="light">            
            <div>
                <h5 class="text-center">title</h5>
                <PieChart class="pie" :height="height" :chart-data="datacollection" />
            </div>
        </b-jumbotron>
    </div>
</template>

<script>
    import store from "../store";
    
    import PieChart from "../js/PieChart/PieChart.js";

    export default {
        components: {
            PieChart
        },
        data() {
            return {
                datacollection: {
                    labels: [],
                    datasets: [],
                },
                height: 400, // 400 or 170 for 3 parts
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
                            borderAlign: "center",
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

    .pie {
        margin-bottom: 1px;
    }

    h5 {
        margin-top: 8;
        margin-bottom: 0;
    }
</style>