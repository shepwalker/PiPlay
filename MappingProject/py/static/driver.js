///<reference path="jquery-1.10.2.js"/>
///<reference path="http:////cdnjs.cloudflare.com/ajax/libs/socket.io/0.9.16/socket.io.min.js/>
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

function pickKey(which, value) {
    switch (which) {
        //A
        case 65:
            changeKey("a", value);
            break;
            //D
        case 68:
            changeKey("d", value);
            break;
            //S
        case 83:
            changeKey("s", value);
            break;
            //W
        case 87:
            changeKey("w", value);
            break;
        default:
            payload = null;
            break;
    }
}


$(function () {
    var socket = io.connect($SCRIPT_ROOT + "/hitmesock"); 




    $('body').keydown(function (event) {
        pickKey(event.which, true);
    }).keyup(function (event) {
        pickKey(event.which, false);
    });//TODO: Doesn't look like "change" works for simple objects. Try using hidden objects or obj.trigger/obj.triggerhandler  DONE DONE
  /*$(keytrack).bind("moveChange", function () {
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
    });*/
    $(keytrack).bind("moveChange", function () {
        socket.emit('changemove', { payload: keytrack });
    });
});
