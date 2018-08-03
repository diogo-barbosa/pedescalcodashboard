var currentPage;
$(document).ready(function(){

    currentPage = "home";
    $('.content-area').html(getContent(currentPage));
    updateTable();

    //----DEBUG----
    
    //-------------

    //----GLOBAL----
    $('.nav-button').click(function(){
        $('.active').removeClass('active');
        $(this).addClass('active');
        currentPage = $(this).attr('id');
        $('.content-area').html(getContent(currentPage));
        if(currentPage == "home") {
            updateTable();
        } else if(currentPage == "register"){
            currentPage = "register";
            $('.date-input').val(getDate());
            $('.time-input').val(getTime());
            updateTickets();
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

    //----REGISTER----
    $('.manually').change(function(){
        $('.price').attr("readonly", !this.checked);
    });

    $('.color').change(function(){updateTickets();});
    $('.ticket').change(function(){updatePrice();});

    //----------------
});

var getContent = function(id){
    switch(id){
        case "home":
            return homeSection;
            break;
        case "register":
            return register;
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

function getDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function getTime() {
    var d = new Date(),
        hour = '' + d.getHours(),
        min = '' + d.getMinutes();

    if (hour.length < 2) hour = '0' + hour;
    if (min.length < 2) min = '0' + min;

    return [hour, min].join(':');
}

function updatePrice(){
    if(currentPage == "register"){
        if(!$('.manually').checked){
            var price;
            switch($('.ticket').val()){
                case "0":
                    price = 5;
                    break;
                case "1":
                    price = 10;
                    break;
                case "2":
                    price = 15;
                    break;
                case "3":
                    price = 15;
                    break;
                case "4":
                    price = 20;
                    break;
                case "5":
                    price = 36;
                    break;
                case "6":
                    price = 0;
                    break;
            }
            $('.price').val(price);
        }
    }
}

function updateTickets(){
    if(currentPage == "register"){
        var dom;
        switch($('.color').val()){
            case "blue":
                dom = blueTickets;
                break;
            case "red":
                dom = redTickets;
                break;
            case "black":
                dom = blackTickets;
                break;
        }
        $('.ticket').html(dom);
        updatePrice();
    }
}