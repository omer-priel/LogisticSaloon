import Vue from 'vue'
import Vuex from 'vuex'

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

function random(min, max) {
    max++;
    return Math.floor(Math.random() * (max - min) ) + min;
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

        showEventModal: () => {},

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
        load(state, args) {

            let showEventModal = args[0];

            let territorials = [
                {
                    title: 'פצ"ן',
                    centerLocation: { lat: 31.2, lng: 34.8 },
                },
                {
                    title: 'פקמ"ז',
                    centerLocation: { lat: 31.2, lng: 34.8 }
                },
                {
                    title: 'פד"ם',
                    centerLocation: { lat: 31.2, lng: 34.8 }
                },
            ];

            territorials.forEach(territorial => {
                createGroup(state.groupsByTerritorials, territorial.title, { centerLocation: territorial.centerLocation });
            });

            for (let i = 0; i < state.eventsData.length; i++) {

                // Temporary: not need ".event"
                // Temporary: nead form jsons
                let eventData = state.eventsData[i].event;
                
                // Temporary: need to get from the jsons.
                eventData.from = "גדוד 4321";
                // Temporary: create random date
                eventData.date = random(1000000000000, 2000000000000);

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
                let randomTerritorial = random(0, 2);
                state.groupsByTerritorials.get(territorials[randomTerritorial].title).events.set(eventId, event);
            }

            state.showEventModal = showEventModal;

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
        
        openEvent(state, args) {
            let id = args[0];
            
            state.showEventModal(state.events.get(id));
        },
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

        getColors(state) {
            return state.colors;
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