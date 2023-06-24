"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search_sheet = exports.save_sheet = exports.cal_sheet = void 0;
//model
const userModels_1 = __importDefault(require("../models/userModels"));
//rota para calcular desconto
const cal_sheet = async (req, res) => {
    const { grossSalary, transport, snack, businessRegime } = req.body;
    //snack é o valor de desconto vr
    //utilizar express validator para validar os dados
    function calcDesc(grossSalary, transport, snack, businessRegime) {
        //todas as aliquotas por encargo
        const aliquots = {
            transport: 0.06,
            vacation: 1.3 / 12,
            13: 0.0833,
            inss: 0.2,
            sat: 0.03,
            education_salary: 0.025,
            incra_senai_sesi_sebrae: 0.033,
            fgts: 0.08,
            fgts_prov_: 0.04,
            prev_about_others: 0.0793,
        };
        //encargos e aliquotas por regime empresarial
        const simpleAliquots = {
            vacation: aliquots.vacation,
            13: aliquots[13],
            fgts: aliquots.fgts,
            fgts_prov_: aliquots.fgts_prov_,
            prev_about_others: aliquots.prev_about_others,
        };
        const others_aliquots = {
            vacation: aliquots.vacation,
            13: aliquots[13],
            inss: aliquots.inss,
            sat: aliquots.sat,
            education_salary: aliquots.education_salary,
            incra_senai_sesi_sebrae: aliquots.incra_senai_sesi_sebrae,
            fgts: aliquots.fgts,
            fgts_prov_: aliquots.fgts_prov_,
            prev_about_others: aliquots.prev_about_others,
        };
        var inss_sheet = 0;
        var transport_sheet = 0;
        if (transport) {
            transport_sheet = grossSalary * 0.06;
        }
        if (grossSalary <= 1302) {
            inss_sheet = grossSalary * 0.075;
        }
        else if (grossSalary > 1302 && grossSalary <= 2571.29) {
            inss_sheet = grossSalary * 0.09;
        }
        else if (grossSalary > 2571.29 && grossSalary <= 3856.94) {
            inss_sheet = grossSalary * 0.12;
        }
        else if (grossSalary > 3856.94) {
            inss_sheet = grossSalary * 0.14;
        }
        //filtrar o regime para efetuar os calculos
        if (businessRegime === "simple") {
            //calcular o desconto por cada tipo de encargo
            const user = {
                "salary": grossSalary,
                "inss_in_sheet": inss_sheet,
                "transport": transport_sheet,
                "snack": grossSalary * snack,
                "vacation": grossSalary * simpleAliquots.vacation,
                "deci_3": grossSalary * simpleAliquots[13],
                "FGTS": grossSalary * simpleAliquots.fgts,
                "FGTS_prov": grossSalary * simpleAliquots.fgts_prov_,
                "deci_3_andOthers_prov": grossSalary * simpleAliquots.prev_about_others
            };
            return user;
        }
        if (businessRegime === "others") {
            //calcular o desconto por cada tipo de encargo
            const user = {
                "salary": grossSalary,
                "inss_in_sheet": inss_sheet,
                "transport": transport_sheet,
                "snack": grossSalary * snack,
                "vacation": grossSalary * others_aliquots.vacation,
                "deci_3": grossSalary * others_aliquots[13],
                "FGTS": grossSalary * others_aliquots.fgts,
                "FGTS_prov": grossSalary * others_aliquots.fgts_prov_,
                "deci_3_andOthers_prov": grossSalary * others_aliquots.prev_about_others,
                "inss_employer": grossSalary * others_aliquots.inss,
                "sat": grossSalary * others_aliquots.sat,
                "education_salary": grossSalary * others_aliquots.education_salary,
                "incra_sesi_senai": grossSalary * others_aliquots.incra_senai_sesi_sebrae,
            };
            return user;
        }
    }
    const data = await calcDesc(grossSalary, transport, snack, businessRegime);
    return res.json(data);
};
exports.cal_sheet = cal_sheet;
//rota para salvar a folha de pagamento
const save_sheet = async (req, res) => {
    const data = req.body;
    async function checkHash(data) {
        try {
            const checkdata = await userModels_1.default.findById(data._id);
            if (checkdata) {
                return res.status(404).json({ saveData, msg: "Hash já foi utilizada, use outro id para a folha de pagamento!" });
            }
            else {
                saveData(data);
            }
        }
        catch (error) {
            return res.status(404).json({ error: "Erro ao checar se hash já foi utilizada, tente novamente ou utilize outra hash." });
        }
    }
    async function saveData(data) {
        try {
            const saveData = await userModels_1.default.create(data);
            return res.status(200).json({ saveData, msg: "Folha de pagamento salva!" });
        }
        catch (error) {
            console.log(error);
            return res.status(404).json({ msg: "Erro ao salvar o dado no banco, verifique se preencheu os dados corretamente!" });
        }
    }
    checkHash(data);
};
exports.save_sheet = save_sheet;
//rota para buscar a folha
const search_sheet = (req, res) => {
    const { _id } = req.body;
    async function findSheet(_id) {
        try {
            const sheet = await userModels_1.default.findById(_id);
            if (sheet === null) {
                return res.status(404).json({ msg: "Hash não encontrada, verifique e tente novamente!" });
            }
            return res.status(200).json({ sheet });
        }
        catch (error) {
            return res.status(404).json({ msg: "Erro ao buscar hash, verifique e tente novamente!" });
        }
    }
    findSheet(_id);
};
exports.search_sheet = search_sheet;
