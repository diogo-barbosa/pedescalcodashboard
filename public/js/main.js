var currentPage;

$(document).ready(function(){

    currentPage = "home";
    var viewType = "Bilhetes";
    $('.content-area').html(getContent(currentPage));
    //CHART
    $('#chart').height = $('#chart').parent.height;
    $('#chart').width = $('#chart').parent.width;
    var chart = createChart();
    //----
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
            //----HOME----
            chart = createChart();
            updateTable(viewType);
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



    function createChart(){
        var ctx = document.getElementById("chart").getContext('2d');
        var chart = new Chart(ctx, {
            type: 'doughnut',
            data: []
        });
        return chart;
    }


    function getContent(id){
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
    
    function updateTable(viewType, date){
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
            
            var dataChart = {
                labels: ["Azul", "Vermelho", "Preto"],
                datasets: [
                    {
                        label: "Quantidade",
                        backgroundColor: ["#0000ff", "#ff0000","#000000"],
                        data: []
                    }
                    ]
                };
            var i = 0;
            $.get("/api/get-tickets", function(data, status){
                data.forEach(function(ticket){
                    if(ticket != null && date == null){
                        var thisvalue = dataChart.datasets[0].data[dataChart.labels.indexOf(translateColor(ticket.color))];
                        if(thisvalue != null){
                            dataChart.datasets[0].data[dataChart.labels.indexOf(translateColor(ticket.color))] += 1;
                        } else {
                            dataChart.datasets[0].data[dataChart.labels.indexOf(translateColor(ticket.color))] = 1;
                        }
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
                        var thisvalue = dataChart.datasets[0].data[dataChart.labels.indexOf(translateColor(ticket.color))];
                        if(thisvalue != null){
                            dataChart.datasets[0].data[dataChart.labels.indexOf(translateColor(ticket.color))] = 1;
                        } else {
                            dataChart.datasets[0].data[dataChart.labels.indexOf(translateColor(ticket.color))] += 1;
                        }
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
                chart.data = dataChart;
                chart.update();
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
    function translateColor(color){
        switch(color) {
            case "blue":
                return "Azul";
            case "red":
                return "Vermelho";
            case "black":
                return "Preto";
        }
    }
    function getBar(date) {
        if(currentPage == "home"){
            var bars = "";
            
            var dataChart = {
                labels: ["Tábua Sensações 1", "Tábua Sensações 2", "Vinho", "Sumo", "Café", "Água 1,5l", "Água 33cl"],
                datasets: [
                    {
                      label: "Quantidade",
                      backgroundColor: ["#55efc4", "#00cec9","#ff7675","#e84393","#636e72", "#6c5ce7", "#0984e3"],
                      data: []
                    }
                  ]
                };
            var i = 0;
            $.get("/api/get-bar", function(data, status){
                data.forEach(function(bar){
                    if(bar != null && date == null){
                        var thisvalue = dataChart.datasets[0].data[dataChart.labels.indexOf(bar.item)];
                        if(thisvalue != null){
                            dataChart.datasets[0].data[dataChart.labels.indexOf(bar.item)] = thisvalue + parseInt(bar.quantity);
                        } else {
                            dataChart.datasets[0].data[dataChart.labels.indexOf(bar.item)] = parseInt(bar.quantity);
                        }
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
                        var thisvalue = dataChart.datasets[0].data[dataChart.labels.indexOf(bar.item)];
                        if(thisvalue != null){
                            dataChart.datasets[0].data[dataChart.labels.indexOf(bar.item)] = thisvalue + parseInt(bar.quantity);
                        } else {
                            dataChart.datasets[0].data[dataChart.labels.indexOf(bar.item)] = parseInt(bar.quantity);
                        }
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
                chart.data = dataChart;
                chart.update();
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
});