import fs , { promises } from 'fs'

import { join } from 'path';
import { homedir } from 'os'
import { printDanger, printError, printSuccess } from './log.service.js';

const FOLDER_PATH = join(homedir() + '/custom_cache');
const FILE_NAME = '/crypto-data.json'
const FILE_PATH = join(FOLDER_PATH + FILE_NAME);

const TOKEN_DICTIONARY = {
    token: "token",
    coin: "coin",
    removeOne: "removeOne",
    removeAll: "removeAll"
}

const saveToken = async (key, value) => {
    let data = {}

    if(isExist(FILE_PATH)){
        const file = await promises.readFile(FILE_PATH)
        data = JSON.parse(file)
    }

    if(key == TOKEN_DICTIONARY.coin){
        if(!data[TOKEN_DICTIONARY.coin]){
            data[TOKEN_DICTIONARY.coin] = [];
            data[key].push(value)
        }
        else{
            if(data[TOKEN_DICTIONARY.coin].find((el) => el.toLowerCase() == value.toLowerCase())){
                printDanger(`Token: ${value} - already in the list`)
            }else{
                data[TOKEN_DICTIONARY.coin].push(value)
            }
        }
        
    } else{
        data[key] = value
    }
    // create folder
    checkFolder()

    await promises.writeFile(FILE_PATH, JSON.stringify(data)).then(printSuccess("Added"))
    
}
const removeCoin = async (type ,coin) => {
    if(await isExist(FILE_PATH)){
        let data = {}
        const file = await promises.readFile(FILE_PATH)
        data = JSON.parse(file)

        if(TOKEN_DICTIONARY.removeOne == type) {
            data[TOKEN_DICTIONARY.coin] = data[TOKEN_DICTIONARY.coin].filter(e => e.toLowerCase() !== coin.toLowerCase())
            printSuccess(`
                    ${coin} was removed

                    your coin list: 
                    ${data[TOKEN_DICTIONARY.coin]}
                `)
        }
        else if(TOKEN_DICTIONARY.removeAll == type) {
            data[TOKEN_DICTIONARY.coin] = []
            printSuccess('removed all coins from yout list')
        }

        await promises.writeFile(FILE_PATH, JSON.stringify(data))

    } else {
        printError('folder not found, pls add coin then remove him')
    }
}

const checkFolder = async () => {
    try {
        if(!fs.existsSync(FOLDER_PATH)){
            fs.mkdirSync(FOLDER_PATH);
        }
    } catch (error) {
        printError(error.message)
    }
}

const getCoinList = async () => {
    let data = {}
    if(await isExist(FILE_PATH)){
        const file = await promises.readFile(FILE_PATH)
        data = JSON.parse(file)

        if(!data[TOKEN_DICTIONARY.coin].length) {
            printDanger(`
                your coin list is empty
            `)
        }
        else{
            printSuccess(`
                your coin list: 
                ${data[TOKEN_DICTIONARY.coin]}
            `)
        }

    } else {
        printError('folder not found, pls add coin then remove him')
    }

    return data
}

const getToken = async () =>{
    if(await isExist(FILE_PATH)){
        const file = await promises.readFile(FILE_PATH)
        const data = JSON.parse(file)
        return data[TOKEN_DICTIONARY.token]
    }
}

const getCoinArr = async () =>{
    if(await isExist(FILE_PATH)){
        const file = await promises.readFile(FILE_PATH)
        const data = JSON.parse(file)
        return data[TOKEN_DICTIONARY.coin]
    }
}

const isExist = async (path) => {
    try {
        await promises.stat(path)
        return true
    } catch (error) {
        return false
    }
}

export {saveToken, removeCoin, getCoinList, getToken, getCoinArr, TOKEN_DICTIONARY}