var homeSection = `<div class="heading">
<h1>Painel Principal</h1>
<p>Bem-vindo à administração do Pé Descalço Eco-Parque</p>
</div>

<div class="row cards">
<div class="col-md-4">
    <div class="card image-card">
        <img class="card-img-top" src="../images/logo-01.jpg">
        <span class="comp-name">Pé Descalço</span>
        <span class="comp-title">Eco-Parque</span>
        <hr>
        <div class="row">
            <div class="col-md-6">
                <span class="location">Localização</span>
            </div>
            <div class="col-md-6">
                <span class="location-text">Freixo, PTL</span>
            </div>
        </div>
    </div>
</div>

<div class="col-md-4">
    <div class="card simple-card">
        <h6>Opções de visualização</h6>
        <span class="when">
            Desde Sempre - Bilhetes
        </span>
        <input type="date" name="datepicker" id="datepicker">
        <select class="form-control view-type" style="margin-top: 15px">
            <option selected value="Bilhetes">Bilhetes</option>
            <option value="Bar">Bar</option>
        </select>
        <button type="button" class="btn btn-success" id="confirm-when">Confirmar</button>
    </div>
</div>

<div class="col-md-4">
    <div class="card simple-card">

    </div>
</div>

</div>

<table class="table">
<thead class="thead-dark">
    
</thead>
<tbody class="table-body">
    
</tbody>
</table>`;

var register = `<div class="heading">
<h1>Bilheteira</h1>
<p>Aqui é feito o registo das entradas no parque.</p>
</div>

<form class="ticket-form">
<div class="form-group">
    <label for="color">Cor Identificadora</label>
    <select name="color" id="color" class="form-control color">
        <option selected style="background: blue; color: blue;" value="blue">Azul</option>
        <option style="background: red; color: red;" value="red">Vermelho</option>
        <option style="background: black; color: black;" value="black">Preto</option>
    </select>
</div>
<div class="form-group">
        <label for="ticket">Bilhete</label>
        <select name="ticket" id="ticket" class="form-control ticket">
            
        </select>
</div>
<div class="form-row">
    <div class="form-group col-md-9">
        <label for="price">Preço</label>
        <input name="price" type="number" readonly value="5" required class="form-control price">
    </div>
    <div class="form-group col-md-3">
        <label for="manual">Definir Manualmente</label>
        <input type="checkbox" class="form-control manually">
    </div>
</div>

<div class="form-group">
    <label for="date">Data de Registo</label>
    <input name="date" required type="date" class="form-control date-input">
</div>
<div class="form-group">
    <label for="time">Hora de Registo</label>
    <input name="time" required type="time" class="form-control time-input">
</div>
<button type="submit" class="btn btn-primary register-button">Registar</button>
</form>`;

var barSection = `<div class="heading">
<h1>Bar</h1>
<p>Aqui é feito o registo das vendas do bar.</p>
</div>

<form class="ticket-form">
<div class="form-group">
    <label for="item">Item</label>
    <select id="item" class="form-control item">
        <option selected value="0">Tábua Sensações 1</option>
        <option value="1">Tábua Sensações 2</option>
        <option value="2">Vinho</option>
        <option value="3">Sumo</option>
        <option value="4">Café</option>
        <option value="5">Água 1,5l</option>
        <option value="6">Água 33cl</option>
    </select>
</div>
<div class="form-group">
    <label for="quantity">Quantidade</label>
    <input type="number" name="quantity" required value="1" autocomplete="off" class="form-control quantity">
</div>
<div class="form-row">
    <div class="form-group col-md-9">
        <label for="price">Preço</label>
        <input type="number" name="price" readonly value="12" required class="form-control price">
    </div>
    <div class="form-group col-md-3">
        <label for="manual">Definir Manualmente</label>
        <input type="checkbox" class="form-control manually">
    </div>
</div>

<div class="form-group">
    <label for="date">Data de Registo</label>
    <input required type="date" name="date" class="form-control date-input">
</div>
<div class="form-group">
    <label for="time">Hora de Registo</label>
    <input required type="time" name="time" class="form-control time-input">
</div>
<button type="submit" class="btn btn-primary register-button">Registar</button>
</form>`;

var tableHeadersTicket = `<th>Cor Identificadora</th>
<th>Bilhete</th>
<th>Preço</th>
<th>Data e Hora</th>`;

var tableHeadersBar = `<th>Item</th>
<th>Quantidade</th>
<th>Preço</th>
<th>Data e Hora</th>`;

var tableRowsTicket = `<tr>
<td <!--style="background: red"--></td>
<td></td>
<td></td>
<td></td>
</tr>`;
var tableRowsBar = ``;

var blueTickets = `<option selected value="0">Individual (1 pessoa)</option>
<option value="1">Duplo (2 pessoas)</option>
<option value="2">Grupo (3 a 4 pessoas)</option>`;

var redTickets = `<option selected value="3">Pack Duplo (2 pessoas)</option>
<option value="4">Pack Familiar (3 a 4 pessoas)</option>
<option value="5">Pack Grupo Grande (Máx. 8 pessoas)</option>`;

var blackTickets = "<option selected value='6'>Bilhete Laranja-Limão</option>";