import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function createEvent(data) {
    data.date = new Date(data.date);
    
	let event = {
		id: data.id,
        data: data,
        
        selected: false,

        // click
        // selected = !selected;
    };
    
    return event;
}

export default new Vuex.Store({
    state: {
        events: [
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
        ]
    },
    mutations: {
        loadEvents(state) {
            for (let i = 0; i < state.events.length; i++) {

                // Temporary: need to get from the jsons.
                let event = state.events[i].event;

                // Temporary: need to get from the jsons.
                event.from = "גדוד 4321";
                // create random date
                event.date = new Date().getTime();
                
                state.events[i] = createEvent(event);
            }
        },
    },
    actions: {
        loadEvents(context) {
            context.commit("loadEvents"); 
        },

        click(con)
    },
    modules: {

    },
    getters: {
        getEvents(state) {
            return state.events;
        }
    }
});