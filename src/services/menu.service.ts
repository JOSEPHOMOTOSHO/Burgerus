import { generateResponse } from "../utilities/response";
import Menu from "../models/menu";
import obj from "../utilities/interface";


const createMenu = async (payload: obj): Promise<any> => {
    const menu = await new Menu(payload).save();
    if(!menu){
        return generateResponse(false, "MENU_NOT_CREATED", {})
    }
    return generateResponse(true, "MENU_CREATED_SUCCESSFULLY", menu);

}




export{ 
    createMenu
}