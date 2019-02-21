const http = require('http');
const fs = require('fs');
const querystring = require('querystring');


const server = http.createServer(function(req,res){
    const { headers, url, method } = req;
    const userAgent = headers['user-agent'];
    // console.log(url);

if(req.method === 'GET'){
   
    if(url === '/css/styles.css'){
        fs.readFile('./public/css/styles.css', (err, data) => {
            if(err) throw err;
            res.write(data.toString());
            res.end();
        })
    }
    else if(url === '/'){
        fs.readFile('./public/index.html', (err, data) => {
            if (err) throw err;
            //console.log(data.toString());
            res.write(data.toString());
            //console.log('data', data.toString().split(' ')[0]);
            // let method = ('data:', data.toString().split(' ')[0]);
            // let address = ('data:', data.toString().split(' ')[1]);
            res.end();
        });
    }
    else if(url === '/helium.html'){
        fs.readFile('./public/helium.html', (err, data) => {
            if (err) throw err;
            res.write(data.toString());
            res.end();
        });
    }
    else if(url === '/hydrogen.html'){
        fs.readFile('./public/hydrogen.html', (err, data) => {
            if (err) throw err;
            res.write(data.toString());
            //console.log('DATATA:', data.toString());
            res.end();
            
        });
    }
    // else if(url === '/elements.html'){
    //     fs.readFile('./public/elements.html', (err, data) => {
    //         if (err) throw err;
    //         res.write(data.toString());
    //         res.end();
    //     });
    // }
    else{
        fs.readFile('./public/404.html', (err, data) => {
            if (err) throw err;
            res.write(data.toString());
            res.end();
        });
    }

}

else if(req.method === 'POST'){
    //console.log(req.url);
    let body = [];
    req.on('error', (err) => {
       console.log('err:', err);
    }).on('data', (chunk) => {
        body.push(chunk);
        console.log('chunk:',chunk)
       
       
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        console.log('body:', body);
        console.log('parsed:', querystring.parse(body));
        const obj = querystring.parse(body);

        const data =          
        
        ` <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <title>The Elements - Boron</title>
        <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
        <h1>${obj.elementName}</h1>
        <h2>${obj.elementSymbol}</h2>
        <h3>${obj.elementAtomicNumber}</h3>
        <p>${obj.elementDescription}</p>
        <p><a href="/">back</a></p>
        </body>
        </html> `
    ;

        // const getElemList = document.getElementById('elementsList');
        // console.log(document)

        fs.writeFile('./public/elements.html', data, function(err, data) {
            if(err) console.log(err);
            console.log('Successfully Written to File.')
        });

        if(url === '/elements.html'){
            fs.readFile('./public/elements.html', (err, data) => {
                if (err) throw err;
                res.write(data.toString());
                res.end();
            });
        }
        
        res.on('error', (err) => {
            console.log(err);
        })

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/x-www-form-urlencoded');

        const responseBody = {headers, method, url, body};

        res.write(data);

        //res.write(JSON.stringify(responseBody));
        res.end();
    })
}
});

server.listen(8080, () => {
    console.log(`Server Running`);
});

