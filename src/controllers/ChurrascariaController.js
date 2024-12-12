import { error } from "console";
import { getTodosPedidos,criarPedido,excluirPedido} from "../models/ChurrascariaModel.js";
import fs from "fs";

export async function listarPedido(req, res) {
    try {
        const posts = await getTodosPedidos(req.app.locals.conexao);

        // Verificar e normalizar os dados
        const pedidos = posts.map(post => ({
            ...post,
            carnes: Array.isArray(post.carnes) ? post.carnes : [], // Garante que carnes seja um array
            acompanhamentos: Array.isArray(post.acompanhamentos) ? post.acompanhamentos : [], // Garante que acompanhamentos seja um array
            arroz: post.arroz || "N/A", // Valor padrão para arroz
            feijao: post.feijao || "N/A" // Valor padrão para feijao
        }));

        return pedidos;
    } catch (erro) {
        console.error(erro.message);
        return []; // Retorna um array vazio em caso de erro
    }
}

export async function postarNovoPedido(req, res) {
    const { nome, carnes, acompanhamentos, arroz, feijao } = req.body;

    // Validação para garantir que todos os campos foram preenchidos
    if (!nome || !carnes || !acompanhamentos || !arroz || !feijao) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    // Normalizando os dados
    const novoPedido = {
        nome,
        carnes: carnes.split(",").map(carne => carne.trim()), // Converte string em array
        acompanhamentos: acompanhamentos.split(",").map(item => item.trim()), // Converte string em array
        arroz,
        feijao,
    };

    try {
        const conexao = req.app.locals.conexao;
        const pedidoCriado = await criarPedido(conexao, novoPedido);
        res.status(201).json(pedidoCriado);
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ erro: "Falha na criação" });
    }
}

export async function deletarPedido(req, res) {
    const id = req.params.id;

    try {
        const conexao = req.app.locals.conexao;
        const resultado = await excluirPedido(conexao, id);

        if (resultado.deletedCount > 0) {
            res.status(200).json({ message: "Pedido deletado com sucesso" });
        } else {
            res.status(404).json({ erro: "Pedido não encontrado" });
        }
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({ erro: "Falha ao deletar o pedido" });
    }
}
