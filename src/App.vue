<template>
<body id="App">
	<b-navbar id="navbar">
		<b-navbar-brand>סלון לוגיסטי</b-navbar-brand>
		<b-nav-item  to="/cards">מידע</b-nav-item>
		<b-nav-item to="/charts">גרפים</b-nav-item>
	</b-navbar>
	<b-container fluid>
		<b-row>
			<b-col>
				<router-view id="view" />
			</b-col>
			<b-col cols="8">
				<Map ref="map" class="max_height" />
			</b-col>
		</b-row>
	</b-container>
</body>
</template>

<script>
	require("./js/here/mapsjs-core.js");
	require("./js/here/mapsjs-data.js");
	require("./js/here/mapsjs-service.js");
	require("./js/here/mapsjs-ui.js");
	require("./js/here/mapsjs-mapevents.js");

	document.body.dir = "rtl";

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

		mounted() {
			this.load();
		},

		methods: {
			...mapActions([
				"load"
				]),
		}
	};
</script>

<style lang="scss">
	.row > div {
		padding-left: 0px;
		padding-right: 0px;
	}

</style>
