import 'dotenv/config';
import {ObjectId} from "mongodb";

export async function getTodosPedidos(conexao) {
    const db = conexao.db("churrascaria-database");
    const colecao = db.collection("posts");
    return await colecao.find().toArray();
}
export async function criarPedido(conexao,novoPedido)
{
    const db = conexao.db("churrascaria-database");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPedido);
}

export async function excluirPedido(conexao, id) {
    const db = conexao.db("churrascaria-database");
    const colecao = db.collection("posts");
    const objID = new ObjectId(id);
    return colecao.deleteOne({ _id: objID });
}
