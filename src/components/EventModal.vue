<template>
    <div>
        <div id="eventModal" class="modal fade" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <b-card no-body align="right" class="event-card">
                            <b-card-body>
                                <h4 class="card-title">{{ from }}</h4>
                                <h6 class="card-subtitle text-muted">{{ time }}</h6>
                                <b-card-text>
                                    {{ content }}
                                </b-card-text>
                                <b-row block align="center">
                                    <b-col>
                                        <a class="card-link" target="_blank" :href="link">קישור למקור</a>
                                    </b-col>
                                    <b-col>
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

                from: "",
                time: "",
                content: "",
                link: "",
            };
        },
        mounted() {
            this.event = store.getters.getEventTemplet;
        },
        methods: {

            show(event) {
                this.event = event;

                this.from = event.data.from;

                let hours = this.event.data.date.getHours();
                if (hours < 10) {
                    hours = "0" + hours;
                }
                
                let minutes = this.event.data.date.getMinutes();
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }

                this.time = `${hours}:${minutes}`;

                this.content = event.data.content;
                this.link = event.data.link;
                

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