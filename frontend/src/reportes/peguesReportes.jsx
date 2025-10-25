import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarPDF = (currentItems, currentPage, itemsPerPage) => {
  const doc = new jsPDF({
    orientation: 'landscape', // 🔹 Mantiene orientación horizontal
    unit: 'mm',
    format: 'a4'
  });

  // 🎨 Estilos
  const styles = {
    header: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold',
      fontSize: 9
    },
    body: {
      textColor: [44, 62, 80],
      fontSize: 8, // 🔹 Un poco más grande para llenar espacio
      cellPadding: 3
    },
    alternateRow: {
      fillColor: [236, 240, 241]
    }
  };

  // 🧾 Encabezado
  doc.setFontSize(16);
  doc.setTextColor(41, 128, 185);
  doc.setFont('helvetica', 'bold');
  doc.text('Reporte de Pegues', 15, 15);

  // 🕓 Subtítulo
  doc.setFontSize(10);
  doc.setTextColor(127, 140, 141);
  doc.text(`Página actual: ${currentPage} - Mostrando ${itemsPerPage} registros`, 15, 22);
  doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 15, 28);

  // 📊 Tabla de datos
  autoTable(doc, {
    startY: 35,
    head: [['#', 'Comunidad', 'Dueño', 'Dirección', 'Código', 'Pagos', 'Estado']],
    body: currentItems.map((p, i) => [
      (currentPage - 1) * itemsPerPage + i + 1,
      p.comunidad,
      p.dueño,
      p.direccion,
      p.codigo,
      p.pago,
      {
        content: p.estado === true || p.estado === 'true' ? 'Activo' : 'Inactivo',
        styles: {
          textColor: p.estado === true || p.estado === 'true' ? [39, 174, 96] : [231, 76, 60]
        }
      }
    ]),
    styles: styles.body,
    headStyles: styles.header,
    alternateRowStyles: styles.alternateRow,
    margin: { top: 30, left: 10, right: 10 },
    tableWidth: 'full',
    columnStyles: {
      // 🔹 Ajuste manual de ancho total (suma aprox. 277 mm)
      0: { cellWidth: 10, halign: 'center' },  // #
      1: { cellWidth: 45 },                    // Comunidad
      2: { cellWidth: 60 },                    // Dueño
      3: { cellWidth: 65 },                    // Dirección
      4: { cellWidth: 35, halign: 'center' },  // Código
      5: { cellWidth: 25, halign: 'center' },  // Pagos
      6: { cellWidth: 37, halign: 'center' }   // Estado
    },
    didDrawPage: (data) => {
      const totalPages = doc.internal.getNumberOfPages();
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text(
        `Página ${data.pageNumber} de ${totalPages}`,
        doc.internal.pageSize.width - 15,
        doc.internal.pageSize.height - 10,
        { align: 'right' }
      );
    }
  });

  // 💾 Guardar PDF
  doc.save(`Reporte_Pegues_Pagina_${currentPage}_${new Date().toISOString().slice(0, 10)}.pdf`);
};
