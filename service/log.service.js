import chalk from 'chalk';
import dedent from 'dedent-js'

const printError = (message) => {
    console.log(
        dedent
        `

            ${chalk.bgRed.bold(" ERROR ")}

            ${message}

        `
    )
}
const printSuccess = (message) => {
    console.log(
        dedent
        `

            ${chalk.bgGreen.bold(" SUCCESS ")}

            ${message}

        `
    )
}
const printDanger = (message) => {
    console.log(
        dedent
        `

            ${chalk.bgMagenta.bold(" DANGER! ")}

            ${message}

        `
    )
}

const printPrice = (data) =>{
    console.log(
        dedent
        `

            ${chalk.bgRed.bold( " " + data.symbol + " ")} ${chalk.bgGreen.bold( " " + data.price + " ")} 
            
        `
    )
}

const printHelp = () => {
    console.log(dedent
        `

            ${chalk.bgYellowBright.bold(" HELP ")}

            -help, -h : help with all comands,

            -list, -l : get your coin list,

            -price [COIN_NAME], -p [COIN_NAME] : get price for [COIN_NAME],

            -coin [COIN_NAME], -c [COIN_NAME] : ${chalk.bold("ADD")} one coin in your coin list,

            -rcoin [COIN_NAME], -rc [COIN_NAME] : ${chalk.bold("REMOVE")} one coin from your coin list,
            -remove, -r : ${chalk.bold("REMOVE ALL")} coins from your list

        `
    )
}

export {printError, printSuccess, printHelp, printDanger, printPrice}