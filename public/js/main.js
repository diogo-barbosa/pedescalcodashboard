var currentPage;
$(document).ready(function(){

    currentPage = "home";
    var viewType = "Bilhetes";
    $('.content-area').html(getContent(currentPage));
    updateTable(viewType);

    //----DEBUG----
    //-------------

    //----GLOBAL----
    $('.nav-button').click(function(){
        $('.active').removeClass('active');
        $(this).addClass('active');
        currentPage = $(this).attr('id');
        $('.content-area').html(getContent(currentPage));
        if(currentPage == "home") {
            updateTable(viewType);
        } else if(currentPage == "register"){
                //----REGISTER----
            $('.date-input').val(getDate());
            $('.time-input').val(getTime());
            $('.color').change(function(){updateTickets();});
            $('.ticket').change(function(){updatePrice();});
            $('.manually').change(function(){
                $('.price').attr("readonly", !this.checked);
            });
            updateTickets();
                //----------------
        } else if(currentPage == "bar"){
                //----BAR----
            $('.date-input').val(getDate());
            $('.time-input').val(getTime());
            $('.item').change(function(){$('.quantity').val("1"); updatePriceBar();});
            $('.quantity').change(function(){updatePriceBar();});
            $('.manually').change(function(){
                $('.price').attr("readonly", !this.checked);
            });
                //-----------
        }
    });
    //--------------

    //----HOME----
    $('#confirm-when').click(function(){
        if(currentPage == "home"){
            if($('#datepicker').val() == ""){
                $('.when').text("Desde Sempre - " + viewType);
                updateTable(viewType);
            } else {
                var splitted = $('#datepicker').val().split('-');
                var datestring = splitted[2] + "-" + splitted[1] + "-" + splitted[0];
                $('.when').text(datestring + " - " + viewType);
                updateTable(viewType, datestring);
            }
        }
    });
    $('.view-type').change(function(){
        viewType = $('.view-type').val();
    });
    //------------

});

var getContent = function(id){
    switch(id){
        case "home":
            return homeSection;
            break;
        case "register":
            return register;
            break;
        case "bar":
            return barSection;
            break;
        default:
            return "Not implemented yet"; 
    }
}

var updateTable = function(viewType, date){
    if(currentPage == "home"){
        if(viewType == "Bilhetes"){
            $('.thead-dark').html(tableHeadersTicket);
            if(date != null){
                getTickets(date);
            } else {
                getTickets();
            }
        } else {
            $('.thead-dark').html(tableHeadersBar);
            if(date != null){
                getBar(date);
            } else {
                getBar();
            }
        }
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

function updatePriceBar(){
    if(currentPage == "bar"){
        if(!$('.manually').checked){
            var price;
            var quantity = $('.quantity').val();
            switch($('.item').val()){
                case "0":
                    price = 12*quantity;
                    break;
                case "1":
                    price = 12*quantity;
                    break;
                case "2":
                    price = 10*quantity;
                    break;
                case "3":
                    price = 1*quantity;
                    break;
                case "4":
                    price = 1*quantity;
                    break;
                case "5":
                    price = 1*quantity;
                    break;
                case "6":
                    price = 0.5*quantity;
                    break;
            }
            $('.price').val(price);
        }
    }
}

function getTickets(date){
    if(currentPage == "home"){
        var tickets = "";
        var i = 0;
        $.get("/api/get-tickets", function(data, status){
            data.forEach(function(ticket){
                if(ticket != null && date == null){
                    var ticketDom = `<tr>
                        <td style="background: `+ticket.color+`"></td>
                        <td>`+ticket.ticket+`</td>
                        <td>`+ticket.price+`</td>
                        <td>`+ticket.datetime+`</td>
                        <td><button type="button" class="btn btn-default delete-ticket" id="`+i+`"><i class="fas fa-trash-alt"></i></button></td>
                    </tr>`
                    tickets = ticketDom + tickets;
                    i++;
                } else if(ticket != null && date != null && ticket.datetime.startsWith(date)) {
                    var ticketDom = `<tr>
                        <td style="background: `+ticket.color+`"></td>
                        <td>`+ticket.ticket+`</td>
                        <td>`+ticket.price+`</td>
                        <td>`+ticket.datetime+`</td>
                        <td><button type="button" class="btn btn-default delete-ticket" id="`+i+`"><i class="fas fa-trash-alt"></i></button></td>
                    </tr>`
                    tickets = ticketDom + tickets;
                    i++;
                } else {
                    i++;
                }
            });
            $('.table-body').html(tickets);
            $('.delete-ticket').click(function(){
                const id = this.id;
                $.post("/api/delete-tickets",
                {
                    index: id,
                });
                getTickets();
            });
        })
    }
}

function getBar(date) {
    console.log("GETBAR");
    if(currentPage == "home"){
        var bars = "";
        var i = 0;
        $.get("/api/get-bar", function(data, status){
            data.forEach(function(bar){
                if(bar != null && date == null){
                    var barDom = `<tr>
                        <td>`+bar.item+`</td>
                        <td>`+bar.quantity+`</td>
                        <td>`+bar.price+`</td>
                        <td>`+bar.datetime+`</td>
                        <td><button type="button" class="btn btn-default delete-bar" id="`+i+`"><i class="fas fa-trash-alt"></i></button></td>
                    </tr>`
                    bars = barDom + bars;
                    i++;
                } else if(bar != null && date != null && bar.datetime.startsWith(date)){
                    console.log(date);
                    console.log(bar.datetime);
                    var barDom = `<tr>
                        <td>`+bar.item+`</td>
                        <td>`+bar.quantity+`</td>
                        <td>`+bar.price+`</td>
                        <td>`+bar.datetime+`</td>
                        <td><button type="button" class="btn btn-default delete-bar" id="`+i+`"><i class="fas fa-trash-alt"></i></button></td>
                    </tr>`
                    bars = barDom + bars;
                    i++;
                } else {
                    i++;
                }
            });
            $('.table-body').html(bars);
            $('.delete-bar').click(function(){
                const id = this.id;
                $.post("/api/delete-bar",
                {
                    index: id,
                });
                getBar();
            });
        })
    }
}