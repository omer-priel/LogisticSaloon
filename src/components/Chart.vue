<template>
    <div>
        <h5 v-if="chart.title" class="text-center"> {{ chart.title }} </h5>
        <PieChart ref="pie" class="pie" :height="height" :chart-data="chart.datacollection" />
    </div>
</template>

<script>

    import PieChart from "./PieChart";

    export default {
        name: "Chart",
        components: {
            PieChart
        },
        props: [
            "chart",
            "height",
        ],
        mounted() {
            this.$refs.pie.render();
        },
    }
</script>

<style lang="scss" scoped>
    h5 {
        margin-top: 8;
        margin-bottom: 0;
    }
    .pie {
        margin-bottom: 1px;
    }
</style>