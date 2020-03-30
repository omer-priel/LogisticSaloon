<template>
    <b-navbar fixed="top">
    	<b-collapse is-nav>
			<b-navbar-nav></b-navbar-nav>

			<b-navbar-nav class="ml-auto">
				<b-dropdown variant="primary" @click="eventSortByTerritorials()" class="mr-5" text="לפיקוד" split right>
    				<b-dropdown-item-button @click="eventFilterTerritorial(0)">פצ"ן</b-dropdown-item-button>
    				<b-dropdown-item-button @click="eventFilterTerritorial(1)">פקמ"ז</b-dropdown-item-button>
    				<b-dropdown-item-button @click="eventFilterTerritorial(2)">פד"ם</b-dropdown-item-button>
    			</b-dropdown>
				
				<b-dropdown variant="primary" @click="eventSortByEventTypes()" class="mr-5" text="למערך" split right>
    				<b-dropdown-item-button v-for="type in types.values()" :key="type" @click="eventFilterEventType(type)" class="text-right">{{ type }}</b-dropdown-item-button>
    			</b-dropdown>

				<b-button-group class="mr-5">
					<b-button variant="primary" :pressed.sync="modeCards">לתצוגה המידעית</b-button>
					<b-button variant="primary" :pressed.sync="modeCharts">לתצוגה הסטטיסטית</b-button>
				</b-button-group>
    		</b-navbar-nav>

    		<b-navbar-nav class="ml-auto">
				<b-navbar-brand>סלון לוגיסטי</b-navbar-brand>
			</b-navbar-nav>
    	</b-collapse>
	</b-navbar>
</template>

<script>
    import { mapActions } from "vuex";

    import store from "../store";

    export default {
        name: 'Navbar',
        
        components: {

        },

        data() {
            return {
                mode: false,

				modeCards: true,
				modeCharts: false,
                
                types: new Map(),
            };
        },

        mounted() {
            this.load();
        },

        watch: {
			modeCards: function (val) {
                this.mode = val;
                
                this.$emit('input', val)
				this.modeCharts = !val;
			},
			modeCharts: function (val) {
				this.modeCards = !val;
    		},
		},

        methods: {
            ...mapActions([
                "sortByTypes",
                "filterByType",
                "sortByTerritorials",
                "filterByTerritorial",
                ]),

            load() {
                this.types = store.getters.getEventTypes;
            },

            eventSortByTerritorials() {
                console.log("eventSortByTerritorials");

                this.$emit("changeCenter", [false, null]);
            },

            eventFilterTerritorial(index) {

                let center = store.getters.getTerritorials[index].center;

                this.$emit("changeCenter", [true, center]);
            },
            
            eventSortByEventTypes() {
                console.log("eventSortByEventTypes");
            },

            eventFilterEventType(eventType) {
                console.log(eventType);
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
        background: linear-gradient(to left, #b90000, #b9000063);
    }
</style>