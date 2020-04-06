# LogisticSaloon

# API

Get from the server:

eventTypes: [String]

eventData: {

    id: Number
    date: Number
    from: String
    link: String
    content: String
    event_type: String   
    location: {
        lat: Number
        lng: Number
    }

}

group: {
    
    title: String
    
    id: Number
    events: Map<eventId, event>

}

event: {
    
    id: Number
    
    data: eventData
    typeId: Number
    map: {}
}