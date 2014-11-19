/*!
 * FullCalendar v2.1.0 Google Calendar Plugin
 * Docs & License: http://arshaw.com/fullcalendar/
 * (c) 2013 Adam Shaw
 */


// Addition to modify links for CS10 calendar.
function getRoomUrl(loc) {
    var base = "http://www.berkeley.edu/map/3dmap/3dmap.shtml?",
        url  = { SD: 'sutardja',
                 LKS: 'likashing',
                 Soda: 'soda',
                 VLSB: 'valleylifesciences' },
        room = loc.split(' ')[1];

    if (url[room]) {
        room = url[room];
    }

    return base + room;
}

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define([ 'jquery' ], factory);
    }
    else {
        factory(jQuery);
    }
})(function($) {


var fc = $.fullCalendar;
var applyAll = fc.applyAll;


fc.sourceNormalizers.push(function(sourceOptions) {
    if (sourceOptions.dataType == 'gcal' ||
        sourceOptions.dataType === undefined &&
        (sourceOptions.url || '').match(/^(http|https):\/\/www.googleapis.com\/calendar\/v3\/calendars\//)) {
            sourceOptions.dataType = 'gcal';
            if (sourceOptions.editable === undefined) {
                sourceOptions.editable = false;
            }
        }
});


fc.sourceFetchers.push(function(sourceOptions, start, end, timezone) {
    if (sourceOptions.dataType == 'gcal') {
        return transformOptions(sourceOptions, start, end, timezone);
    }
});



function transformOptions(sourceOptions, start, end) {
    var success = sourceOptions.success;
    var data = $.extend({}, sourceOptions.data || {}, {
        'timeMin': start.format('YYYY-MM-DD[T]HH:mm:ssZ'),
        'timeMax': end.format('YYYY-MM-DD[T]HH:mm:ssZ'),
        'singlEevents': true,
        'maxResults': 250
        // 'start-min': formatDate(start, 'yyyy-mm-mm[T]HH:mm:ssZ'),
        // 'start-max': formatDate(end, 'yyyy-mm-mm[T]HH:mm:ssZ'),
        // 'single-events': true,
        // 'max-results': 250
    });

    var ctz = sourceOptions.currentTimezone;
    if (ctz) {
        data.ctz = ctz = ctz.replace(' ', '_');
    }

    return $.extend({}, sourceOptions, {
        url: sourceOptions.url + '&callback=?',
        dataType: 'jsonp',
        data: data,
        startParam: false,
        endParam: false,
        success: function(data) {
            console.log('success!');
            console.log(data);
            var events = [];
            if (data.items) {
                $.each(data.items, function(i, entry) {
                    if (entry.status === 'cancelled') {
                        return true;
                    }
                    console.log(start);
                    var start = entry.start.dateTime;
                    var end = entry.end.dateTime;
                    var allDay = entry.start.dateTime.indexOf('T') == -1;
                    var url = entry.htmlLink;
                    if (ctz) {
                        url += (url.indexOf('?') == -1 ? '?' : '&') + 'ctz=' + ctz;
                    }
                    if (allDay) {
                        addDays(end, -1); // make inclusive
                    }
                    events.push({
                        id: entry.id,
                        title: entry.summary,
                        start: entry.start.dateTime || entry.start.date,
                        end: entry.end.dateTime || entry.end.date,
                        url: getRoomUrl(entry.htmlLink), // My mod
                        location: entry.location,
                        description: entry.description
                    });
                });
            }
            var args = [events].concat(Array.prototype.slice.call(arguments, 1));
            var res = applyAll(success, this, args);
            if ($.isArray(res)) {
                return res;
            }
            return events;
        }
    });

}


    // legacy
    fc.gcalFeed = function(url, sourceOptions) {
        return $.extend({}, sourceOptions, { url: url, dataType: 'gcal' });
    };

});
