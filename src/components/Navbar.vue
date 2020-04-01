<template>
    <b-navbar fixed="top">
    	<b-collapse is-nav>
			<b-navbar-nav></b-navbar-nav>

			<b-navbar-nav class="ml-auto">
				<b-dropdown variant="primary" @click="eventSortByTerritorials()" class="mr-5" text="לפי פיקוד" split right>
                    <b-dropdown-item-button v-for="territorial in territorials.values()" :key="territorial.title" @click="eventFilterTerritorial(territorial.title)" class="text-right">{{ territorial.title }}</b-dropdown-item-button>
    			</b-dropdown>
				
				<b-dropdown variant="primary" @click="eventSortByEventTypes()" class="mr-5" text="לפי מערך" split right>
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
                territorials: [],
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
                this.territorials = store.getters.getTerritorials;
            },

            eventSortByTerritorials() {
                this.sortByTerritorials();
            },

            eventFilterTerritorial(title) {
                this.filterByTerritorial(title);
            },
            
            eventSortByEventTypes() {
                this.sortByTypes();
            },

            eventFilterEventType(eventType) {
                this.filterByType(eventType);
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