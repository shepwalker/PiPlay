
///<reference path="jquery-1.10.2.js"/>
var keytrack = new Object();
keytrack["w"] = false;
keytrack["a"] = false;
keytrack["s"] = false;
keytrack["d"] = false;
function changeKey(location, value) {
    if (keytrack[location] != value) {
        keytrack[location] = value;
        $(keytrack).trigger("moveChange");
    }
}
$(function () {
    $('body').keydown(function (event) {
        switch (event.which) {
            //A
            case 65:
                changeKey("a", true);
                break;
                //D
            case 68:
                changeKey("d", true);
                break;
                //S
            case 83:
                changeKey("s", true);
                break;
                //W
            case 87:
                changeKey("w", true);
                break;
            default:
                payload = null;
                break;
        }
    }).keyup(function (event) {
        switch (event.which) {
            //A
            case 65:
                changeKey("a", false);
                break;
                //D
            case 68:
                changeKey("d", false);
                break;
                //S
            case 83:
                changeKey("s", false);
                break;
                //W
            case 87:
                changeKey("w", false);
                break;
            default:
                break;
        }
    });//TODO: Doesn't look like "change" works for simple objects. Try using hidden objects or obj.trigger/obj.triggerhandler  DONE DONE
    $(keytrack).bind("moveChange", function () {
        data = new Object();
        path = '/hitme'
        data["payload"] = keytrack;
        data["user"] = "bleh";
        $.ajax({
            type: "POST",
            url: $SCRIPT_ROOT + path,
            data: JSON.stringify(data, null, '\t'),
            contentType: 'application/json;charset=UTF-8',
            success: function (result) {
                console.log("successful post");
            }
        });
    })
});
