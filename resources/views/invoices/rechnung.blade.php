<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <title>ConsentFlow Rechnung</title>
    <style>
        body {
            font-family: 'Open Sans', 'Arial', sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .container {
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .header h2 {
            margin: 0;
            color: #2b3b4d;
        }
        .header-top {
            margin-bottom: 0;
            justify-content: flex-end;
            text-align: right;
            font-size: 0.85em;
        }
        .content, .footer {
            text-align: left;
            margin-top: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background-color: #f9f9f9;
        }
        .text-right {
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>ConsentFlow Rechnung</h2>
        </div>

        <div class="header-top">
            ConsentFlow<br>
            Stuttgarter Str. 106<br>
            70736 Fellbach<br>
            Deutschland
        </div>

        <div class="content">
            <strong>Rechnungsnummer:</strong> {{ $invoice_number }}<br>
            <strong>Rechnungsdatum:</strong> {{ date('d.m.Y') }}<br>
            <strong>Fälligkeitsdatum:</strong> <?php echo date('d.m.Y', strtotime('+7 days')); ?><br>
            <br>
            <strong>Rechnung an:</strong><br>
            {{ $company_name }}<br>
            {{ $first_name }} {{ $last_name }}<br>
            {{ $address }}<br>
            {{ $city }}<br>
            {{ $country }}<br>
            <br>
            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Beschreibung</th>
                        <th>Menge</th>
                        <th>Einzelpreis</th>
                        <th>Gesamtpreis</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Beispielposition -->
                    <tr>
                        <td>1</td>
                        <td>Anzahl der gesetzten Consents</td>
                        <td>{{ $consent_count }}</td>
                        <td>€{{ number_format($unit_price, 2, ',', '.') }}</td>
                        <td>€{{ number_format($total_price, 2, ',', '.') }}</td>
                    </tr>
                    <!-- Summe -->
                    <tr>
                        <th colspan="4" class="text-right">Nettobetrag:</th>
                        <td>€{{ number_format($net_amount, 2, ',', '.') }}</td>
                    </tr>
                    <tr>
                        <th colspan="4" class="text-right">USt. 19%:</th>
                        <td>€{{ number_format($tax_amount, 2, ',', '.') }}</td>
                    </tr>
                    <tr>
                        <th colspan="4" class="text-right">Gesamtbetrag:</th>
                        <td><strong>€{{ number_format($gross_amount, 2, ',', '.') }}</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="footer">
            <p><strong>Zahlungsbedingungen:</strong> Bitte begleichen Sie diesen Betrag innerhalb von 14 Tagen ohne Abzug.</p>
            <p>Vielen Dank für Ihr Vertrauen.</p>
        </div>
    </div>
</body>
</html>
