// Put all onload AJAX calls here, and event listeners
$(document).ready(function() {

    // On page-load AJAX Example

    $.ajax({

        type: 'get',            //Request type
        dataType: 'json',       //Data type - we will use JSON for almost everything
        url: '/someendpoint',   //The server endpoint we are connecting to
        success: function (data) {

      //  $('comment').val('file from uploads was loaded');

        $('#comment').val(data+'was loaded');
        //$('#refresh').click();
          $("#filelog tr:not(:first)").empty();

            for(var i=0;i<data.length;i++){

              if(i%3==0)
              $('#filelog').append('<tr><th ><a href="/uploads/'+JSON.parse(data[i+1]).file+'">'+JSON.parse(data[i+1]).file+
              '</th><th>'+JSON.parse(data[i]).values+
              '</th><th>'+JSON.parse(data[i+2]).num+'</th></tr>');

            }


            $('#blah').html("On page load, Received string '"+a.values+"' from server");
            //We write the object to the console to show that the request was successful
            console.log(JSON.stringify(data));
            //$('#refresh').click();
        },
        fail: function(error) {
            // Non-200 return, do something with error
            console.log(error);
        }
    });

    $.ajax({
        type: 'post',            //Request type
        dataType: 'json',       //Data type - we will use JSON for almost everything
        url: '/open',   //The server endpoint we are connecting to
        success: function (data) {
          alert("aaaa");
        },
        fail: function(error) {
          // Non-200 return, do something with error
        console.log(error);
        }
    });
    $.ajax({
        type: 'get',            //Request type
        dataType: 'json',       //Data type - we will use JSON for almost everything
        url: '/someendpoint1',   //The server endpoint we are connecting to
        success: function (data) {
          //alert(data);
          for(var i=0;i<data.length;i++){
            $('#viewer').append('<tr><th>'+i+'</th><th>'+JSON.parse(data[i]).name+'</th><th>'+JSON.parse(data[i]).values+'</th></tr>');
          }
        },
        fail: function(error) {
          // Non-200 return, do something with error
        console.log(error);
        }
    });

    $.ajax({
        type: 'get',            //Request type
        dataType: 'json',       //Data type - we will use JSON for almost everything
        url: '/uploads/',   //The server endpoint we are connecting to
        success: function (data) {
          console.log(data);

        },
        fail: function(error) {
          // Non-200 return, do something with error
        console.log(error);
        }
        //window.location.reload();
    });
    // Event listener form replacement example, building a Single-Page-App, no redirects if possible
    $('#someform').submit(function(e){
        $('#blah').html("Callback from the form");
        e.preventDefault();
        //Pass data to the Ajax call, so it gets passed to the
        $.ajax({});
    });

    $('#submitForm').submit(function(){
        //Pass data to the Ajax call, so it gets passed to the
        $('#uploadModal').modal('hide'); //or  $('#IDModal').modal('hide');
        return false;
    });
    $('#uploadForm').submit(function(){
      alert("aaaa");
      $('#comment').val('file was uploaded');
      //window.location.reload();
      $('#refresh').click();

    })
    $('#openForm').submit(function(event){
      $('#comment').html("\nthe file was opened and contents are on Card view Panel");
      window.location.reload();
    })

    $('#refresh').click(function(){
      //alert("aaaa");
      window.location.reload();
    })
    $('#clear').click(function(){
      $('#comment').val('');
      //alert("aaa");
      //window.location.reload();

    })
});
