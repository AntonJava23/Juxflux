import { store } from "../store/StoreData"

export default {
    handleGameOver() {
        if (store.health < 1) {
            //do stuff
        }
    }
}