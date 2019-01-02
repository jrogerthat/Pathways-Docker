const xhr = require('nets');
import * as Pathway from './pathway';
import * as d3 from 'D3';

const pathways = new Pathway.Pathway()

export class DataManager {
    
    GET: any;
    LINK: any;
    CONVERT: any;
    pathway : string;
    query: any;
    keggID: string;
  
    constructor() {

        //retrieve database entries
        this.GET = get_format;
        //Convert between KEGG and GENE ID's
        this.CONVERT = conv_format;
        //KEGG pathways linked from a human gene
        this.LINK = link_format;

        //this.query = query;
    }

    //Formater for GET. Passed as param to query
    let get_format = async function(id:string, geneId:string){
        let url = 'http://rest.kegg.jp/get/'+ id + '/kgml';
        let proxy = 'https://cors-anywhere.herokuapp.com/';
     
        let data = xhr({
                url: proxy + url,
                method: 'GET',
                encoding: undefined,
                headers: {
                    "Content-Type": "application/json"
                
                }
            }, 
            function done(err, resp, body){
                
                if(err){ 
                    console.error(err); 
                    return;
                }
                pathways.pathProcess(resp.rawRequest.responseXML, geneId).then(p=> {
                    console.log(p);
                    pathways.pathRender(p)});
            });
    }

    //Formater for CONVERT. Passed as param to query
    let conv_format = async function(id:string){
        //NEED TO MAKE THIS SO IT CAN USE OTHER IDS
        let stringArray = new Array();
        let type = 'genes/'
        let url = 'http://rest.kegg.jp/conv/' + type + id;
 
        let proxy = 'https://cors-anywhere.herokuapp.com/';
     
        let data = await xhr({
                url: proxy + url,
                method: 'GET',
                encoding: undefined,
                headers: {
                    "Content-Type": "text/plain"
                }
            }, 
            await function done(err, resp, body){
                if(err){ 
                    console.error(err); 
                    return;
                }
            
                // v this consoles what I want v 
                grabId(resp.rawRequest.responseText).then(ids=> link_format(ids));
               
                return resp;
                }
                
                );
                 // v this throws cannot reads responseText of undefined what v 
                console.log(data);
               
                return data;
    }

    let grabId = async function(list:any){
        let stringArray = new Array();
       
        list = list.split(/(\s+)/);
  
        for(var i =0; i < list.length; i++){
            if(list[i].length > 1){
                stringArray.push(list[i]);
                }
            };
            
            return stringArray;
    }

    let renderText = async function(idArray: Array<string>, response: string){
        
        let splits = await grabId(response);
        let id_link = splits[0];
        splits = splits.filter(d=> d != id_link);

        let divID = d3.select(document.getElementById('gene-id'));
        divID.selectAll('*').remove();

        let divLink = d3.select(document.getElementById('linked-pathways'));
        divLink.selectAll('*').remove();

        divLink.append('div').append('h2').text('Associated Pathways: ');
        if(idArray.length > 1){
            divID.append('span').append('text').text('Search ID:')
            divID.append('text').text(idArray[0] + '   ');
            
        }
        divID.append('span').append('text').text('Kegg ID:')
        divID.append('text').text(id_link);

        let div = divLink.selectAll('div').data(splits);
        div.exit().remove();
        let divEnter = div.enter().append('div').classed('path-link', true);
        div = divEnter.merge(div);

        let text = divEnter.append('text').text(d=> d);
        text.on('click', (id)=> get_format(id, id_link));
        
    }

    //Formater for LINK. Passed as param to query
    let link_format = function(idArray: Array<string>){
        let keggId = null;

        keggId = (idArray.length > 1) ?  idArray[1] : idArray[0];
        
        let url = 'http://rest.kegg.jp/link/pathway/' + keggId;
        let proxy = 'https://cors-anywhere.herokuapp.com/';
     
        let data = xhr({
                url: proxy + url,
                method: 'GET',
                encoding: undefined,
                headers: {
                    "Content-Type": "text/plain"
                }
            }, 
            function done(err, resp, body){
                if(err){ 
                    console.error(err); 
                    return;
                }
            
                // v this consoles what I want v 
                renderText(idArray, resp.rawRequest.responseText);

                return resp;
                }
                
                );
                 // v this throws cannot reads responseText of undefined what v 
                console.log(data);
               
                return data;
        
    }     
}

  
