import { Request, Response } from "express"

//model
import User from "../models/userModels"

//interfaces
import * as interfacesUser from "../interfaces/folhaUser.interface"

//rota para calcular desconto
export const cal_sheet = async (req: Request, res: Response) => {
    let { grossSalary, transport, snack, businessRegime } = req.body

    //utilizar express validator para validar os dados

    function calcDesc(grossSalary: number, transport: number, snack: number, businessRegime: "simple" | "others") {

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
        }
        //encargos e aliquotas por regime empresarial
        const simpleAliquots: interfacesUser.Business_simple_aliquots = {
            vacation: aliquots.vacation,
            13: aliquots[13],
            fgts: aliquots.fgts,
            fgts_prov_: aliquots.fgts_prov_,
            prev_about_others: aliquots.prev_about_others,
        }
        const others_aliquots: interfacesUser.Business_others_aliquots = {
            vacation: aliquots.vacation,
            13: aliquots[13],
            inss: aliquots.inss,
            sat: aliquots.sat,
            education_salary: aliquots.education_salary,
            incra_senai_sesi_sebrae: aliquots.incra_senai_sesi_sebrae,
            fgts: aliquots.fgts,
            fgts_prov_: aliquots.fgts_prov_,
            prev_about_others: aliquots.prev_about_others,
        }

        var inss_sheet = 0;
        var transport_sheet = 0
        if (transport) {
            transport_sheet = grossSalary * 0.06
        }

        if (grossSalary <= 1302) {
            inss_sheet = grossSalary * 0.075
        } else if (grossSalary > 1302 && grossSalary <= 2571.29) {
            inss_sheet = grossSalary * 0.09
        } else if (grossSalary > 2571.29 && grossSalary <= 3856.94) {
            inss_sheet = grossSalary * 0.12
        } else if (grossSalary > 3856.94) {
            inss_sheet = grossSalary * 0.14
        }

        //filtrar o regime para efetuar os calculos
        if (businessRegime === "simple") {
            //calcular o desconto por cada tipo de encargo
            const user: interfacesUser.User_desc_simple = {
                "salary": Number(grossSalary.toFixed(2)),
                "inss_in_sheet": Number(inss_sheet.toFixed(2)),
                "transport": Number(transport_sheet.toFixed(2)),
                "snack": Number((grossSalary * snack).toFixed(2)),
                "vacation": Number((grossSalary * simpleAliquots.vacation).toFixed(2)),
                "deci_3": Number((grossSalary * simpleAliquots[13]).toFixed(2)),
                "FGTS": Number((grossSalary * simpleAliquots.fgts).toFixed(2)),
                "FGTS_prov": Number((grossSalary * simpleAliquots.fgts_prov_).toFixed(2)),
                "deci_3_andOthers_prov": Number((grossSalary * simpleAliquots.prev_about_others).toFixed(2))
            }
            return user
        }

        if (businessRegime === "others") {
            //calcular o desconto por cada tipo de encargo
            const user: interfacesUser.User_desc_others = {
                "salary": Number(grossSalary.toFixed(2)),
                "inss_in_sheet": Number(inss_sheet.toFixed(2)),
                "transport": Number(transport_sheet.toFixed(2)),
                "snack": Number((grossSalary * snack).toFixed(2)),
                "vacation": Number((grossSalary * simpleAliquots.vacation).toFixed(2)),
                "deci_3": Number((grossSalary * simpleAliquots[13]).toFixed(2)),
                "FGTS": Number((grossSalary * simpleAliquots.fgts).toFixed(2)),
                "FGTS_prov": Number((grossSalary * simpleAliquots.fgts_prov_).toFixed(2)),
                "deci_3_andOthers_prov": Number((grossSalary * simpleAliquots.prev_about_others).toFixed(2)),
                "inss_employer": Number((grossSalary * others_aliquots.inss).toFixed(2)),
                "sat": Number((grossSalary * others_aliquots.sat).toFixed(2)),
                "education_salary": Number((grossSalary * others_aliquots.education_salary).toFixed(2)),
                "incra_sesi_senai": Number((grossSalary * others_aliquots.incra_senai_sesi_sebrae).toFixed(2)),
            }
            return user
        }
    }

    const data = await calcDesc(grossSalary, transport, snack, businessRegime)

    return res.json(data)

}

//rota para salvar a folha de pagamento
export const save_sheet = async (req: Request, res: Response) => {
    const data = req.body

    async function checkHash(data: interfacesUser.User_desc_others | interfacesUser.User_desc_simple) {
        try {
            const checkdata = await User.findById(data._id)

            if (checkdata) {
                return res.status(404).json({ saveData, msg: "Hash já foi utilizada, use outro id para a folha de pagamento!" })
            } else {
                saveData(data)
            }
        } catch (error) {
            return res.status(404).json({ error: "Erro ao checar se hash já foi utilizada, tente novamente ou utilize outra hash." })
        }
    }


    async function saveData(data: interfacesUser.User_desc_others | interfacesUser.User_desc_simple) {
        try {
            const saveData = await User.create(data)
            return res.status(200).json({ saveData, msg: "Folha de pagamento salva!" })
        } catch (error) {
            console.log(error)
            return res.status(404).json({ msg: "Erro ao salvar o dado no banco, verifique se preencheu os dados corretamente!" })
        }
    }
    checkHash(data)
}

//rota para buscar a folha
export const search_sheet = (req: Request, res: Response) => {
    const { _id } = req.body


    async function findSheet(_id: string) {
        try {
            const sheet = await User.findById(_id)

            if (sheet === null) {
                return res.status(404).json({ msg: "Hash não encontrada, verifique e tente novamente!" })
            }
            return res.status(200).json({ sheet })
        } catch (error) {
            return res.status(404).json({ msg: "Erro ao buscar hash, verifique e tente novamente!" })
        }



    }

    findSheet(_id)
}

