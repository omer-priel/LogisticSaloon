import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

Vue.use(Vuex)

function createEvent(data) {
    //make clone
    data = {...data};
    
    data.date = new Date(data.date);
    
	let event = {
        id: data.id,

        // data fields
        data: data,
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
                    centerLocation: {
                        lat: 31.313430926637704,
                        lng: 34.5967077351318
                    },
                },
                {
                    title: "פיקוד מרכז",
                    centerLocation: {
                        lat: 31.313430926637704,
                        lng: 34.5967077351318
                    },
                },
                {
                    title: "פיקוד דרום",
                    centerLocation: {
                        lat: 31.313430926637704,
                        lng: 34.5967077351318
                    },
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
                let event = createEvent(eventData);
                let eventId = event.data.id;
                
                // save the event
                state.events.set(eventId, event);
                
                let eventType = event.data.event_type;
                if (!state.groupsByTypes.has(eventType)) {
                    createGroup(state.groupsByTypes, eventType);
                }
                state.groupsByTypes.get(eventType).events.set(eventId, event);
            
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
        groupsFilter(state, sortBy, filter_title) {
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
            if (filter_title) {
                let group = new Map();
                group.set(filter_title, groups.get(filter_title));
                groups = group;
            }

            state.groups = groups;
        },
        
        toggleOpen(state, id, opend) {
            state.events.get(id).opend = opend;
        },
    },
    actions: {
        // main
        load(context) {
            context.commit("load"); 
        },

        // sorts and filters
        sortByTypes(context) {
            context.commit("groupsFilter", "types", null);
        },

        filterByType(context, type_title) {
            context.commit("groupsFilter", "types", type_title);
        },

        sortByTerritorials(context) {
            context.commit("groupsFilter", "territorials", null); 
        },

        filterByTerritorial(context, territorial_title) {
            context.commit("groupsFilter", "territorials", territorial_title);
        },

        // on event
        open(context, id) {
            context.commit("toggleOpen", id, true);
        },

        close(content, id) {
            context.commit("toggleOpen", id, false);
        },

    },
    modules: {

    },
    getters: {
        getGroups(state) {
            return state.groups.values();
        },

        getEvent(id) {
            return state.events.get(id);
        }
    }
});