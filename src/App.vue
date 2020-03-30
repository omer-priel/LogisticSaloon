<template>
<body id="App">
	<main>
		<Navbar ref="navbar" v-model="mode" />
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
	import Navbar from './components/Navbar.vue';
	import Cards from "./components/Cards.vue";
	import Charts from "./components/Charts.vue";
	import EventModal from "./components/EventModal.vue";

	export default {
		name: "App",
		components: {
			Map,
			Navbar,
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
			};
		},

		mounted() {
			this.load(this.$refs.eventModal.show);
			this.$refs.navbar.load();
			this.$refs.map.load();
			this.$refs.cards.load();
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
