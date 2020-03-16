import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

function createEvent(data, colorId) {
    //make clone
    data = {...data};
    
    data.date = new Date(data.date);
    
	let event = {
        id: data.id,

        // data fields
        data: data,
        colorId: colorId,
        map: {},
        
        // event fields
        opened: false,
    };
    
    return event;
}

function createGroup(map, title, fiels = {}) {
    let group = {
        title: title,
        colorId: map.size,
        events: new Map(),
        ...fiels,
    }

    map.set(title, group);
}

export default new Vuex.Store({
    state: {
        // from the server
        eventsData: [
            {
                event: {
                    id: 0,
                    link:
                        "https://www.hamal.co.il/post/-Le3Soja2sYlS7gZ17nz",
                    content: "מטח רקטות שוגר לעבר באר שבע",
                    event_type: "הסלמה בדרום",
                    location: {
                        lat: 31.313430926637704,
                        lng: 34.5967077351318
                    }
                }
            },
            {
                event: {
                    id: 1,
                    link:
                        "https://www.hamal.co.il/post/-Laqlj7WosEV8BKPV3NY",
                    content:
                        "הפסקות חשמל במספר יישובים המועצה האזורית שער הנגב",
                    event_type: "הסלמה בדרום",
                    location: {
                        lat: 31.525942837952083,
                        lng: 34.59669981017577
                    }
                }
            },
            {
                event: {
                    id: 2,
                    link:
                        "https://www.hamal.co.il/post/-LgOmzUeECDM3rxL3kwf",
                    content:
                        "דיווח ראשוני על שיגור כושל מצפון רצועת עזה לעבר שטח ישראל. לפי הדיווח, הרקטה נחתה בים",
                    event_type: "רצועת עזה",
                    location: {
                        lat: 32.05020128541517,
                        lng: 34.75984151911165
                    }
                }
            }
        ],

        colors: [
            "#26c485",
            "#99cdfe",
            "#e9e39b",
            "#fd9a82",
            "#7796cb",
        ],

        // id => event
        events: new Map(),

        // event_type => group
        // Sort by "סוגים". in the code by event_type
        groupsByTypes: new Map(),

        // territorial_title => group
        // Sort "פיקודים". in the code by location
        groupsByTerritorials: new Map(),
        
        //
        groups: new Map(),
    },
    mutations: {
        load(state) {

            let territorials = [
                {
                    title: "פיקוד צפון",
                    centerLocation: { lat: 31.2, lng: 34.8 },
                },
                {
                    title: "פיקוד מרכז",
                    centerLocation: { lat: 31.2, lng: 34.8 }
                },
                {
                    title: "פיקוד דרום",
                    centerLocation: { lat: 31.2, lng: 34.8 }
                },
            ];

            territorials.forEach(territorial => {
                createGroup(state.groupsByTerritorials, territorial.title, { centerLocation: territorial.centerLocation });
            });

            for (let i = 0; i < state.eventsData.length; i++) {

                // Temporary: need to get from the jsons.
                let eventData = state.eventsData[i].event;

                // Temporary: need to get from the jsons.
                eventData.from = "גדוד 4321";
                // create random date
                eventData.date = new Date().getTime();
                
                // create the event
                let eventType = eventData.event_type;
                if (!state.groupsByTypes.has(eventType)) {
                    createGroup(state.groupsByTypes, eventType);
                }
                let groupByType = state.groupsByTypes.get(eventType);
                
                let event = createEvent(eventData, groupByType.colorId);
                let eventId = event.data.id;
                
                // save the event
                state.events.set(eventId, event);
                
                groupByType.events.set(eventId, event);
            
                // Temporary: need real sort by location
                let randomTerritorial = Math.floor(Math.random() * 3);
                state.groupsByTerritorials.get(territorials[randomTerritorial].title).events.set(eventId, event);
            }

            this.dispatch("sortByTypes");
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

            let groups;
            switch (sortBy) {
                case "types": {
                    groups = state.groupsByTypes;
                    
                }
                break;
                case "territorials": {
                    groups = state.groupsByTerritorials;
                }
                break;
                default: {
                    console.error("not exist");
                    return;
                }
            }
            if (filterTitle) {
                let group = new Map();
                group.set(filter_title, groups.get(filterTitle));
                groups = group;
            }

            state.groups = groups;
        },
        
        toggleEvent(state, args) {
            let id = args[0];
            let opened = args[1];
            
            state.events.get(id).opened = opened;
        },
    },
    actions: {
        // main
        load(context) {
            context.commit("load"); 
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
            context.commit("toggleEvent", [id, true]);
        },

        closeEvent(content, id) {
            context.commit("toggleEvent", [id, false]);
        },

    },
    modules: {

    },
    getters: {
        getGroups(state) {
            return state.groups.values();
        },

        getColors(state) {
            return state.colors;
        },

        getEvents(state) {
            return state.events.values();
        },

        getEvent(id) {
            return state.events.get(id);
        },
    }
});