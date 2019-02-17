const http = require('http');
const fs = require('fs');

// console.log('url', url);
//const indexRoute = require('./public/index');

const server = http.createServer(function(req,res){
    const { url } = req;
    // console.log(url);
    
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
            console.log(data.toString());
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

});


server.listen(8080, () => {
    console.log(`Server Running`);
});
