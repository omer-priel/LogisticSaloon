<template>
    <b-card title="" sub-title="גדוד 0888" align="right">
        <b-card-text>
            {{ event.data.content }}
        </b-card-text>
        <b-row block align="center">
            <b-col>
                <a class="card-link" target="_blank" :href="event.data.link">קישור למקור</a>
            </b-col>
            <b-col>
                <b-button variant="link">מידע נוסף</b-button>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
    export default {
        name: "EventCard",
        props: {
            event: {}
        }
    }
</script>

<style lang="scss" scoped>

</style>