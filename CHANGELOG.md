# 1.9.0 - 06/03/2017
* Added is.JSON
* Added is.stringified
# 1.8.0 - 05/03/2017
* Added average, mean, median, highest and lowest math methods

# 1.7.0 - 17/02/2017
* Added getServerIP (IPv4 or IPv6)
* Added file.download

# 1.6.0 - 09/02/2017
* Added date.calculateAge 
* Added string.pad.left && string.pad.right

# 1.5.0 - 06/02/2017
* Added levenshtein + stringDistance between two strings.

# 1.4.0 - 05/02/2017
* Added little file helper (create, append, delete, sizeof, exist)

# 1.3.0 - 31/01/2017
* Added is.hex a util able to detect if passed string is an hexa string or not.

# 1.2.1 - 30/01/2017
* Added Regex for parsing a string that contains a valid URI
  * `regex.hasUri("t.ly/12bl3xX");` will return `true`
  * `regex.hasUri("Check it out t.ly/12bl3xX");` will return `true`

# 1.2.0 - 30/01/2017
* Added Regex parsing a string and checks if it's a valid URI.
  * `regex.isUri("t.ly/12bl3xX");` will return `true`
  * `regex.isUri("Check it out t.ly/12bl3xX");` will return `false`
