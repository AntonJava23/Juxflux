import { store } from "../store/storeData"

export default {
    handleGameOver() {
        if (store.health < 1) {
            //do stuff
        }
    }
}