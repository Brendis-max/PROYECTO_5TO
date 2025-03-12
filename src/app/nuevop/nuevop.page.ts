import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import jsPDF from 'jspdf'; // Importar jsPDF completo
import autoTable from 'jspdf-autotable'; // Importar autoTable como función
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-nuevop',
  templateUrl: './nuevop.page.html',
  styleUrls: ['./nuevop.page.scss'],
  standalone:false
})

  export class NuevopPage implements OnInit {
    producto: any;
    pedido: any = {
      tamano: '',
      forma: '',
      sabor: '',
      relleno: '',
      decoracion: '',
      mensaje: '',
      productos: [] // Lista de productos en el pedido
    };
  
    constructor(
      private route: ActivatedRoute,
      private navController: NavController,
      private router: Router,
      private pedidoService: PedidoService,
      private alertCtrl: AlertController,

    ) {
      const navigationState = this.router.getCurrentNavigation()?.extras.state;
      if (navigationState) {
        this.producto = navigationState['product'] ?? null;
        if (this.producto && typeof this.producto.precio === 'string') {
          this.producto.precio = parseFloat(this.producto.precio.replace(/[^0-9.]/g, '')) || 0;
        }
        this.pedido.productos.push(this.producto);
      }
    }
  
    ngOnInit() {}
  
    hacerPedido() {
      const nuevoPedido = {
        id: Math.floor(Math.random() * 10000),
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Pendiente',
        detalles: this.pedido,
        productos: this.pedido.productos
      };
      this.pedidoService.agregarPedido(nuevoPedido);
      this.navController.navigateBack('/tabs/tab3');
    }
  
    async procederAlPago() {
      const alert = await this.alertCtrl.create({
        header: 'Confirmar Pago',
        message: `Total: $${this.calcularTotal()}. ¿Deseas proceder con el pago?`,
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Pagar',
            handler: () => {
              this.realizarPago();
            }
          }
        ]
      });
      await alert.present();
    }
  
    calcularTotal() {
      return this.pedido.productos.reduce((total: number, p: any) => total + (p.precio || 0), 0);
    }
  
    realizarPago() {
      const pedidoPagado = {
        ...this.pedido,
        id: Math.floor(Math.random() * 10000),
        fecha: new Date().toISOString().split('T')[0],
        estado: 'Pagado',
        total: this.calcularTotal()
      };
      this.pedidoService.agregarPedido(pedidoPagado);
      this.generarPDF(pedidoPagado);
      this.navController.navigateBack('/tabs/tab3');
    }
  // CREACION DE PDF

   
 
  async generarPDF(pedido: any) {
    const doc = new jsPDF();

    // Colores de la paleta rosa
    const rosaFuerte = '#DD0D6E';
    const rosaClaro = '#FFD9E0';

    // Agregar el logo
    const logoImg = new Image();
    logoImg.src = 'assets/logo.png'; // Asegúrate de que la ruta sea correcta
    doc.addImage(logoImg, 'PNG', 20, 10, 40, 40); // Cambié 'JPEG' a 'PNG' si es .png

    // Título
    doc.setFontSize(22);
    doc.setTextColor(rosaFuerte);
    doc.setFont('helvetica', 'bold');
    doc.text('Pasteles Mimi', 70, 25);
    doc.setFontSize(16);
    doc.text('Recibo de Pedido', 70, 35);

    // Línea decorativa
    doc.setLineWidth(0.5);
    doc.setDrawColor(rosaFuerte);
    doc.line(20, 45, 190, 45);

    // Información del pedido
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    doc.text(`Pedido #${pedido.id || 'N/A'}`, 20, 55);
    doc.text(`Fecha: ${pedido.fecha || new Date().toISOString().split('T')[0]}`, 20, 65);
    doc.text(`Estado: ${pedido.estado || 'Pendiente'}`, 20, 75);

    // Detalles del pedido
    doc.setFontSize(14);
    doc.setTextColor(rosaFuerte);
    doc.text('Detalles del Pedido', 20, 90);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Tamaño: ${pedido.tamano || pedido.detalles?.tamano || 'No especificado'}`, 20, 100);
    doc.text(`Forma: ${pedido.forma || pedido.detalles?.forma || 'No especificado'}`, 20, 110);
    doc.text(`Sabor: ${pedido.sabor || pedido.detalles?.sabor || 'No especificado'}`, 20, 120);
    doc.text(`Relleno: ${pedido.relleno || pedido.detalles?.relleno || 'No especificado'}`, 20, 130);
    doc.text(`Decoración: ${pedido.decoracion || pedido.detalles?.decoracion || 'No especificado'}`, 20, 140);
    doc.text(`Mensaje: ${pedido.mensaje || pedido.detalles?.mensaje || 'Sin mensaje'}`, 20, 150);

    // Tabla de productos
    doc.setFontSize(14);
    doc.setTextColor(rosaFuerte);
    doc.text('Productos', 20, 165);
    const productosData = pedido.productos.map((p: any) => [p.nombre, `$${p.precio}`]);
    autoTable(doc, { // Usar autoTable como función independiente
      startY: 170,
      head: [['Producto', 'Precio']],
      body: productosData,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: rosaFuerte, textColor: '#FFFFFF', fontStyle: 'bold' },
      alternateRowStyles: { fillColor: rosaClaro },
      columnStyles: { 0: { cellWidth: 120 }, 1: { cellWidth: 50, halign: 'right' } }
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY || 170; // Usamos 'as any' porque lastAutoTable no está tipado
    doc.setFontSize(12);
    doc.setTextColor(rosaFuerte);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total: $${pedido.total || 0}`, 150, finalY + 10, { align: 'right' });

    // // Guardar el PDF
    // doc.save(`recibo-pedido-${pedido.id || 'sin-id'}.pdf`);



