export default function Export2Word(element, filename = '') {
  if (!document || !navigator) return;

  const styles =
    '<style>@page portrait_A4_page { size: 595.3pt 841.9pt; margin: 72pt 72pt 72pt 72pt; mso-header-margin: 35.4pt; mso-footer-margin: 35.4pt; mso-paper-source: 0; } div.portrait_A4_page { page: portrait_A4_page; } h4{margin-bottom:16px} span{margin-bottom:16px;display:inline-block} div.list-item{margin-bottom:60px}</style>';
  const preHtml = `<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title>${styles}</head><body class='portrait_A4_page'>`;
  const postHtml = '</body></html>';
  const content = document.getElementById(element);

  const articles = content.querySelectorAll('.list-item');
  const table = document.createElement('table');
  articles.forEach((article) => {
    const time = article
      .querySelector('.news-item__source + span > strong')
      .innerText.split('г. ')[1];
    const title = article.querySelector('h4').innerText;
    const tableRow = document.createElement('tr');
    const timeTd = document.createElement('td');
    timeTd.innerHTML = time;
    const titleTd = document.createElement('td');
    titleTd.innerHTML = title;
    tableRow.appendChild(timeTd);
    tableRow.appendChild(titleTd);
    table.appendChild(tableRow);
  });

  const html = preHtml + content.innerHTML + postHtml;

  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword',
  });

  const url = `data:application/vnd.ms-word;charset=utf-8,${encodeURIComponent(
    html
  )}`;

  const filenameToSave = filename || 'document';

  const downloadLink = document.createElement('a');

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, filenameToSave);
  } else {
    downloadLink.href = url;
    downloadLink.download = `${filenameToSave}.doc`;
    downloadLink.click();
  }

  document.body.removeChild(downloadLink);
}
