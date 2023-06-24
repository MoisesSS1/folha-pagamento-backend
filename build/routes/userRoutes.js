"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const userRoutes = (0, express_1.Router)();
//rota para calculo de folha de pagamento
userRoutes.post("/calc", userControllers_1.cal_sheet);
//rota para salvar dados
userRoutes.post("/save", userControllers_1.save_sheet);
//rota para buscar por hash
userRoutes.post("/search", userControllers_1.search_sheet);
exports.default = userRoutes;
