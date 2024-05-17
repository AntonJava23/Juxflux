import { store } from "../store/StoreData.js"

export default {
    handleGameOver() {
        if (store.health < 1) {
            //do stuff
        }
    }
}