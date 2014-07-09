// this is an idea for making the site easier to update, maybe..
// This is major WIP and the API / format for this has yet to be finalized
lectures = [
    {
        title: '',
        slides: 'url',
        video: 'url',
        style: 'optional classes to apply'
    }
]

/* DATA MODELS -- OPTIONAL DATA NOTED */
reading = {
    title: 'Name',
    url: 'duh',
    type: 'required hard' // or whatver
}

lab = {
    title: '',
    url: '',
    RQ: 1, // OPTIONAL -- INT,
    video: '' // OPTIONAL -- LINK
}

discussion = {
    title: '',
    files: false // OPTIONAL -- default false
}

cs10 = {}

cs10.newLabObject = function(title, url, rq, video) {
    // FIXME -- better handle the URL via config
    // TODO  -- How does "Project Work" or no lab fit into this?
    baseURL = '../labs/llab/html/topic.html?topic=';
    var labObj = {
        'title': title,
        'url': baseURL + url
    };
    if (rq) {
        labObj.RQ = rq;
    }
    if (video) {
        labObj.video = video;
    }
    return labObj;
}

var lab = cs10.newLabObject

allLabs = [
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
]