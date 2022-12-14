import { jsPDF } from 'jspdf';
import { maxHeight, maxWidth } from '../contants';

interface UseDownloadResumeProps {
  panelRefs: any;
}

export const useDownloadResume = ({ panelRefs }: UseDownloadResumeProps): [() => void] => {
  async function generatePDF() {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [maxWidth, maxHeight],
      compress: true,
    });
    console.log('getPanelRefs:', panelRefs);

    const data: any = await document.querySelectorAll('div.panel.skilled_based.two-column')[1];
    console.log('data:', data);
    pdf.html(data).then(() => {
      pdf.save('shipping_label.pdf');
    });

    // await pdf.html(document.querySelector('div.panel.skilled_based.two-column'), {
    //   callback: function (pdf) {
    //     console.log(pdf);
    //   },
    // });
    // const data: any = await document.querySelector('#pdf');
    // pdf.html(data).then(() => {
    //   pdf.save('shipping_label.pdf');
    // });
  }

  return [generatePDF];
};
