import "./styles.scss";
import * as DM from './dataManager';
import * as d3 from 'D3';

const xhr = require('nets');

const dm = new DM.DataManager();
//const queryAPI = DM.default;

d3.select('.search-icon').on('click', ()=> searchById());

function searchById() {
    
    d3.select('#linked-pathways').selectAll('*').remove();
    d3.select('#pathway-render').selectAll('*').remove();

    const value = (<HTMLInputElement>document.getElementById('search-bar')).value;
   
    if(value.includes('ncbi-geneid')){
        dm.CONVERT(value);
    }else{
        dm.LINK([value]);
    }

  
}
