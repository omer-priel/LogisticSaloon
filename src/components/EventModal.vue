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
                showAfterHide: null,

                event: null,

                from: "",
                time: "",
                content: "",
                link: "",
            };
        },
        mounted() {

        },
        methods: {

            show(event) {                
                this.showAfterHide = this.showEvent.bind(this, event);
            },

            showEvent(event) {
                this.event = event;
                    
                this.from = this.event.data.from;

                let hours = this.event.data.date.getHours();
                if (hours < 10) {
                    hours = "0" + hours;
                }
                
                let minutes = this.event.data.date.getMinutes();
                if (minutes < 10) {
                    minutes = "0" + minutes;
                }

                this.time = `${hours}:${minutes}`;

                this.content = this.event.data.content;
                this.link = this.event.data.link;

                this.event.map.changeIcon(true);

                $("#eventModal").modal('show');
            },

            hide() {
                if (this.event) {
                    this.event.map.changeIcon(false);
                }
                if (this.showAfterHide) {
                    this.showAfterHide();
                    this.showAfterHide = null;
                } else {
                    $("#eventModal").modal('hide');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .event-card {
        border: hidden;
    }
</style>