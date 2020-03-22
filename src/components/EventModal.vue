<template>
    <div>
        <div id="eventModal" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <b-card no-body align="right" class="event-card">
                            <b-card-body>
                                <h4 class="card-title">{{ event.data.from }}</h4>
                                <h6 class="card-subtitle text-muted">{{ time }}</h6>
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
                            </b-card-body>
                        </b-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
    import $ from 'jquery';
    
    import store from '../store';

    export default {
        name: "EventModal",
        data() {
            return {
                event: null,
                time: "",
            };
        },
        mounted() {
            this.event = store.getters.getEventTemplet;
        },
        methods: {
            show(event) {
                this.event = event;

                let hours = this.event.data.date.getHours();
                if (hours < 10) {
                    hours = "0" + hours;
                }
                
                let minutes = this.event.data.date.getMinutes();
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }

                this.time = `${hours}:${minutes}`;

                $("#eventModal").modal('show');
            },
        }
    }
</script>

<style lang="scss" scoped>
    .event-card {
        border: hidden;
    }
</style>