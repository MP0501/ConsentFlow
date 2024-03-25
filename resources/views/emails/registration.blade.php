<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Willkommen bei ConsentFlow</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #151d48;
            margin-top: 0;
        }
        .logo {
            display: block;
            margin: 0 auto;
            max-width: 200px;
            height: auto;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #151d48;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ccc;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
        .footer a {
            color: #151d48;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Willkommen bei ConsentFlow, {{ $user->user_info->first()->first_name }}!</h1>
        <p>Vielen Dank für deine Registrierung bei ConsentFlow, der einfachen Lösung für Cookie-Banner und Consent Management.</p>
        <p>Mit ConsentFlow kannst du:</p>
        <ul>
            <li>Cookie-Banner erstellen und anpassen</li>
            <li>Die Zustimmung verwalten</li>
            <li>Deine Website konform mit den Datenschutzbestimmungen machen</li>
        </ul>

        <p>Wenn du Fragen oder Anregungen hast, zögere nicht, uns zu kontaktieren.</p>
        <p>Dein ConsentFlow-Team</p>
        
        <div class="footer">
            <span>Copyright © ConsentFlow 2024 | 
                <a href="https://consentflow.de/Impressum">Impressum</a> | 
                <a href="https://consentflow.de/Datenschutzerklärung">Datenschutzerklärung</a>
            </span>
        </div>
    </div>
</body>
</html>