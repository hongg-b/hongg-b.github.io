# Hong Je-Gal — Personal Homepage

Website: https://hongg-b.github.io/

Local preview: http://127.0.0.1:8787/

A responsive academic homepage built with HTML, CSS, and a small inline script. No installation or build step is required. Paper panels use native details/summary and work without JavaScript; publication filters and automatic opening of paper anchors use JavaScript.

## 내용 수정

- `index.html`: 소개, 링크, 소식, 논문 목록 및 디자인
- `assets/papers/`: 8편의 실제 논문/저자 발표 자료에서 추출한 대표 그림 (WebP)
- `papers.json`: 이번 미리보기의 논문 정보와 짧은 소개. 정적 HTML의 데이터 사본이므로 JSON만 수정하면 화면이 바뀌지는 않습니다.
- `assets/portrait-white.jpg`: 사용자가 지정한 `화이트.jpg` 원본 사진입니다. CSS의 상단 정렬과 여백으로 머리 전체가 원 안에 여유 있게 표시되도록 조정했습니다.
- 게시 시에는 `index.html`과 `assets/` 전체를 함께 배포해야 합니다. `main` 브랜치에 반영하면 GitHub Pages에서 자동으로 배포됩니다.

이메일 링크는 `mailto:` 주소를 수정하면 됩니다. 공개용 영문 CV는 `id="cv-download"`인 링크에 PDF로 내장되어 있습니다. CV를 수정할 때에는 링크에 내장된 PDF도 함께 교체해야 합니다.

## Sources

The initial content was checked against the following public sources on 2026-09-28:

- https://scholar.google.co.kr/citations?user=hsu3e9YAAAAJ&hl=ko
- https://mainlab.kr/members/ — profile and portrait
- https://mainlab.kr/publications/ — publication metadata and acceptance status
- https://mainlab.kr/ — dated lab news
- https://openreview.net/forum?id=ImK3lNmGTW

The biography is a short synthesis of these research records. Education and professional experience were supplied by the site owner. Selected publications include conference/workshop and journal papers; the complete list remains linked on Google Scholar. The NeurIPS 2026 entry links to the lab's public record until a public paper URL is available.

## Paper figures and introductions

The 2026-09-28 local revision has a compact year index and eight expandable paper notes, filtered into international conferences/workshops, international journals, and domestic journals. Introductions are English editorial summaries, approximately 80–95 words each, based on the respective papers. KCI is an indexing designation, so the domestic category is labeled Domestic Journals.

Figure provenance: ARPG manuscript Fig. 2; FSP Fig. 1; A-LAMP Fig. 1; JMSE 2024 framework from the author's supplied public portfolio; JMSE 2023 Fig. 6 (CC BY 4.0); MetaCom 2024 Fig. 1; MetaCom 2023 Fig. 1; J-KICS Fig. 1. Crops remove surrounding page text and retain the figure content. Each panel includes a source link and a link to enlarge the figure. The complete original PDFs are not served with this website.
