# 1.2.1 - 30/01/2017
* Added Regex for parsing a string that contains a valid URI
  * `regex.hasUri("t.ly/12bl3xX");` will return `true`
  * `regex.hasUri("Check it out t.ly/12bl3xX");` will return `true`

# 1.2.0 - 30/01/2017
* Added Regex parsing a string and checks if it's a valid URI.
  * `regex.isUri("t.ly/12bl3xX");` will return `true`
  * `regex.isUri("Check it out t.ly/12bl3xX");` will return `false`
