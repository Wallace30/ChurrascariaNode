import 'dotenv/config';
import express from "express";
import conectarAoBanco from './src/config/dbConfig.js';
import ChurrascariaRoutes from './src/routes/ChurrascariaRoutes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); 
app.set("views", "./src/views"); 
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;

if (!process.env.STRING_CONEXAO) {
    console.error("Erro: STRING_CONEXAO não está definida no arquivo .env.");
    process.exit(1); 
}

async function iniciarServidor() {

    try{
        const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
        app.locals.conexao = conexao;

        // Rotas
        app.use('',ChurrascariaRoutes);
        // Servidor
        app.listen(PORT,()=>{
            console.log(`Servidor executando na porta ${PORT}`);
        });
    }
    catch(erro){
        console.error('Erro ao iniciar o servidor:',erro);
        process.exit(1);
    }
}

iniciarServidor();
