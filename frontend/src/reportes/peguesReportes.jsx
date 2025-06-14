import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarPDF = (currentItems, currentPage, itemsPerPage) => {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm'
  });

  // Configuración de estilos
  const styles = {
    header: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 10
    },
    body: {
      textColor: [44, 62, 80],
      fontSize: 9,
      cellPadding: 4
    },
    alternateRow: {
      fillColor: [236, 240, 241]
    }
  };

  // Título del reporte
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.setFont('helvetica', 'bold');
  doc.text('Reporte de Pegues', 15, 15);

  // Subtítulo con información de paginación
  doc.setFontSize(10);
  doc.setTextColor(127, 140, 141);
  doc.text(`Página actual: ${currentPage} - Mostrando ${itemsPerPage} registros`, 15, 22);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 15, 28);

  // Tabla de datos (solo los registros de la página actual)
  autoTable(doc, {
    startY: 35,
    head: [['#', 'Comunidad', 'Dueño', 'Dirección', 'Código', 'Pagos', 'Estado']],
    body: currentItems.map((p, i) => [
      (currentPage - 1) * itemsPerPage + i + 1, // Numeración continua
      p.comunidad,
      p.dueño,
      p.direccion,
      p.codigo,
      p.pago,
      { 
        content: p.estado === true || p.estado === "true" ? "Activo" : "Inactivo",
        styles: { 
          textColor: p.estado === true || p.estado === "true" ? [39, 174, 96] : [231, 76, 60] 
        }
      }
    ]),
    styles: styles.body,
    headStyles: styles.header,
    alternateRowStyles: styles.alternateRow,
    margin: { top: 30 },
    tableWidth: 'auto',
    columnStyles: {
      0: { cellWidth: 'auto', halign: 'center' },
      6: { cellWidth: 'auto', halign: 'center' }
    },
    didDrawPage: function(data) {
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Página ${data.pageCount}`,
        doc.internal.pageSize.width - 15,
        doc.internal.pageSize.height - 10,
        { align: 'right' }
      );
    }
  });

  // Guardar el PDF
  doc.save(`Reporte_Pegues_Pagina_${currentPage}_${new Date().toISOString().slice(0,10)}.pdf`);
};