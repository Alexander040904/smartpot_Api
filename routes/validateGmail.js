const express = require("express");
const router = express.Router();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors()); // Esto permitirá todas las solicitudes CORS
const uri = "mongodb+srv://halcorporation40:151081halco@smarpot.iddzpk2.mongodb.net/?retryWrites=true&w=majority&appName=smarpot";
//const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

function numRamdom (){
  const numero = Math.floor(1000 + Math.random() * 9000);
  const cadena = numero.toString();
  return cadena;
}

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Conexión exitosa a la base de datos");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
}

async function validateUser(data) {
    const database = client.db("smarpot").collection("usuarios");
    const cursor = database.find({ gmail: data.gmail });
    const documentos = await cursor.toArray();
    return documentos.length ;
}

async function enviarGmail(data) {
    let numero = await numRamdom();
    const equalUsers = await validateUser(data);
    if (!equalUsers) {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'halcorporation40@gmail.com',
            pass: 'p o i w z a s u a j m z a m k h' 
        }
    });
    
    
    let mailOptions = {
        from: 'halcorporation40@gmail.com', // Remitente
        to: `${data.gmail}`, // Destinatario
        subject: 'Codigo de verificacion', // Asunto
        html: `<!DOCTYPE html>
    
        <html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
        <head>
        <title></title>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
        <meta content="width=device-width, initial-scale=1.0" name="viewport"/><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
        <style>
                * {
                    box-sizing: border-box;
                }
        
                body {
                    margin: 0;
                    padding: 0;
                }
        
                a[x-apple-data-detectors] {
                    color: inherit !important;
                    text-decoration: inherit !important;
                }
        
                #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                }
        
                p {
                    line-height: inherit
                }
        
                .desktop_hide,
                .desktop_hide table {
                    mso-hide: all;
                    display: none;
                    max-height: 0px;
                    overflow: hidden;
                }
        
                .image_block img+div {
                    display: none;
                }
        
                @media (max-width:620px) {
                    .mobile_hide {
                        display: none;
                    }
        
                    .row-content {
                        width: 100% !important;
                    }
        
                    .stack .column {
                        width: 100%;
                        display: block;
                    }
        
                    .mobile_hide {
                        min-height: 0;
                        max-height: 0;
                        max-width: 0;
                        overflow: hidden;
                        font-size: 0px;
                    }
        
                    .desktop_hide,
                    .desktop_hide table {
                        display: table !important;
                        max-height: none !important;
                    }
                }
            </style><!--[if true]><style>.forceBgColor{background-color: white !important}</style><![endif]-->
        </head>
        <body class="forceBgColor" style="background-color: transparent; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: transparent; background-image: none; background-position: top left; background-size: auto; background-repeat: no-repeat;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="image_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
        <div align="left" class="alignment" style="line-height:10px">
        <div style="max-width: 240px;"><div class="ver-img">
            <a href="https://drive.google.com/thumbnail?id=1tXVwiKh6CtU-B_bQQTscHtqN1cT7fX9n">
              <img src="https://drive.google.com/thumbnail?id=1tXVwiKh6CtU-B_bQQTscHtqN1cT7fX9n" style="display: block; height: auto; border: 0; width: 100%;" width="240"/></a>
          </div>
        </div>
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;text-align:center;width:100%;">
        <h3 style="margin: 0; color: #0d0d0d; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 28.799999999999997px;"><span class="tinyMce-placeholder">Hola, ${data.name}</span></h3>
        </td>
        </tr>
        </table>
        <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:10px;padding-left:25px;padding-right:10px;padding-top:10px;">
        <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:15px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:18px;">
        <p style="margin: 0;">Este es su código para verificar tu cuenta en Smartpot:</p>
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #76885b;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 2px; color: #000000; width: 600px; margin: 0 auto;" width="600">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 15px; padding-right: 10px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="10" cellspacing="0" class="heading_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tr>
        <td class="pad">
        <h2 style="margin: 0; color: #ffffff; direction: ltr; font-family: Arial, Helvetica, sans-serif; font-size: 30px; font-weight: 700; letter-spacing: normal; line-height: 180%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 54px;"><span class="tinyMce-placeholder">${numero}</span></h2>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
        <tbody>
        <tr>
        <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 2px; color: #000000; width: 600px; margin: 0 auto;" width="600">
        <tbody>
        <tr>
        <td class="column column-1" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-left: 15px; padding-right: 10px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;" width="100%">
        <table border="0" cellpadding="0" cellspacing="0" class="paragraph_block block-1" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;" width="100%">
        <tr>
        <td class="pad" style="padding-bottom:10px;padding-left:20px;padding-right:10px;padding-top:10px;">
        <div style="color:#101112;direction:ltr;font-family:Arial, Helvetica, sans-serif;font-size:10px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:12px;">
        <p style="margin: 0;">Info extra.</p>
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table>
        </td>
        </tr>
        </tbody>
        </table><!-- End -->
        </body>
        </html>
        `// Cuerpo del correo
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.error('Error al enviar el correo:', error);
          reject(error); // Rechazar la promesa en caso de error
        } else {
          console.log(`Este es  el numero ${numero}`);
          resolve(numero); // Resolver la promesa con el valor de numero
        }
      });
    });
  } else {
    console.log("Gmail existe");
    return "El gmail existe";
  }
    
}

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const control = await enviarGmail(data);
    console.log(`este nuemro papa ${control}`);
    res.send(control);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error interno del servidor");
  }
});

connectToDatabase().catch(console.error);

process.on('SIGINT', async () => {
  await client.close();
  process.exit();
});

module.exports = router;