const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');
//console.log('fs',fs)

// console.log('url', url);
//const indexRoute = require('./public/index');

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
            res.end();
        });
    }
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
        console.log('parsed:', parse(body));

        res.on('error', (err) => {
            console.log(err);
        })

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/x-www-form-urlencoded');

        const responseBody = {headers, method, url, body};

        res.write('hearing');

        //res.write(JSON.stringify(responseBody));
        res.end();
    })
}
});

server.listen(8080, () => {
    console.log(`Server Running`);
});

var f = 'sometextfile.txt';

writeTextFile(f, 'spoon');
writeTextFile(f, 'cheese monkey')

function writeTextFile(afilename, output){
    var txtFile = new File (afilename);
    txtFile.writeln(output);
    txtFile.close();
}