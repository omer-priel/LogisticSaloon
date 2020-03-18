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

				<b-form-radio-group
					buttons
    				button-variant="outline-primary"
					class="mr-5"
					v-model="mode"
    				:options="modes"
					:to="mode"
      			></b-form-radio-group>
    		</b-navbar-nav>

    		<b-navbar-nav class="ml-auto">
				<b-navbar-brand>סלון לוגיסטי</b-navbar-brand>
			</b-navbar-nav>
    	</b-collapse>
	</b-navbar>
	<main>
		<div cols="4" class="slidbar" >
			<router-view id="view" />
		</div>
		<Map ref="map" class="max_height" />
	</main>
</body>
</template>

<script>
	import { mapActions } from "vuex";

	import Map from "./components/Map.vue";

	export default {
		name: "App",
		components: {
			Map
		},

		head: {
			title: {
				inner: "Logistic Saloon"
			}
		},

		data() {
			return {
				mode: "/cards",
				modes: [
					{ text: 'לתצוגה המידעית', value: "/cards" },
					{ text: 'לתצוגה הסטטיסטית', value: "/charts" },
				],
			};
		},

		mounted() {
			this.load();
			this.$refs.map.load();
			this.changeMode();
		},

		methods: {
			...mapActions([
				"load"
				]),
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
