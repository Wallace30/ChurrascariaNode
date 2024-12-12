import { MongoClient } from "mongodb";

export default async function conectarAoBanco(stringConexao) {
    try {
        const client = new MongoClient(stringConexao);
        console.log('Conectando o cluster ao banco de dados...');
        await client.connect();
        console.log('Conectado ao MongoDB Atlas com sucesso!');

        return client; // Retorna o cliente para uso posterior
    } catch (erro) {
        console.error("Falha na conexão com o banco!", erro);
        process.exit(1); // Sai com erro
    }
}
