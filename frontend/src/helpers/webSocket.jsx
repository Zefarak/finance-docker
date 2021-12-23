import {BACK_END_URL} from '../helpers/endpoints'


export default function getSocket(socketPath){
    const webSocket = new WebSocket(socketPath);
    return webSocket
}