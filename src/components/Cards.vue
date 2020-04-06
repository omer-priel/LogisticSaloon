<template>
    <div>
        <b-card no-body v-for="(group, groupIndex) in groups.values()" :key="group.title">
            <b-card-header class="p-1">
                <b-button block :variant="'group-' + group.id" v-b-toggle="'group-' + groupIndex">{{ group.title }}</b-button>
            </b-card-header>
            <b-collapse accordion="groups" :id="'group-' + groupIndex">
                <b-card-body class="scroll">
                    <EventCard v-for="event in group.events.values()" :key="event.id" :eventIn.sync="event" />
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    
    import { mapActions } from "vuex";

    import store from "../store";

    import EventCard from './EventCard.vue';

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

            this.addGroupsChanged(function() {
                    this.groups = store.getters.getGroups;
                }.bind(this));
        },

        methods: {
			...mapActions([
				"addGroupsChanged"
                ]),

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
    
    @import '../assets/sass/_custom.scss';

    .scroll {
        overflow-y:scroll;
        position:relative;
        max-height:450px;
    }

    .card {
        background-color: #ffffff00;
        border: none;

        .card-header {
           border: none;
        }
    }
    .btn {
        border: none;

        @for $i from 0 through 4 {
            &.btn-group-#{$i} {
                $group-color: map-get($theme-colors, 'group-#{$i}');
                $group-color-to: rgba($group-color, 0.388);

                background: linear-gradient(to left, $group-color, $group-color-to);
            }
        }
    }
</style>