import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarPDF = (todosPegues) => {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [['#', 'Comunidad', 'Dueño Pegue', 'Dirección Dueño', 'Código Pegue', 'Pagos', 'Estado']],
    body: todosPegues.map((p, i) => [
      i + 1,
      p.comunidad,
      p.dueño,
      p.direccion,
      p.codigo,
      p.pago,
      p.estado === true || p.estado === "true" ? "Activo" : "Inactivo",
    ]),
    theme: 'grid',
    headStyles: { fillColor: [27, 54, 93] },
  });

  doc.save('reporte_pegues.pdf');
};

