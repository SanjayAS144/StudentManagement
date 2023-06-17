class EmailStructure{
    constructor(obj){
        obj = obj != null ? obj : {}
        this.fromAddress = obj.fromAddress != null ? obj.fromAddress : ''
        this.toAddresses = obj.toAddresses != null ? obj.toAddresses : []
        this.subject = obj.subject != null ? obj.subject : ''
        this.emailBody = obj.emailBody != null ? obj.emailBody : ''
        this.attechments = obj.attechments != null ? obj.attechments : ''
    }
}

module.exports = EmailStructure;