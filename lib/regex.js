'use strict';

const regex = {
    types:{
        RFC4122V4UUIDRegex:/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4{1}[a-fA-F0-9]{3}-[89abAB]{1}[a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/,
        emailUnicodeRegex:/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        emailRegex:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        usernameRegex:/^[A-Za-z0-9_.]{3,}$/,
        passwordRegex:/^[a-zA-Z0-9!@#$%^&*]{6,36}$/,
        genderRegex:/^(Male|Female)$/,
        birthdateRegex:/^(([0-9]{4})\-(0[1-9]|1[0-2])\-(0[1-9]|[1-2][0-9]|3[0-1]))$/
    },
    regTest:(regex,val)=> regex.test(val),
    isUUIDV4:(uuid)=>regex.regTest(new RegExp(regex.types.RFC4122V4UUIDRegex),uuid),
    isUsername:(username)=>regex.regTest(new RegExp(regex.types.usernameRegex,'i'),username),
    isBirthdate:(birthday)=>regex.regTest(new RegExp(regex.types.birthdateRegex),birthday),
    isGender:(gender)=>regex.regTest(new RegExp(regex.types.genderRegex), gender),
    isPassword:(passwd)=>regex.regTest(new RegExp(regex.types.passwordRegex), passwd),
    isEmail:(email)=>regex.regTest(new RegExp(regex.types.emailRegex,'i'),email),
    isUnicodeEmail:(email)=>regex.regTest(new RegExp(regex.types.emailUnicodeRegex,'i'),email),
    
};
module.exports = regex;