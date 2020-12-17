// main page view buttons
$('#AdminEventsButton').on('click', function (e) {
    $('#pageAdminParticipants').addClass("d-none");
    $('#pageAdminEvents').removeClass("d-none");
})
$('#AdminParticipantsButton').on('click', function (e) {
    $('#pageAdminEvents').addClass("d-none");
    $('#pageAdminParticipants').removeClass("d-none");
})
$('#loginConnectWalletButton').on('click', function (e) {
    $('#pageLogin').addClass("d-none");
    $('#pageAdminEvents').removeClass("d-none");
})

// checkbox togglers
$("#checkEvent").click(function(){
        $("input[class=eventCheck]").prop('checked', $(this).prop('checked'));
});
$("#checkAllParticipants").click(function(){
        $("input[class=participantCheck]").prop('checked', $(this).prop('checked'));
});



// fill event list - does not work due to cross origin restrictions. left here for education
function fillEventList() {
var eventlist = ["VIVO_2020",
"VIVO_2019",
"VIVO_2018",
"VIVO_2017"]
for (i = 0, len = eventlist.length, text = ""; i < len; i++) {
  $.getJSON( "https://www.openresearch.org/mediawiki/api.php?action=browsebysubject&subject="+eventlist[i]+"&format=json",
  function( data ) {
  var items = {};
  $.each( data["query"]["data"], function( key, val ) {
    items[data["query"]["data"][key]["property"]]=data["query"]["data"][key]["dataitem"][0]["item"];
  });
  alert(items);
});
}
}
