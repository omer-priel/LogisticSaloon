import Vue from 'vue'
import Vuex from 'vuex'

import CustomEvent from '../js/CustomEvent';

Vue.use(Vuex)

function createEvent(data, typeId) {
    //make clone
    data = {...data};
    
    data.date = new Date(data.date);
    
	let event = {
        id: data.id,

        // data fields
        data: data,
        typeId: typeId,
        visibility: true,

        //groups
        territorial: {},
        eventType: {},

        //actions
        setVisibility(visibility) {
            this.visibility = visibility;
            this.map.setVisibility(visibility);
        },

        map: {},
    };
    
    return event;
}

function createGroup(map, title, fiels = {}) {
    let group = {
        title: title,
        id: map.size,
        events: new Map(),
        setVisibility(visibility) {
            for (let event of this.events.values()) {
                event.setVisibility(visibility);
            }  
        },
        ...fiels,
    }

    map.set(title, group);
}

export default new Vuex.Store({
    state: {
        // from the server
        eventTypes: [],

        // from the server
        eventsData: [],

        colors: [
            "#26c485",
            "#99cdfe",
            "#e9e39b",
            "#fd9a82",
            "#7796cb",
        ],

        // id => event
        events: new Map(),

        // events
        showEventModal: () => {},

        changeMapCenter: (zoomIn, location) => {},

        groupsChanged: new CustomEvent(),

        // event_type => groups
        // Sort by "סוגים". in the code by event_type
        groupsByTypes: new Map(),

        territorials: [
            {
                title: 'פצ"ן',
                center: { lat: 32.7, lng: 35.2 },
                limit: 32.454868
            },
            {
                title: 'פקמ"ז',
                center: { lat: 32, lng: 35.2 },
                limit: 31.532362
            },
            {
                title: 'פד"ם',
                center: { lat: 30.8, lng: 35.2 },
                limit: 29.452310
            },
        ],

        // territorial_title => group
        // Sort "פיקודים". in the code by location
        groupsByTerritorials: new Map(),
        
        //
        groups: new Map(),
    },
    mutations: {
        load(state, args) {
            let showEventModal = args[0];
            let changeMapCenter = args[1];

            state.showEventModal = showEventModal;
            state.changeMapCenter = changeMapCenter;

            state.territorials.forEach(territorial => {
                createGroup(state.groupsByTerritorials, territorial.title, {
                    center: territorial.center,
                });
            });

            for (let i = 0; i < state.eventTypes.length; i++) {
                let eventType = state.eventTypes[i];
                createGroup(state.groupsByTypes, eventType);
            }

            for (let i = 0; i < state.eventsData.length; i++) {

                let eventData = state.eventsData[i];

                // create the event
                let eventType = eventData.event_type;
                let groupByType = state.groupsByTypes.get(eventType);
                
                let event = createEvent(eventData, groupByType.id);
                let eventId = event.data.id;
                
                // save the event
                state.events.set(eventId, event);
                
                groupByType.events.set(eventId, event);
                event.eventType = groupByType;
            
                for (let territorialIndex = 0; territorialIndex < state.territorials.length; territorialIndex++) {
                    let territorial = state.territorials[territorialIndex];
                    if (event.data.location.lat > territorial.limit) {
                        let groupByTerritorial = state.groupsByTerritorials.get(territorial.title);
                        groupByTerritorial.events.set(eventId, event);
                        event.territorial = groupByTerritorial;
                        break;
                    }
                }
            }
        },



        /**
         * 
         * @param {*} state - Store.state
         * @param {String} sortBy - sort by "types" / "territorials".
         * @param {String} filter_title - filter by title or null for all
         */
        groupsFilter(state, args) {
            let sortBy = args[0];
            let filterTitle = args[1];

            state.groups = state.groupsByTypes;

            if (filterTitle) { // filter
                if (sortBy == "types") { // filter Event Type

                    for (let group of state.groupsByTypes.values()) {
                        group.setVisibility(false);
                    }

                    let group = state.groupsByTypes.get(filterTitle);
                    group.setVisibility(true);

                    let groups = new Map();
                    groups.set(filterTitle, group);

                    state.groups = groups;
                
                } else { // filter Territorial
                    for (let territorial of state.groupsByTerritorials.values()) {
                        territorial.setVisibility(false);
                    }

                    let territorial = state.groupsByTerritorials.get(filterTitle);
                    territorial.setVisibility(true);

                    state.changeMapCenter(true, territorial.center);
                }
            } else { // sort
                if (sortBy == "types") { // sort Event Type
                    for (let group of state.groupsByTypes.values()) {
                        group.setVisibility(true);
                    }
                } else { // sort Territorial
                    for (let territorial of state.groupsByTerritorials.values()) {
                        territorial.setVisibility(true);
                    }

                    let sortGroups = new Map();
                    for (let group of state.groups.values()) {
                        let sortGroup = {...group};
                        sortGroup.events = new Map();

                        let territorials = [];
                        for (let i = 0; i < state.territorials.length; i++) {
                            territorials[i] = new Map();
                        }

                        for (let event of group.events.values()) {
                            territorials[event.territorial.id].set(event.id, event);
                        }

                        for (let i = 0; i < state.territorials.length; i++) {
                            for (let event of territorials[i].values()) {
                                sortGroup.events.set(event.id, event);
                            }
                        }

                        sortGroups.set(group.title, sortGroup);
                    }

                    state.groups = sortGroups;

                    state.changeMapCenter(false, null);

                    /**
                     * 
                        for (let i = 0; i < state.territorials.length; i++) {
                            for (let event of territorials[i].values()) {
                                sortGroup.events.set(event.id, event);
                            }
                        }

                        sortGroups.set(group.title, sortGroup);
                    }

                    state.groups = sortGroups;

                    state.changeMapCenter(false, null);
                     */
                }
            }

            state.groupsChanged.run(sortBy, filterTitle);
        },
        
        openEvent(state, args) {
            let id = args[0];
            
            state.showEventModal(state.events.get(id));
        },

        addGroupsChanged(state, args) {
            let callback = args[0];
            
            state.groupsChanged.add(callback);
        }
    },
    actions: {
        // main
        load(context, args) {
            context.commit("load", args); 
        },

        // sorts and filters
        sortByTypes(context) {
            context.commit("groupsFilter", ["types", null]);
        },

        filterByType(context, type_title) {
            context.commit("groupsFilter", ["types", type_title]);
        },

        sortByTerritorials(context) {
            context.commit("groupsFilter", ["territorials", null]); 
        },

        filterByTerritorial(context, territorial_title) {
            context.commit("groupsFilter", ["territorials", territorial_title]);
        },

        // on event
        openEvent(context, id) {
            context.commit("openEvent", [id]);
        },

        addGroupsChanged(context, callback) {
            context.commit("addGroupsChanged", [callback]);
        },

    },
    modules: {

    },
    getters: {
        getGroups(state) {
            return state.groups;
        },

        getGroupsByTypes(state) {
            return state.groupsByTypes;
        },

        getGroupsByTerritorials(state) {
            return state.groupsByTerritorials;
        },

        getColors(state) {
            return state.colors;
        },

        getTerritorials(state) {
            return state.territorials;
        },

        getEventTypes(state) {
            return state.eventTypes;
        },

        getEvents(state) {
            return state.events;
        },
    }
});