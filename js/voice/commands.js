
import { speak } from './speech.js';
import { save, all } from '../db/db.js';

export const Commands = {
  async dispatch(text){
    text = (text||'').trim();
    if(!text) return false;
    // simple parsing examples
    // barberia: "registrar corte para juan con precio 300"
    if(text.startsWith('registrar corte') || text.includes('barber')){
      // naive parse
      const m = text.match(/corte para (\w+) (?:con precio (\d+))?/i);
      const client = m ? m[1] : 'cliente';
      const price = m && m[2] ? Number(m[2]) : 300;
      const id = 'venta-' + Date.now();
      await save('ventas',{id, module:'barberia', client, items:[{name:'Corte', price}], total:price, date:new Date().toISOString()});
      speak(`Registrado corte para ${client} por ${price} pesos`);
      return true;
    }

    // POS sale: "registra una venta de 2 refrescos a 50 cada uno"
    if(text.includes('venta') && text.includes('refresco')){
      const qty = (text.match(/(\d+) refresc/) || [0,1])[1] || 1;
      const price = (text.match(/a (\d+)/) || [0,50])[1] || 50;
      const total = Number(qty)*Number(price);
      const id = 'venta-' + Date.now();
      await save('ventas',{id, module:'pos', items:[{name:'Refresco', qty:Number(qty), price:Number(price)}], total, date:new Date().toISOString()});
      speak(`Venta registrada. Total ${total} pesos.`);
      return true;
    }

    // billar: "iniciar mesa 3"
    if(text.includes('iniciar mesa')){
      const m = text.match(/mesa (\d+)/);
      const mesa = m ? m[1] : '1';
      await save('mesas',{id:'mesa-'+mesa, mesa:mesa, inicio: new Date().toISOString(), estado:'ocupada'});
      speak(`Mesa ${mesa} iniciada.`);
      return true;
    }

    // carwash: "registrar lavado para placa a123456 por 350"
    if(text.includes('lavado') || text.includes('lavar')){
      const m = text.match(/placa\s*([\w\d-]+)/i);
      const placa = m ? m[1] : 'SINPLACA';
      const priceM = text.match(/por (\d+)/);
      const price = priceM ? Number(priceM[1]) : 250;
      const id = 'lav-' + Date.now();
      await save('vehiculos',{id, placa, servicio:'Lavado', price, date:new Date().toISOString()});
      speak(`Lavado registrado para placa ${placa} por ${price} pesos`);
      return true;
    }

    // help
    if(text.includes('ayuda') || text.includes('qué puedes')){
      speak('Puedo registrar ventas, iniciar mesas, registrar lavados y leer reportes. Di "Jarvis" antes del comando.');
      return true;
    }

    return false;
  }
};
