import axios from "axios";
import { getCoinArr, getToken } from "./storage.service.js";
import { printPrice } from "./log.service.js";

const API_URL = 'https://api.api-ninjas.com/v1/cryptoprice?symbol='
const COIN_PRICE = 'USDT'

const TOKEN = await getToken()

const getPrice = async (coinName) =>{
    if(coinName){
        printPrice(await getApi(coinName))
    }
    else {
        const coinList = await getCoinArr()
        if(coinList.length > 0){
            for (const coin of coinList) {
                const res = await getApi(coin);
                printPrice(res);
              }
            
        } 
    }

    
    
}

const getApi = async (coinName) =>{
    const symbol = coinName + COIN_PRICE;
    const {data} = await axios.get(`${API_URL + symbol}`,{
        params:{
            'X-Api-Key': TOKEN
        }
    })
    return data
} 

export {getPrice}