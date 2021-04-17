$( "#quantitybtn" ).click(function() {
	$('#qty').val();
	$("#listqty").text($('#qty').val());
	$('#listqty').data($('#qty').val());
});

$( "#pricebtn" ).click(function() {
	$("#listbid").text(currency($('#amt').val()).format());
	$('#listbid').data("raw",currency($('#amt').val()));
	$("#listsub").text(currency($('#amt').val() * $('#qty').val()).format());
		$("#listsub").data("raw",currency($('#amt').val() * $('#qty').val()).format());
	$("#listfee").text(currency($('#amt').val()).multiply($('#qty').val()).multiply(.07).format());
	$("#listfee").data("raw",currency($('#amt').val()).multiply($('#qty').val()).multiply(.07));
	$("#listtotal").text(currency($('#listfee').data("raw")).add($('#listsub').data("raw")).format());
});