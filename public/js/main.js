var currentPage;
$(document).ready(function(){

    currentPage = "home";
    $('.content-area').html(getContent(currentPage));
    updateTable();

    //----GLOBAL----
    $('.nav-button').click(function(){
        $('.active').removeClass('active');
        $(this).addClass('active');
        currentPage = $(this).attr('id');
        $('.content-area').html(getContent(currentPage));
        if(currentPage == "home") {
            updateTable();
        }
    });
    //--------------

    //----HOME----
    $('#confirm-when').click(function(){
        if(currentPage == "home"){
            if($('#datepicker').val() == ""){
                $('.when').text("Desde Sempre");
            } else {
                $('.when').text($('#datepicker').val());
            }
            updateTable();
        }
    });
    //------------
});

var getContent = function(id){
    switch(id){
        case "home":
            return homeSection;
            break;
        default:
            return "Not implemented yet"; 
    }
}

var updateTable = function(){
    //getTableContent();
    if(currentPage == "home"){
        $('.table-body').html(tableRows);
    }
}