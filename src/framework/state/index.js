export class State {
    constructor(inistialState = {}) {
        this.state = initialState;
        this.listiners = [];
        
    }

    getState() {
        return this.state;
    }
    
    setState(newState) {
    }

    subscribe(listiners){
        this.listiners.push(listiners);
        return () => {
            this.listiners = this.listiners.filter(ele => ele !== listeners);
        }
    }
}