<template>
    <div>
        <b-card no-body v-for="(group, groupIndex) in groups.values()" :key="group.title">
            <b-card-header class="p-1">
                <b-button block :variant="'group-' + groupIndex" v-b-toggle="'group-' + groupIndex">{{ group.title }}</b-button>
            </b-card-header>
            <b-collapse accordion="groups" :id="'group-' + groupIndex">
                <b-card-body>
                    <b-card no-body v-for="event in group.events.values()" :key="event.id">
                        <b-card-header class="p-1">
                            <b-button variant="event-card" block class="text-right" @click="openEvent(event.id)" >{{ sliceContent(event.data.content) }}</b-button>
                        </b-card-header>
                    </b-card>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import { mapActions } from "vuex";

    import store from "../store";

    export default {
        name: 'Cards',
        
        components: {

        },

        data() {
            return {
                groups: [],
                tagIdCount: -1,
            };
        },

        mounted() {
            this.load();
        },

        methods: {
            ...mapActions([
                "openEvent"
            ]),

            load() {
                this.groups = store.getters.getGroups;
            },

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
    .btn.btn-event-card {
        background: linear-gradient(to left, #b90000, #b9000063);
    }
</style>