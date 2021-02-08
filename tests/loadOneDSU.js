//Load openDSU enviroment
require("../privatesky/psknode/bundles/openDSU");

//Load openDSU SDK
const opendsu = require("opendsu");

//Load resolver library
const resolver = opendsu.loadApi("resolver");

//Load keyssi library
const keyssispace = opendsu.loadApi("keyssi");

//Create a template keySSI (for default domain). See /conf/BDNS.hosts.json
const aKeySSI = "ssi:seed:default:637c5f7AYfvLTM76xrQK7bsDe31Ybo9Q7zoP8QSgddYs::v0";
//const aKeySSI = "ssi:sread:default:cGeb7JqYuVMszUTiw471bcnrEVALTa3F4eDwHjALYsh:F9MnSteh1WCM9RWfrirUe6G5kFb3gvRh8kW9sTunzG18:v0";

//Using an sZaSSI, it is not possible to load
// const aKeySsi = "ssi:sza:default::EjgYgxE7bEC4tuVdpRiE3RJzepXFLY3u8urAYgeTHVES:v0"

//Load a DSU
resolver.loadDSU(aKeySSI, (err, aDsuInstance) =>{
    //Reached when DSU loaded
    if (err){
        console.log("DSU loaded BAD");
        throw err;
    }
    console.log("DSU loaded OK");

    aDsuInstance.listFiles("/", function (err,files) {
        console.log("Files "+files);
    });
    aDsuInstance.listFolders("/", function (err,folders) {
        console.log("Folders "+folders);
    });
    
    aDsuInstance.readFile('/dsu-metadata-log', (err, data)=>{
        //Reached when data loaded
        if(err){
            throw err;
        }
        
        console.log("dsu-metadata-log load succesfully! :", data.toString());
    });

    aDsuInstance.readFile('/data', (err, data)=>{
        //Reached when data loaded
        if(err){
            throw err;
        }
        
        const dataObject = JSON.parse(data.toString()); //Convert data (buffer) to string and then to JSON
        console.log("Data load succesfully! :)", dataObject.message); //Print message to console
        dataObject.message += " ... more!";
        console.log("Data changed :)", dataObject.message); //Print message to console

        aDsuInstance.writeFile("/data", JSON.stringify(dataObject), (err) => {
            if (err) {
                throw err;
            }
            console.log("Data written succesfully! :)");
        });
    });

});





