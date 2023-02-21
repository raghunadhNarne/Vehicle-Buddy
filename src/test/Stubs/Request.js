class Request
{
    constructor(body)
    {
        this.body=body;
        this.params={}
    }

     setParams(k,v)
    {
        this.params[k]=v;
    }

}

module.exports=Request;