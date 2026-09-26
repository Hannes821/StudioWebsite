# Requires pypdfium2, pypdf and Pillow. Regenerates the 17 original instruction mirrors.
from pathlib import Path
import pypdfium2 as pdfium
from pypdf import PdfReader
import hashlib, json
root = Path(__file__).resolve().parents[2]
manifest = []
for number in range(1,18):
    code = f'FF-OI-{number:02}'
    src = root / '_wiki/public/originals' / f'{code}.pdf'
    doc = pdfium.PdfDocument(src)
    reader = PdfReader(src)
    dest = root / '_wiki/public/images/operation-instructions' / code
    dest.mkdir(parents=True, exist_ok=True)
    md = [f'[Download original PDF](originals/{code}.pdf) · [Plain-text extract](originals/{code}.txt)', '',
          'Every original page is reproduced below, including all illustrations, tables and labels. Select a page image to open it at full resolution. Expand **Text for copying and search** below a page to read its extracted text; extraction may change spacing or special characters.', '']
    record = {'id':code,'sha256':hashlib.sha256(src.read_bytes()).hexdigest(),'pages':[]}
    for idx in range(len(doc)):
        page = doc[idx]
        bitmap = page.render(scale=2.5)
        img = bitmap.to_pil()
        filename = f'page-{idx+1:02}.webp'
        img.save(dest / filename, 'WEBP', lossless=True, method=4)
        text = '\n'.join(line.rstrip() for line in (reader.pages[idx].extract_text() or '').splitlines())
        imagepath = f'images/operation-instructions/{code}/{filename}'
        md += [f'## Page {idx+1}', '', f'[![{code}, original page {idx+1}]({imagepath})]({imagepath})', '',
               '```pdf-transcript', text.strip(), '```', '']
        record['pages'].append({'number':idx+1,'image':imagepath,'width':img.width,'height':img.height,'textChars':len(text.strip())})
        img.close()
        bitmap.close()
        page.close()
    doc.close()
    (root / f'_wiki/content/oi-{number:02}.md').write_text('\n'.join(md),encoding='utf-8')
    manifest.append(record)
    print(f'{code}: {len(record["pages"])} pages',flush=True)
(root / '_wiki/public/images/operation-instructions/manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
print('Total pages:',sum(len(m['pages']) for m in manifest))
