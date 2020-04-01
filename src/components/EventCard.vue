<template>
    <b-card no-body :class="(visibility) ? '' : 'd-none'">
        <b-card-header class="p-1">
            <b-button variant="event-card" block class="text-right" @click="openEvent(event.id)" >{{ sliceContent(event.data.content) }}</b-button>
        </b-card-header>
    </b-card>
</template>

<script>

    import { mapActions } from "vuex";

    import store from '../store';

    export default {
        name: "EventCard",
        props: [
            "event"
        ],
        data() {
            return {
                visibility: true,
            };
        },
        watch: {
            event: {
                visibility(val) {
                    this.visibility = val;
                }
            }
        },
        methods: {
            ...mapActions([
                "openEvent"
            ]),
            
            sliceContent(content) {
                content = content.slice(0, 50);
                let end = content.lastIndexOf(" ");
                return content.slice(0, end);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        background-color: #ffffff00;
        border: none;
        
        .card-header {
           border: none;
        }
    }

    .btn.btn-event-card {
        border: none;
        background: linear-gradient(to left, #b90000, #b8000063);
    }
</style>