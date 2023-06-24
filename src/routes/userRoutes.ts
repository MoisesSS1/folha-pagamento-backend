import { Router } from 'express';
import { cal_sheet, save_sheet, search_sheet } from '../controllers/userControllers'

const userRoutes = Router();


//rota para calculo de folha de pagamento
userRoutes.post("/calc", cal_sheet)

//rota para salvar dados
userRoutes.post("/save", save_sheet)

//rota para buscar por hash
userRoutes.post("/search", search_sheet)





export default userRoutes;