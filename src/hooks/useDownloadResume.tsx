import { jsPDF } from 'jspdf'
import { RefObject } from 'react'
import { maxHeight, maxWidth } from '../contants'

interface UseDownloadResumeProps {
  panelRefs: RefObject<HTMLDivElement[]>
}

export const useDownloadResume = ({ panelRefs }: UseDownloadResumeProps) => {
  async function generatePDF() {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [maxWidth, maxHeight],
      compress: true
    })
    console.log('getPanelRefs:', panelRefs)

    const data = await document.querySelectorAll('div.panel.two-column')[0]
    console.log('data:', data)
    pdf.html(data as HTMLElement).then(() => {
      pdf.save('shipping_label.pdf')
    })

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

  return { generatePDF }
}
