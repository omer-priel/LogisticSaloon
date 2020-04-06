<template>
<body @click="click">
	<main>
		<Navbar ref="navbar" v-model="mode"/>
		<div cols="4" class="slidbar" >
			<Cards ref="cards" style="max-height: 0px;" :class="(mode) ? '' : 'invisible'" />
			<Charts :class="(!mode) ? '' : 'invisible'" />
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
			this.load([this.$refs.eventModal.show, this.$refs.map.changeCenter]);
			this.$refs.navbar.load();
			this.$refs.map.load();

			let splits = document.querySelectorAll(".dropdown-toggle-split");
			for (let i = 0; i < splits.length; i++) {
				splits[i].addEventListener("click", this.click);
			}

			this.sortByTypes();
		},

		methods: {
			...mapActions([
				"load",
				"sortByTypes"
				]),
			
			changeMode() {
				this.mode = !this.mode;
			},

			//events
			click(e) {
				let modals = document.querySelectorAll(".modal");
				for (let i = 0; i < modals.length; i++) {
					if ( modals[i] == e.target || modals[i].contains(e.target)) {
						return;
					}
				}
				this.$refs.eventModal.hide();
			},
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
