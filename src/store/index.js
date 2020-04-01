import Vue from 'vue'
import Vuex from 'vuex'
import { stat } from 'fs';

import CustomEvent from '../js/CustomEvent';

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
        colorId: map.size,
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

function random(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) ) + min;
}

export default new Vuex.Store({
    state: {
        // from the server
        eventTypes: [
            "הסלמה בדרום",
            "רצועת עזה",
            "תקיפה בסוריה",
            "עימותים ברצועת עזה",
            "טרור העפיפונים ובלוני התבערה",
        ],

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
            },
            {
                event: {
                    id: 3,
                    link: "https://www.hamal.co.il/post/-LncRYo2P--63J2Y6bZD",
                    content: "הפנטגון אישר הערב שארצות הברית תקפה פעילי אל-קאעדה במחוז אידליב שבצפון-מערב סוריה, בה נהרגו לפחות 40 פעילים מפגיעת טילים. זאת לאחר ראמי עבד אל-רחמן, העומד בראש הארגון הסורי לזכויות אדם, הודיע כי \"תקיפת טילים כוונה נגד התכנסות שנערכה על ידי מנהיגי חוראס אל-דין, אנסאר אל-תאוויד וארגונים נוספים בתוך מחנה האימונים\".",
                    event_type: "תקיפה בסוריה",
                    location: {
                        lat: 33.268782877555715,
                        lng: 35.687669976351636
                    }
                }
            },
            {
                event: {
                    id: 4,
                    link: "https://www.hamal.co.il/post/-LW1qTNj-HJdy6XrzSSy",
                    content: "אבו עביידה: \" האוייב צריך להיות מודאג מאוד שאוצר המידע שקיבלנו יתן לנו עליונות אסטרטגית במלחמת המוחות. עזה היא ארץ אסורה לאוייב הציוני\"",
                    event_type: "רצועת עזה",
                    location: {
                        lat: 32.0492021002358,
                        lng: 34.76006502911327
                    }
                }
            },
            {
                event: {
                    id: 5,
                    link: "https://www.hamal.co.il/post/-L_IrQ33K92yvXfy7egc",
                    content: "דיווח ערבי: מטענים נזרקו לעבר כוחות צה\"ל בגבול רצועת עזה, צה\"ל הגיב בירי",
                    event_type: "עימותים ברצועת עזה",
                    location: {
                        lat: 31.335510197502746,
                        lng: 34.62111727462318
                    }
                }
            },
            {
                event: {
                    id: 9,
                    link: "https://www.hamal.co.il/post/-LaU1bH_fwn3p66sy0Q3",
                    content: "פלסטינים בהכנות לשיגור בלונים לעבר העוטף",
                    event_type: "טרור העפיפונים ובלוני התבערה",
                    location: {
                        lat: 31.335462710203792,
                        lng: 34.39537703542182
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

            args = args[0];

            let showEventModal = args[0];
            let changeMapCenter = args[1];

            state.territorials.forEach(territorial => {
                createGroup(state.groupsByTerritorials, territorial.title, {
                    center: territorial.center,
                });
            });

            let newEventTypes = new Map();

            for (let i = 0; i < state.eventTypes.length; i++) {
                let eventType = state.eventTypes[i];
                newEventTypes.set(i, eventType);
                createGroup(state.groupsByTypes, eventType);
            }

            state.eventTypes = newEventTypes;

            for (let i = 0; i < state.eventsData.length; i++) {

                // Temporary: not need ".event"
                // Temporary: nead form jsons
                let eventData = state.eventsData[i].event;
                
                // Temporary: need to get from the jsons.
                eventData.from = `יחידה ${random(100, 9999)}`
                // Temporary: create random date
                eventData.date = random(1000000000000, 2000000000000);

                // create the event
                let eventType = eventData.event_type;
                let groupByType = state.groupsByTypes.get(eventType);
                
                let event = createEvent(eventData, groupByType.colorId);
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

            state.showEventModal = showEventModal;
            state.changeMapCenter = changeMapCenter;

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

            console.log(`groupsFilter: ${sortBy} - ${filterTitle}`);

            state.groups = state.groupsByTypes;

            if (filterTitle) { // filter
                if (sortBy == "types") { // filter Event Type

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
                            territorials[event.territorial.colorId].set(event.id, event);
                        }

                        for (let i = 0; i < state.territorials.length; i++) {
                            for (let event of territorials[i].values()) {
                                sortGroup.events.set(event.id, event);
                            }
                        }

                        sortGroups.set(group.title, sortGroup);
                    }

                    state.groups = sortGroups;

                    state.groupsChanged.run();

                    state.changeMapCenter(false, null);
                }
            }
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
        load(context, showEventModal) {
            context.commit("load", [showEventModal]); 
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

        getEventTemplet(state) {
            let templet = {
                id: 0,
                    link: "",
                    content: "",
                    event_type: "",
                    from: "",
                    date: 0,
                    location: {
                        lat: 0,
                        lng: 0
                    }
            }
            return createEvent(templet, 0);
        }
    }
});