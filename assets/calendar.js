// this is an idea for making the site easier to update, maybe..
// This is major WIP and the API / format for this has yet to be finalized
lectures = [
    {
        title: '',
        slides: 'url',
        video: 'url',
        style: 'optional classes to apply'
    }
];

/* DATA MODELS -- OPTIONAL DATA NOTED */
reading = {
    title: 'Name',
    url: 'duh',
    type: 'required hard' // or whatver
};

lab = {
    title: '',
    url: '',
    RQ: 1, // OPTIONAL -- INT,
    video: '' // OPTIONAL -- LINK
};

discussion = {
    title: '',
    files: false // OPTIONAL -- default false
};

cs10 = {};

cs10.newLabObject = function(title, url, rq, video) {
    // FIXME -- better handle the URL via config
    // TODO  -- How does "Project Work" or no lab fit into this?
    baseURL = '../labs/llab/html/topic.html?topic=';
    var labObj = {
        'title': title,
    };
    if (title === null) {
        // set title
        return labObj;
    }
    if (url) {
        labObj.url = baseURL + url;
    }
    if (rq) {
        labObj.RQ = rq;
    }
    if (video) {
        labObj.video = video;
    }
    return labObj;
};

var lab = cs10.newLabObject,
    readings = function() {},
    lect = function() {},
    disc = function() {},
    hw = function() {};


// ==================================================
// ==========     SCHEDULE ITEMS           ==========
// ==================================================

// Aug 25 - 29
cs10.week1 = [
    readings(null),
    lect(null),
    lab(null),
    lect(null),
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc('Welcome to CS10!'),
    hw('HW0') ];

// Sept 1 - 5
cs10.week2 = [
    readings(null),
    lect(null),
    lab('Build Your Own Blocks', 'berkeley_bjc/intro_new/2-loops-variables.topic', 1),
    lect('Welcome and Abstraction'),
    lab('Conditionals', 'berkeley_bjc/intro_new/3-conditionals.topic'),
    disc('Getting Started With <span class=“snap”>snap</span>'),
    hw('Start on HW1') ];

// Sept 8 - 12
cs10.week3 = [
    readings(null),
    lect('Functions'),
    lab('Functions', 'berkeley_bjc/intro_new/4-abstraction-testing.topic', 2),
    lect('Creativity and Abstraction'),
    lab('Lists 1', 'berkeley_bjc/lists/lists-I.topic'),
    disc('All about lists'),
    hw('HW1') ];

// Sept 15 - 19
cs10.week4 = [
    readings(null),
    lect(null),
    lab(null),
    lect(null),
    lab(null),
    disc('Welcome to CS10!'),
    hw('HW0') ];

// Sept 22 - 26
cs10.week5 = [
    readings(null),
    lect(null),
    lab(null),
    lect('Welcome and Abstraction'),
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc('Getting Started With <span class=“snap”>snap</span>'),
    hw('Start on HW1') ];

// Sept 29 - Oct 3
cs10.week6 = [
    readings(null),
    lect(null),
    lab(null),
    lect('Welcome and Abstraction'),
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc('Getting Started With <span class=“snap”>snap</span>'),
    hw('Start on HW1') ];

// Oct 6 - 10
cs10.week7 = [
    readings(null),
    lect(null),
    lab(null),
    lect(null),
    lab(null),
    disc('Welcome to CS10!'),
    hw('HW0') ];

// Oct 13 - 17
cs10.week8 = [
    readings(null),
    lect(null),
    lab(null),
    lect('Welcome and Abstraction'),
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc('Getting Started With <span class=“snap”>snap</span>'),
    hw('Start on HW1') ];

// Oct 20 - 24
cs10.week9 = [
    readings(null),
    lect(null),
    lab(null),
    lect('Welcome and Abstraction'),
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc('Getting Started With <span class=“snap”>snap</span>'),
    hw('Start on HW1') ];

// Oct 27 - 31
cs10.week10 = [
    readings(null),
    lect(null),
    lab(null),
    lect(null),
    lab(null),
    disc('Welcome to CS10!'),
    hw('HW0') ];

// Nov 3 - 7
cs10.week11 = [
    readings(null),
    lect(null),
    lab(null),
    lect('Welcome and Abstraction'),
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc('Getting Started With <span class=“snap”>snap</span>'),
    hw('Start on HW1') ];

// Nov 10 - 14
cs10.week12 = [
    readings(null),
    lect(null),
    lab(null),
    lect('Welcome and Abstraction'),
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc('Getting Started With <span class=“snap”>snap</span>'),
    hw('Start on HW1') ];

// Nov 17 - 21
cs10.week13 = [
    readings(null),
    lect(null),
    lab(null),
    lect(null),
    lab(null),
    disc('Welcome to CS10!'),
    hw('HW0') ];

// Nov 24 - 28
cs10.week14 = [
    readings(null),
    lect(null),
    lab(null),
    lect('Welcome and Abstraction'),
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc('Getting Started With <span class=“snap”>snap</span>'),
    hw('Start on HW1') ];

// Dec 1 - 5
cs10.week15 = [
    readings(null),
    lect(null),
    lab(null),
    lect('Welcome and Abstraction'),
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc('Getting Started With <span class=“snap”>snap</span>'),
    hw('Start on HW1') ];

// Dec 8 - 12
cs10.week16 = [
    readings(null),
    lect(null),
    lab(null),
    lect(null),
    lab(null),
    disc('Welcome to CS10!'),
    hw('HW0') ];

// Dec 15 - 19
cs10.week17 = [
    readings(null),
    lect(null),
    lab(null),
    lect('Welcome and Abstraction'),
    lab("Welcome to <span class='snap'>snap</span>", "berkeley_bjc/intro_new/1-introduction.topic"),
    disc('Getting Started With <span class=“snap”>snap</span>'),
    hw('Start on HW1') ];

cs10.schedule = [ ];
cs10.buildCal = function() {
    var calDiv     = $('#main-cal'),
        calPills   = $('#cal-sidebar'),
        calContent = $('#calContent'),
        selector, title;
    for(var i = 1; i <= 17; i += 1) {
        cs10.schedule.push(cs10['week' + i]);
        selector = 'cal-week-' + i;
        title = 'Week ' + i;
        calPills.append('<li><a href="' + selector + '" role="tab" data-toggle="tab">' + title + '</a></li>');
    }
};

$(document).ready(cs10.buildCal);
