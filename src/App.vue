<template>
<body id="App">
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
    				<b-dropdown-item href="#">רפואה</b-dropdown-item>
    				<b-dropdown-item href="#">הספקה</b-dropdown-item>
    				<b-dropdown-item href="#">אחזקה</b-dropdown-item>
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
	<main>
		<div cols="4" class="slidbar" >
			<Cards ref="cards" v-if="mode" />
			<Charts v-else />
		</div>
		<Map ref="map" class="max_height" />
	</main>
	<footer>
		<EventModal ref="eventModal" />
	</footer>
</body>
</template>

<script>
	import { mapActions } from "vuex";

	import Map from "./components/Map.vue";
	import Cards from "./components/Cards.vue";
	import Charts from "./components/Charts.vue";
	import EventModal from "./components/EventModal.vue";

	export default {
		name: "App",
		components: {
			Map,
			Cards,
			Charts,
			EventModal,
		},

		head: {
			title: {
				inner: "Logistic Saloon"
			}
		},

		data() {
			return {
				mode: true,
				modeCards: true,
				modeCharts: false,
			};
		},

		mounted() {
			this.load(this.$refs.eventModal.show);
			this.$refs.map.load();
			this.$refs.cards.load();
		},

		watch: {
			modeCards: function (val) {
				this.mode = val;
				this.modeCharts = !val;
			},
			modeCharts: function (val) {
				this.modeCards = !val;
    		},
		},

		methods: {
			...mapActions([
				"load"
				]),
			changeMode() {
				this.mode = !this.mode;
			}
		}
	};
</script>

<style lang="scss">
	.slidbar {
		height: 100%;
    	width: 30%;
    	position: fixed;
    	z-index: 1;
    	left: 70%;
    	padding-top: 60px;
	}
</style>
