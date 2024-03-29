const nodemailer = require('nodemailer');

// Configuración del transporter para el servicio de Gmail
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'halcorporation40@gmail.com', // Tu dirección de correo electrónico de Gmail
        pass: 'p o i w z a s u a j m z a m k h' // Tu contraseña de Gmail o token de aplicación si usas autenticación de dos factores
    }
});

// Detalles del correo electrónico
let mailOptions = {
    from: 'halcorporation40@gmail.com', // Remitente
    to: 'ramirezortegajonathanalexander@gmail.com', // Destinatario
    subject: 'Prueba de correo electrónico desde Node.js', // Asunto
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Correo de prueba</title>
    </head>
    <body>
        <div style="background-color: #f0f0f0; padding: 20px;">
            <h2 style="color: #333;">¡Hola!</h2>
            <p style="color: red;">Este es un correo electrónico de prueba enviado desde Node.js utilizando <strong>nodemailer</strong>.</p>
            <p style="color: #666;">¡Espero que te encuentres bien!</p>
            <p style="color: #666;">Saludos,<br>Tu Nombre</p>
        </div>
    </body>
    </html>
    `// Cuerpo del correo
};

// Enviar el correo electrónico
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.error('Error al enviar el correo:', error);
    } else {
        console.log('Correo enviado con éxito:', info.response);
    }
});
