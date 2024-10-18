/* 

Desarrolla un sistema de logging que permita registrar mensajes en diferentes niveles (DEBUG, INFO, WARN, ERROR). 
El sistema debe permitir la configuración de un nivel mínimo de log y el formato de salida. 
También debe ser flexible para soportar múltiples destinos, como la consola o un archivo.

Requisitos adicionales:

Implementa un método para configurar el formato de los mensajes de log (e.g., "[FECHA] [NIVEL]: Mensaje").
Permite que el sistema de logging filtre los mensajes que están por debajo del nivel mínimo configurado.
Implementa un método para cambiar dinámicamente el destino de los logs.

*/

import { writeFile } from "fs";

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'
  
enum LogLevelPriority {
  "DEBUG" = 1,
  "INFO" = 2,
  "WARN" = 3,
  "ERROR" = 4
}

interface LoggerConfig {
  minLevel: LogLevel;
  dateFormat: string;
  destination: "console" | "file";
}

class Logger {
  minLevel: LogLevel;
  dateFormat: string;
  destination: "console" | "file";


  /* LOGGER CONSTRUCTOR */
  constructor(config: LoggerConfig) {
    this.minLevel = config.minLevel
    this.dateFormat = config.dateFormat
    this.destination = config.destination
  }

  /* DYNAMIC DESTINATION CHANGER */
  setDestination(destination: 'console' | 'file') {
    this.destination = destination
  }

  /* GET DATE WITH ESTABLISHED FORMAT */
  getFormattedDate(): string {
    const now = new Date()
    let formattedDate = this.dateFormat

    const dateElements: {[key: string]: string} = {
      'DD': now.getDate().toString(),
      'MM': (now.getMonth() + 1).toString(),
      'YYYY': now.getFullYear().toString(),
      'HH': now.getHours().toString(),
      'mm': now.getMinutes().toString(),
      'ss': now.getSeconds().toString()
    }

    for (const key in dateElements) {
      formattedDate = formattedDate.replace(key, dateElements[key])
    }

    return formattedDate;
  }
  
  /* LOG METHOD */
  log(level: LogLevel, message: string): void {
    const formattedDate = this.getFormattedDate()
    
    /* PRIORITY CHECK */
    if (LogLevelPriority[level] >= LogLevelPriority[this.minLevel]){
      const output = `${formattedDate} - ${level}: ${message}`

      /* CONSOLE DESTINATION */
      if (this.destination === 'console'){
        console.log(output)
      }
      /* FILE DESTINATION */
      else if (this.destination === 'file'){
        const fileName = `${formattedDate}.txt`
        const filePath = `${__dirname}/log/${fileName}`
        
        writeFile(filePath, output, (error) => {
          if (error) console.log('Fatal error: ', error)
          else console.log(`File created succesfully at ${filePath}`)
        })
      }
      else {
        console.log('ERROR: Invalid destination')
      }
    }
    else {
      console.log('ERROR: Invalid log level')
    }
  }

}

const logger = new Logger({minLevel: 'INFO', dateFormat: 'YYYY-MM-DD HH:mm:ss', destination: 'file'})

logger.log('WARN', 'La pepa ha estallado')