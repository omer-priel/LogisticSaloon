<template>
    <b-navbar fixed="top">
    	<b-collapse is-nav>
			<b-navbar-nav></b-navbar-nav>

			<b-navbar-nav class="ml-auto">
				<b-dropdown variant="primary" class="mr-5" text="לפיקוד" split right>
    				<b-dropdown-item href="#">פצ"ן</b-dropdown-item>
    				<b-dropdown-item href="#">פקמ"ז</b-dropdown-item>
    				<b-dropdown-item href="#">פד"ם</b-dropdown-item>
    			</b-dropdown>
				
				<b-dropdown variant="primary" class="mr-5" text="למערך" split right>
    				<b-dropdown-item v-for="type in types.values()" :key="type" class="text-right">{{ type }}</b-dropdown-item>
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

        props: {
            mode: {
                type: String
            },
        },

        data() {
            return {
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
            load() {
                this.types = store.getters.getEventTypes;
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