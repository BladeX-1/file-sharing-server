# file-sharing-server

for user not logged-in<br>
route: /login -> allowed<br>
route: any other -> redirects to /login



for user logged-in<br>
route:/ login -> redirects to /<br>
route: any other -> allowed



to put files for sharing, run the command like this:<br>
$updateFiles.cmd <filename>