// Convertir el PDF a Base64
const pdfBase64 = doc.output('datauristring'); // Genera una URL de datos (Base64)

// Mostrar mensaje con opción de ver el PDF
const pdfOutput = doc.output('blob'); // Obtener el PDF como Blob
const fileName = `recibo-pedido-${pedido.id || 'sin-id'}.pdf`;

const reader = new FileReader();
reader.onloadend = async () => {
  const pdfBase64 = reader.result?.toString().split(',')[1]; // Extraer solo la parte Base64

  try {
    await Filesystem.writeFile({
      path: fileName,
      data: pdfBase64!,
      directory: Directory.Documents, // Guardar en la carpeta Documentos
      recursive: true
    });

    const alert = await this.alertCtrl.create({
      header: 'Recibo Generado',
      message: `El recibo para el pedido #${pedido.id || 'N/A'} ha sido guardado en la carpeta Documentos como "${fileName}".`,
      buttons: [{ text: 'Aceptar', role: 'cancel' }]
    });
    await alert.present();

  } catch (error) {
    console.error('Error al guardar el PDF:', error);
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'No se pudo guardar el recibo. Por favor, intenta de nuevo.',
      buttons: [{ text: 'Aceptar', role: 'cancel' }]
    });
    await alert.present();
  }
};
reader.readAsDataURL(pdfOutput); // Convertir Blob a Base64
}



recomendaciones = [
  { nombre: 'Pastel de Chocolate', precio: 20, imagen: 'assets/chocofresa.jpeg' },
  { nombre: 'Cupcakes de Fresa', precio: 15, imagen: 'assets/coke rosa.jpg' },
  { nombre: 'Gelatina de mosaico', precio: 25, imagen: 'assets/Gelatina de mosaico.jpg' }
];

//APARTADO DE RECOMENDACIONES
agregarRecomendado(recomendado: any) {
  this.pedido.productos.push(recomendado);
  console.log('Producto añadido:', recomendado);
}
  }


    
  

  
  
  
  
  
    
   
    
  
     
  