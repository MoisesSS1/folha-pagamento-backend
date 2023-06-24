import { ObjectId } from "mongoose"

//interface das aliquotas para funcionário e empresa dependendo do regime empresarial
export interface Business_simple_aliquots {
    vacation: number
    13: number
    fgts: number
    fgts_prov_: number
    prev_about_others: number
}
export interface Business_others_aliquots {
    vacation: number
    13: number
    inss: number
    sat: number
    education_salary: number
    incra_senai_sesi_sebrae: number
    fgts: number
    fgts_prov_: number
    prev_about_others: number

}

// interface dos custos para funcionário e empresa dependendo do regime empresarial
export interface User_desc_simple {
    "_id"?: ObjectId
    "salary": number
    "inss_in_sheet": number
    "transport": number
    "snack": number
    "vacation": number
    "deci_3": number
    "FGTS": number
    "FGTS_prov": number
    "deci_3_andOthers_prov": number
}
export interface User_desc_others {
    "_id"?: ObjectId
    "salary": number
    "inss_in_sheet": number
    "transport": number
    "snack": number
    "vacation": number
    "deci_3": number
    "FGTS": number
    "FGTS_prov": number
    "deci_3_andOthers_prov": number
    "inss_employer": number
    "sat": number
    "education_salary": number
    "incra_sesi_senai": number
}
