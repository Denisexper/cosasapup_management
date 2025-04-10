import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarPDF = (todosPegues) => {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [['#', 'Comunidad', 'Dueño', 'Dirección', 'Código', 'Pago']],
    body: todosPegues.map((p, i) => [
      i + 1,
      p.comunidad,
      p.dueño,
      p.direccion,
      p.codigo,
      p.pago,
    ]),
    theme: 'grid',
    headStyles: { fillColor: [27, 54, 93] },
  });

  doc.save('reporte_pegues.pdf');
};

