import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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

    },
    actions: {

    },
    modules: {

    },
    getters: {
        getEvents(){
            return state.events;
        }
    }
});