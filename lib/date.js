'use strict';

const date = {
    timezone: 'local',
    setTimezone: function (timezone) {
        if (timezone) {
            if (timezone == "GMT") date.timezone = "GMT";
            else date.timezone = 'local';
        }
    },
    /**
     * Turn a dateString (YYYY-MM-DD) to an age
     * @param dateString
     * @param date - Optional date to compare with
     * @return int age
     */
    calculateAge:function (dateString, date=new Date()) {
        const dateSplitted = dateString.split('-');
        let birthDate = new Date(dateSplitted[0], +dateSplitted[1] - 1, dateSplitted[2]);
        let age = date.getFullYear() - birthDate.getFullYear();
        let monthsDiff = date.getMonth() - birthDate.getMonth();
        if (monthsDiff < 0 || (monthsDiff === 0 && date.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    },
    time: function () {
        let d = new Date();
        return (timezone == "local") ? d.toLocaleTimeString('en-US', {hour12: false}) : d.toISOString().substr(11, 8);
    },
    date: function () {
        let d = new Date();
        return (date.timezone == "local") ? d.toLocaleDateString() : d.toISOString().substr(0, 10);
    },
    datetime: function () {
        let d = new Date();
        return (date.timezone == "local") ? d.toLocaleString() : toISOString().substr(0, 10) + ' ' + d.toISOString().substr(11, 8);
    },
    UTCEpochMS: function () {
        return new Date().getTime();
    },
    UTCEpoch: function () {
        let d = new Date();
        return (d.timezone == "local") ? d.floor(d.getTime() / 1000) : Math.floor(d.getTime() / 1000);
    },
    localEpochMS: function () {
        let d = new Date();
        return (date.timezone == "local") ? d.getTime() + (d.getTimezoneOffset() * 60000) : d.getTime();
    },
    localEpoch: function () {
        let d = new Date();
        return (date.timezone == "local") ? Math.floor((d.getTime() + (d.getTimezoneOffset() * 60)) / 1000) : Math.floor(d.getTime() / 1000);
    }
};
module.exports = date;