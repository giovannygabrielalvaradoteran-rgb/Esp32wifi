//% color="#E67E22" weight=90 icon="\uf1eb" block="ESP32 WiFi"
namespace esp32wifi {
    let inicializado = false;
    let conectado = false;

    /**
     * Inicializa la comunicación serial con el módulo ESP32-C3
     */
    //% block="inicializar ESP32: Tx %tx Rx %rx Baudios %baudrate"
    //% tx.defl=SerialPin.P1 rx.defl=SerialPin.P2 baudrate.defl=BaudRate.BaudRate115200
    //% weight=100
    export function initESP32(tx: SerialPin, rx: SerialPin, baudrate: BaudRate): void {
        serial.redirect(tx, rx, baudrate);
        basic.pause(100);
        inicializado = true;
    }

    /**
     * Devuelve verdadero si la comunicación serial fue inicializada
     */
    //% block="ESP32 inicializada"
    //% weight=95
    export function isESP32Initialized(): boolean {
        return inicializado;
    }

    /**
     * Conecta la ESP32-C3 a una red Wi-Fi existente
     */
    //% block="conectar a WiFi: SSID %ssid Contraseña %password"
    //% weight=90
    export function connectWiFi(ssid: string, password: string): void {
        serial.writeLine("WIFI:" + ssid + "," + password);
        let respuesta = serial.readUntil(serial.delimiters(Delimiters.NewLine));
        if (respuesta.indexOf("OK") >= 0) {
            conectado = true;
        } else {
            conectado = false;
        }
    }

    /**
     * Devuelve verdadero si la ESP32 confirmó conexión Wi-Fi
     */
    //% block="WiFi conectado"
    //% weight=85
    export function isWiFiConnected(): boolean {
        return conectado;
    }

    /**
     * Envía lecturas de Temperatura y Humedad (DHT11) al dashboard web
     */
    //% block="enviar DHT11 a web: Temperatura %temp °C Humedad %hum %%"
    //% weight=80
    export function sendDHT11(temp: number, hum: number): void {
        serial.writeLine("DHT:" + temp + "," + hum);
    }
}
