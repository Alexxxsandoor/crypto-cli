import { getArgs } from "./helpers/args.js"
import { getPrice } from "./service/api.service.js"
import { printError, printHelp, printSuccess } from "./service/log.service.js"
import { getCoinList, removeCoin, saveToken, TOKEN_DICTIONARY } from "./service/storage.service.js"


const cryptoCliMain = () =>{
    const args = getArgs(process.argv)

    if(args.help || args.h){
        printHelp()
    }
    if(args.token || args.t){
        saveToken(TOKEN_DICTIONARY.token, (args.token || args.t))
    }
    if(args.coin || args.c){
        saveToken(TOKEN_DICTIONARY.coin, (args.coin || args.c))
    }
    if(args.rcoin || args.rc){
        removeCoin(TOKEN_DICTIONARY.removeOne, (args.rcoin || args.rc))
    }
    if(args.remove || args.r){
        removeCoin(TOKEN_DICTIONARY.removeAll, (args.rcoin || args.rc))
    }
    if(args.list || args.l){
        getCoinList()
    }

    if(args.price || args.p){
        getPrice(args.price || args.p)
    }else if(Object.keys(args).length == 0){
        getPrice()
    }
}

cryptoCliMain()