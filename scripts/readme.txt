call as:
$node updateFiles.js <arg1> <arg2>
OR
$updateFiles.cmd <fileName1>

in registry
$"updateFiles.cmd" "%1"
-> (inside updateFiles.cmd) Node, no quotes around `%1`
node updateFiles.js %1