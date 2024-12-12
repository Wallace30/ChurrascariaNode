import express from 'express';
import { listarPedido, postarNovoPedido, deletarPedido } from '../controllers/ChurrascariaController.js';

const router = express.Router();

router.get("/pedidos", async (req, res) => {
    try {
        const pedidos = await listarPedido(req, res);
        res.render("index", { pedidos }); // Renderiza os dados no template
    } catch (erro) {
        console.error(erro.message);
        res.status(500).send("Erro ao carregar os pedidos.");
    }
});
router.get("/criar", (req, res) => {
    res.render("criar");
});

router.post("/criar", postarNovoPedido);

router.post("/deletar/:id", deletarPedido);

router.get("/deletar/:id", async (req, res) => {
    try {
        const pedido = await buscarPedidoPorId(req.params.id);
        res.render("deletar", { pedido });
    } catch (erro) {
        res.status(500).send("Erro ao carregar o pedido para exclusão.");
    }
});


export default router;
