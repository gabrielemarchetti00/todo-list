export function populateStorage(defaultP, uni, sport, holiday) {
    localStorage.setItem('default', JSON.stringify(defaultP));
    localStorage.setItem('uni', JSON.stringify(uni));
    localStorage.setItem('sport', JSON.stringify(sport));
    localStorage.setItem('holiday', JSON.stringify(holiday));
}

export function getStorageDefault(){
    let defaultP = [];
    if(JSON.parse(localStorage.getItem('default') != null)){
        defaultP = JSON.parse(localStorage.getItem('default'));
    }
    return defaultP;
}

export function getStorageUni(){
    let uni = [];
    if(JSON.parse(localStorage.getItem('uni')) != null){
        uni = JSON.parse(localStorage.getItem('uni'));
    }
    return uni;
}

export function getStorageSport(){
    let sport = [];
    if(JSON.parse(localStorage.getItem('sport')) != null){
        sport = JSON.parse(localStorage.getItem('sport'));
    }
    return sport;
}

export function getStorageHoliday(){
    let holiday = [];
    if(JSON.parse(localStorage.getItem('holiday')) != null){
        holiday = JSON.parse(localStorage.getItem('holiday'));  
    }
    return holiday;
}