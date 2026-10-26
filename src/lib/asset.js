/* public 폴더 파일 경로에 basePath 를 붙여 줌
   - GitHub Pages(https://harube29-lang.github.io/hhk-portfolio/)는 하위 경로에서 서비스되므로
     next/image 의 문자열 src 에는 basePath 를 직접 붙여야 함 (Link 는 자동 처리) */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const asset = (path) => `${BASE_PATH}${path}`
