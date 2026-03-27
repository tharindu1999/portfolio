import zipfile
import xml.etree.ElementTree as ET

def extract_text(docx_path):
    import os
    if not os.path.exists(docx_path):
        print(f"File not found: {docx_path}")
        return
        
    with zipfile.ZipFile(docx_path) as docx:
        xml_content = docx.read('word/document.xml')
        
    tree = ET.fromstring(xml_content)
    # The namespace prefix for word xml is usually something like "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
    # but we can just glob all text
    text = []
    for elem in tree.iter():
        if elem.tag.endswith('}t'): # w:t tag
            if elem.text:
                text.append(elem.text)
            
    with open('c:/Users/thari/Downloads/tharindu-jayasankha-_-software-engineer/parsed_cv.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(text))

extract_text(r"C:\Users\thari\Downloads\new cv\v17\THARINDU JAYASANKHA .docx")
