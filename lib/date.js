'use strict';
const string = require('./string.js');
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
    YYYYMMDDhhmmss:function(_params){
        let params = {
            separatorDate:"-",
            separatorTime:":",
            separatorBetween:" ",
            d:new Date
        };
        if(_params){
            if(_params.hasOwnProperty('d')){params.d=_params.d}
            if(_params.hasOwnProperty('separatorDate')){params.separatorDate=_params.separatorDate}
            if(_params.hasOwnProperty('separatorTime')){params.separatorTime=_params.separatorTime}
            if(_params.hasOwnProperty('separatorBetween')){params.separatorBetween=_params.separatorBetween}
        }
        return [
                params.d.getFullYear(),
                string.pad.left(params.d.getDate(),2,0),
                string.pad.left((params.d.getMonth()+1),2,0),
            ].join(params.separatorDate) +params.separatorBetween +
            [
                string.pad.left(params.d.getHours(),2,0),
                string.pad.left(params.d.getMinutes(),2,0),
                string.pad.left(params.d.getSeconds(),2,0)
            ].join(params.separatorTime);
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