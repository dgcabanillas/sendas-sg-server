export const resetPassword = ( context ) => {

    const { nombre, apellido, link } = context;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600&display=swap" rel="stylesheet">
        <style>
            .__sg__root {
                width: 500px;
                background: white;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                border-radius: 5px;
                overflow: hidden;
            }
            .__sg__root *, .__sg__root *::after, .__sg__root *::before {
                box-sizing: inherit;
                -moz-box-sizing: inherit;
                -webkit-box-sizing: inherit;
                font-family: 'Roboto', sans-serif;
            }
            .__sg__title {
                display: flex;
                align-items: center;
                justify-content: center;
                background: #2f65cb;
                padding: 10px;
            }
            .__sg__title h1 {
                font-size: 24px;
                font-weight: 600;
                color: white;
                margin: 10px auto;
            }
            .__sg__content {
                padding: 20px;
                border: 1px solid #a0a0a0;
                border-radius: 0 0 5px 5px;
            }
            .__sg__content h2 {
                font-size: 16px;
                font-weight: 500;
            }
            .__sg__content p {
                font-size: 14px;
                line-height: 20px;
                font-weight: 400;
            }
            .__sg__content a {
                display: block;
                width: 260px;
                margin: 5px auto;
                padding: 10px 40px;
                text-align: center;
                background: #2f65cb;
                color: white;
                text-decoration: none;
                font-weight: 500;
                font-size: 14px;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="__sg__root">
            <div class="__sg__title"> 
                <h1> Recuperación de la cuenta </h1>     
            </div>
            <div class="__sg__content">
                <h2> Hola ${ nombre } ${ apellido }, </h2>
                <p> Parece que has olvidado tu contraseña, por favor da click en el botón para reestablecerla </p>
                <a href="${ link }" target="_blank"> RECUPERAR CUENTA </a>
                <p> Si no has olvidado tu contraseña por favor ignora este mensaje </p>
            </div>
        </div>
    </body>
    </html>
    `;
}