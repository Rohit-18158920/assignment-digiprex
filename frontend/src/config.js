class config{

    constructor(){
        this.domain = "http://localhost:5000/abandonedCart";
        this.getDetailsUrl = this.domain+'/getDetails';
    }

}
export default new config();