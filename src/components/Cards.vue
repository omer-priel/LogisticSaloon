<template>
    <div>
        <b-card no-body>
            <b-card-header class="p-1">
                <b-button block variant="primary" v-b-toggle.events-type-0 >תחמושת</b-button>
            </b-card-header>
            <b-collapse id="events-type-0" accordion="main">
                <b-card-body>
                    <b-card no-body>
                        <b-card-header class="p-1">
                            <b-button block v-b-toggle.event-0 >חוסר כדורים</b-button>
                        </b-card-header>
                        <b-collapse id="event-0" accordion="events-type-0">
                            <b-card-body>
                                <b-card title="צריך טקסט" sub-title="גדוד 0888" align="right">
                                    <b-card-text>
                                        חסר לנו כדורים לתחמושת
                                    </b-card-text>
                                    <b-row block align="center">
                                        <b-col>
                                            <a class="card-link" target="_blank" href="https://www.hamal.co.il/post/-Le3Soja2sYlS7gZ17nz">קישור למקור</a>
                                        </b-col>
                                    </b-row>
                                </b-card>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                    <b-card no-body>
                        <b-card-header class="p-1">
                            <b-button block v-b-toggle.event-1 >חוסר כדורים</b-button>
                        </b-card-header>
                        <b-collapse id="event-1" accordion="events-type-0">
                            <b-card-body>
                                <b-card-text>{{ text }}</b-card-text>
                            </b-card-body>
                        </b-collapse>
                    </b-card>
                </b-card-body>
            </b-collapse>
        </b-card> 
        <b-card no-body>
            <b-card-header class="p-1">
                <b-button block  variant="primary" v-b-toggle.events-type-1 >אוכל</b-button>
            </b-card-header>
            <b-collapse id="events-type-1" accordion="main">
                <b-card-body>
                    <b-card-text>{{ text }}</b-card-text>
                </b-card-body>
            </b-collapse>
        </b-card> 
        <b-card no-body>
            <b-card-header class="p-1">
                <b-button block  variant="primary" v-b-toggle.events-type-2 >רק"ם</b-button>
            </b-card-header>
            <b-collapse id="events-type-2" accordion="main">
                <b-card-body>
                    <b-card-text>{{ text }}</b-card-text>
                </b-card-body>
            </b-collapse>
        </b-card>
    </div>
</template>

<script>
    export default {
        name: 'Cards',
        data() {
            return {
                text: `
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
                    richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
                    brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
                    tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
                    assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
                    wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
                    vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
                    synth nesciunt you probably haven't heard of them accusamus labore VHS.
                    `
            };
        }
    }
</script>

<style lang="scss" scoped>
    
</style>