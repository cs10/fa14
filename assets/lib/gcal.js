/*!
 * FullCalendar v1.6.4 Google Calendar Plugin
 * Docs & License: http://arshaw.com/fullcalendar/
 * (c) 2013 Adam Shaw
 */

// Addition to modify links for CS10 calendar.
function getRoomUrl(loc) {
    var base = "http://www.berkeley.edu/map/3dmap/3dmap.shtml?",
        url  = { SD: 'sutardja',
                 LKS: 'likashing',
                 Soda: 'soda',
                 VLSB: 'valleylifesciences',
                 Etch: 'etcheverry',
                 Etcheverry: 'etcheverry',
                 Evans: 'evans' },
        room = "",
        rm   = loc.split(' ')[1];

    if (url[rm]) {
        room = url[rm];
    } else {
        room = rm;
    }

    return base + room;
}

(function($) {


var fc = $.fullCalendar;
var formatDate = fc.formatDate;
var parseISO8601 = fc.parseISO8601;
var addDays = fc.addDays;
var applyAll = fc.applyAll;


fc.sourceNormalizers.push(function(sourceOptions) {
    if (sourceOptions.dataType == 'gcal' ||
        sourceOptions.dataType === undefined &&
        (sourceOptions.url || '').match(/^(http|https):\/\/www.googleapis.com\/calendar\/v3\/calendars//)) {
            sourceOptions.dataType = 'gcal';
            if (sourceOptions.editable === undefined) {
                sourceOptions.editable = false;
            }
        }
});


fc.sourceFetchers.push(function(sourceOptions, start, end) {
    if (sourceOptions.dataType == 'gcal') {
        return transformOptions(sourceOptions, start, end);
    }
});


function transformOptions(sourceOptions, start, end) {

    var success = sourceOptions.success;
    var data = $.extend({}, sourceOptions.data || {}, {
        'start-min': formatDate(start, 'u'),
        'start-max': formatDate(end, 'u'),
        'singleevents': true,
        'max-results': 9999
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
            var events = [];
            if (data.items) {
                $.each(data.items, function(i, entry) {
                    var startStr = entry['gd$when'][0]['startTime'];
                    var start = parseISO8601(startStr, true);
                    var end = parseISO8601(entry['gd$when'][0]['endTime'], true);
                    var allDay = startStr.indexOf('T') == -1;
                    var url;
                    $.each(entry.link, function(i, link) {
                        if (link.type == 'text/html') {
                            url = link.href;
                            if (ctz) {
                                url += (url.indexOf('?') == -1 ? '?' : '&') + 'ctz=' + ctz;
                            }
                        }
                    });
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
                        // id: entry['gCal$uid']['value'],
                        // title: entry['title']['$t'],
                        // url: getRoomUrl(entry['gd$where'][0]['valueString']),
                        // start: start,
                        // end: end,
                        // allDay: allDay,
                        // location: entry['gd$where'][0]['valueString'],
                        // description: entry['content']['$t']
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


})(jQuery);
//
// (function(factory) {
//     if (typeof define === 'function' && define.amd) {
//         define([ 'jquery' ], factory);
//     }
//     else {
//         factory(jQuery);
//     }
// })(function($) {
//
//
// var fc = $.fullCalendar;
// var applyAll = fc.applyAll;
//
//
// fc.sourceNormalizers.push(function(sourceOptions) {
//
//     if (sourceOptions.dataType == 'gcal' ||
//         sourceOptions.dataType === undefined &&
//         (sourceOptions.url || '').match(/^(http|https):\/\/www.googleapis.com\/calendar\/v3\/calendars/)) {
//             sourceOptions.dataType = 'gcal';
//             if (sourceOptions.editable === undefined) {
//                 sourceOptions.editable = false;
//             }
//         }
// });
//
//
// fc.sourceFetchers.push(function(sourceOptions, start, end, timezone) {
//     if (sourceOptions.dataType == 'gcal') {
//         return transformOptions(sourceOptions, start, end, timezone);
//     }
// });
//
//
// function transformOptions(sourceOptions, start, end, timezone) {
//
//     var success = sourceOptions.success;
//     var data = $.extend({}, sourceOptions.data || {}, {
//         'singleEvents' : true,
//         'maxResults': 250,
//         'timeMin': start.format('YYYY-MM-DD[T]HH:mm:ssZ'),
//         'timeMax': end.format('YYYY-MM-DD[T]HH:mm:ssZ'),
//     });
//
//     return $.extend({}, sourceOptions, {
//         url: sourceOptions.url + '&callback=?',
//         dataType: 'jsonp',
//         data: data,
//         success: function(data) {
//             var events = [];
//             if (data.items) {
//                 $.each(data.items, function(i, entry) {
//                     events.push({
//                         id: entry.id,
//                         title: entry.summary,
//                         start:  entry.start.dateTime || entry.start.date,
//                         end: entry.end.dateTime || entry.end.date,
//                         url: entry.htmlLink,
//                         location: entry.location,
//                         description: entry.description || '',
//                     });
//
//                 });
//             }
//             var args = [events].concat(Array.prototype.slice.call(arguments, 1));
//             var res = applyAll(success, this, args);
//             if ($.isArray(res)) {
//                 return res;
//             }
//             return events;
//         }
//     });
//
// }
//
//
// // legacy
// fc.gcalFeed = function(url, sourceOptions) {
//     return $.extend({}, sourceOptions, { url: url, dataType: 'gcal' });
// };
//
//
// });
