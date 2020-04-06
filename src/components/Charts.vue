<template>
    <div>
        <b-jumbotron class="chart-box" bg-variant="light">            
            <Chart v-for="chart in charts" :key="chart.key" :height="(charts.length == 1) ? 400 : 170" :chart="chart"/>
        </b-jumbotron>
    </div>
</template>

<script>

    import { mapActions } from "vuex";
    
    import store from "../store";
    
    import Chart from "./Chart";

    export default {
        components: {
            Chart
        },
        data() {
            return {
                charts: [ ],
                key: 0,
            };
        },
        mounted() {
            this.addGroupsChanged(this.groupsChanged.bind(this));
        },
        methods: {
            ...mapActions([
				"addGroupsChanged"
            ]),

            groupsChanged(sortBy, filterTitle) {
                let charts = [];

                if (sortBy == "types" || filterTitle) {
                    if (sortBy == "types") {
                        filterTitle = null;
                    }
                    let datacollection = {
                        labels: [],
                        datasets: [
                            {
                                label: "גרף",
                                backgroundColor: [],
                                data: [],
                            }
                        ]
                    };
                    
                    let groups = store.getters.getGroupsByTypes.values();
                    let colors = store.getters.getColors;

                    for (const group of groups) {                    
                        let color = colors[group.id];
                                                
                        let count = 0;

                        if (sortBy == "types") {
                            count = group.events.size;
                        } else {
                            group.events.forEach(function(event) {
                                if (event.visibility) {
                                    count++;
                                }
                            });
                        }

                        datacollection.labels.push(group.title);
                        datacollection.datasets[0].backgroundColor.push(color);
                        datacollection.datasets[0].data.push(count);
                    }

                    charts.push({
                        title: filterTitle,
                        key: this.key + "-" + charts.length,
                        datacollection: datacollection
                    });
                } else {
                    let territorials = store.getters.getGroupsByTerritorials.values();
                    let colors = store.getters.getColors;
                    let eventTypes = store.getters.getEventTypes;

                    for (const territorial of territorials) {         
                        let datacollection = {
                            labels: [],
                            datasets: [
                                {
                                    label: "גרף",
                                    backgroundColor: [],
                                    data: [],
                                }
                            ]
                        };
                        
                        eventTypes.forEach(function(eventType, index) {
                            let color = colors[index];
                            datacollection.labels.push(eventType);
                            datacollection.datasets[0].backgroundColor.push(color);
                            datacollection.datasets[0].data.push(0);
                        });

                        territorial.events.forEach(function(event) {
                            if (event.visibility) {
                                datacollection.datasets[0].data[event.eventType.id]++;
                            }
                        });

                        charts.push({
                            title: territorial.title,
                            key: this.key + "-" + charts.length,
                            datacollection: datacollection
                        });
                    }
                }

                this.key++;

                this.charts = charts;
            },
        }
    };
</script>

<style lang="scss" scoped>
    .chart-box {
        min-height: 500px;
        max-width: 80%;
        padding: 16px;
        margin-left: 60px;
    }
</style>