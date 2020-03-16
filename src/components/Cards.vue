<template>
    <div>
        <b-card no-body v-for="(group, groupIndex) in groups" :key="group">
            <b-card-header class="p-1">
                <b-button block variant="primary" :cast="group">{{ group.title }}</b-button>
            </b-card-header>
            <b-collapse accordion="groups">
                <b-card-body>
                    <b-card no-body v-for="event in group.events.values()" :key="event">
                        <b-card-header class="p-1">
                            <b-button block class="text-right" >{{ event }}</b-button>
                        </b-card-header>
                    </b-card>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import store from "../store";

    import EventCard from "./EventCard";

    export default {
        name: 'Cards',
        
        components: {
            EventCard
        },

        data() {
            return {
                groups: [],
                tagIdCount: -1,
            };
        },

        mounted() {
            this.groups = store.getters.getGroups;
        },

        methods: {
            sliceContent(content) {
                content = content.slice(0, 50);
                let end = content.lastIndexOf(" ");
                return content.slice(0, end);
            },

            addTagId() {
                this.tagIdCount++;
                let tagId = "id_" + this.tagIdCount;
                return tagId;
            },
            lastTagId() {
                return "id_" + this.tagIdCount;
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>