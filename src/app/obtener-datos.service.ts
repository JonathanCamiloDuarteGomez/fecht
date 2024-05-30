import { Injectable } from '@angular/core';
import { KeyValue } from './keyValue';

@Injectable({
  providedIn: 'root'
})


export class ObtenerDatosService {

  constructor() {
    console.log("Se construye el servicio de obtener datos");
   }
  async main(): Promise<KeyValue[]>{

    // Definimos un tipo para el par clave-valor
    //type KeyValueTuple = [number, {number: number, string?: string}]; // any para permitir cualquier tipo de valor
    // Creamos un array de pares clave-valor
    const keyValueArray: KeyValue[] = [];
    // orden de mayor a menor cantidad
      const orden: KeyValue[] = [];
    //variable para guardar la cantidad de veces que se ha pedido un producto
    var cantidad: number = 0;
    try {
      // Obtenemos los datos de los productos y de los pedidos
      const [productos, pedidos] = await Promise.all([
        obtenerDatos('https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json'),
        obtenerDatos('https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json')
      ]);
         // Verificamos que ambos conjuntos de datos se hayan obtenido correctamente
         if (productos && pedidos) {
          // Aquí puedes hacer lo que necesites con los datos obtenidos
          console.log('Productos:', productos.length);
          console.log('Pedidos:', pedidos.length);

          productos.forEach((po: any) => {

              pedidos.forEach((pe: any) => {
                  if(po.idproducto == pe.idproducto){
                      cantidad = cantidad + Number(pe.cantidad);
                  }
              });
              //Insertamos solo el ultimo dato con el id del producto y la cantidad
              keyValueArray.push([Number(po.idproducto), { number: cantidad, string: po.nombreProducto}]);
              cantidad = 0;//reset cantidad
          });

          imprimir(keyValueArray);

          return keyValueArray;

      } else {
          console.error('No se pudieron obtener los datos de productos y/o pedidos.');
      }

    } catch (error) {
      console.error('Error al obtener los datos:', error);

    }
    return keyValueArray;
  }

  KeyValueArray: KeyValue[] = [];
  //se crea global para poder acceder a ella desde el componente

  getKeyValueArray():KeyValue[]{
    //llenamos el que vamos a devolver
    this.main().then((value) => {
      value.forEach(([clave, valor]) => {
        this.KeyValueArray.push([clave, valor]);
      });
    });
    return this.KeyValueArray;
  }

}




// Función para obtener los datos de una URL dada
async function obtenerDatos(url: string): Promise<any> {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return null;
  }
}

function imprimir( arreglo: KeyValue[]){
  // Accedemos a los elementos del array
  arreglo.forEach(([clave, valor]) => {
      console.log(`Clave: ${clave}, Valor: ${valor.number}, Nombre: ${valor.string}`);
  });
  console.log('-------Organizado--------');
  arreglo.sort((a, b) => b[1].number - a[1].number);
  arreglo.forEach(([clave, valor]) => {
      console.log(`Clave: ${clave}, Valor: ${valor.number}, Nombre: ${valor.string}`);
  });
};

