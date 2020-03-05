# LogisticSaloon

# API

eventData: {

    id: Number
    
    link: String
    
    content: String
    
    event_type: String
    
    location: {
        lat: Number
        lng: Number
    }
}

event: {
    
    id: Number
    
    data: eventData
    
    map: {
    
        onClick: Function
    
    }

}