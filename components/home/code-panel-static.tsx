import { codeToHtml } from 'shiki';

export const EXAMPLE_CODE = `export default async function (req) {
  const { name = "world" } = req.body;
  return { message: \`Hello, \${name}!\` };
}`;

export const OUTPUT_METHOD = 'POST /api/invoke/hello';
export const OUTPUT_STATUS = '200 OK · 47ms';
export const OUTPUT_BODY = '{ "message": "Hello, world!" }';

export async function highlightExample(): Promise<string> {
  return codeToHtml(EXAMPLE_CODE, {
    lang: 'javascript',
    theme: 'vesper'
  });
}
