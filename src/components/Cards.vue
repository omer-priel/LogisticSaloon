<template>
    <div>
        <b-card no-body v-for="(group, groupIndex) in groups" :key="group">
            <b-card-header class="p-1">
                <b-button block variant="primary" v-b-toggle="'group-' + groupIndex" >{{ group.title }}</b-button>
            </b-card-header>
            <b-collapse :id="'group-' + groupIndex" accordion="main">
                <b-card-body>
                    <b-card no-body v-for="(event, eventIndex) in group.events" :key="event">
                        <b-card-header class="p-1">
                            <b-button block v-b-toggle="'event-' + eventIndex" >{{ eventIndex }}</b-button>
                        </b-card-header>
                        <b-collapse :id="'event-' + eventIndex" :accordion="'group-' + groupIndex">
                            <b-card-body>
                                <EventCard :event="event" />
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    import EventCard from "./EventCard";

    export default {
        name: 'Cards',
        components: {
            EventCard
        },
        data() {
            return {
                groupsTitles: [],
                groups: []
            };
        },
        methods: {
            addEvent(event) {
                let i = this.groupsTitles.indexOf(event.data.event_type);
                if (i == -1) {
                    this.groupsTitles.push(event.data.event_type);
                    let group = {
                        title: event.data.event_type,
                        events: [],
                    };
                    i = this.groups.push(group) - 1;
                }
                this.groups[i].events.push(event);
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>