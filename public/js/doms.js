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
        <h6>Data para visualização</h6>
        <span class="when">
            Desde Sempre
        </span>
        <input type="date" name="datepicker" id="datepicker">
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
    <th>Cor Identificadora</th>
    <th>Número de Pessoas</th>
    <th>Preço Total</th>
    <th>Data</th>
</thead>
<tbody class="table-body">
    
</tbody>
</table>`;

var tableRows = `<tr>
<td style="background: red"></td>
<td>4</td>
<td>25€</td>
<td>02/08/2018</td>
</tr>`;