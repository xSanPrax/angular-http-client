const express = require('express');
const app = express();
var colId=[];
const _ =require('underscore');

function validarEmail(valor) {

    emailRegex =  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}.){1,125}[A-Z]{2,63}$/i;
    if (emailRegex.test(valor)) {
      return true;
    } else {
      return false;
    }
  }

app.use(express.json());

const Cmesagge = [
    {
        nombre_persona: "santiago",
        email: "santiago@gmail.com",
        id: 1,
        ultimo_acesso: '19-05-09',
        ultimo_accedidos: {nombre: "pepe", miga_de_pan: "pepito", fecha_hora: '16-12-06'},
        favoritos: {nombre: "pepe", miga_de_pan: "pepito jr"}
    },
    {
        nombre_persona: "maria",
    
        email: "maria@gmail.com",
        id: 2,
        ultimo_acesso: '19-05-08',
        ultimo_accedidos: {nombre: "pepita", miga_de_pan: "pepita js", fecha_hora: '16-12-05'},
        favoritos: {nombre: "pepita", miga_de_pan: "pepita jr"}
    },
];

app.get('/', (req, res)=>{
    res.send('Node JS api');
})

app.get('/persona/menu', (req, res)=>{
    res.send(Cmesagge);
})




app.get('/persona/:id/menu', (req, res)=>{
const id = req.params.id;
  // console.log( 'Test1' + req.params);
        res.send(Cmesagge[id-1]);
})

app.post('/persona/menu', (req, res)=>{    

        if (colId.includes(req.body.id)){
           return res.status(400).send('Ya existe ese id');
        }else{
            if(!validarEmail(req.body.email.trim(req.body.email))){return res.status(400).send('no es un formato para email');}
            else{ colId.push(req.body.id)
                const mesagge = {
                        nombre_persona: req.body.nombre_persona.trim(req.body.nombre_persona),
                        email: req.body.email.trim(req.body.email), 
                        id: req.body.id,
                        ultimo_acesso: req.body.ultimo_acesso,//pasarlo como formato date
                        ultimo_accedidos: {nombre: req.body.ultimo_accedidos.nombre.trim(req.body.ultimo_accedidos.nombre), miga_de_pan: req.body.ultimo_accedidos.miga_de_pan.trim(req.body.ultimo_accedidos.miga_de_pan), fecha_hora: req.body.ultimo_accedidos.fecha_hora},
                        favoritos: {nombre: req.body.ultimo_accedidos.nombre.trim(req.body.ultimo_accedidos.nombre), miga_de_pan: req.body.ultimo_accedidos.miga_de_pan.trim(req.body.ultimo_accedidos.miga_de_pan)},
                    };
                res.send(mesagge);
                Cmesagge.push(mesagge);}    
    } 
    res.send(Cmesagge);
});

const port = process.env.port || 80;
app.listen(port, ()=>console.log(`escuchando en ${port}...`));


